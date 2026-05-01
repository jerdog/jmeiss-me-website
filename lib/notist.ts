import { z } from "zod";
import { formatShortDate } from "@/lib/format";

/** One talk decoded from Notist’s public profile JSON (`/username.json`). */
export interface NotistPastTalk {
  title: string;
  /** Sort key and rough timeline (calendar day, UTC). */
  presentedAt: Date;
  /** Stable label from the feed date (avoids tz skew vs `presentedAt`). */
  dateLabel: string;
  href: string;
  /** Conference / event title from Notist’s event JSON, when available. */
  conference: string;
}

const PresentationItemSchema = z
  .object({
    type: z.string().optional(),
    attributes: z
      .object({
        title: z.string().optional(),
        presented_on: z.string().optional(),
        published_on: z.string().optional(),
      })
      .passthrough(),
    links: z
      .object({
        self: z.string().optional(),
        event: z.string().optional(),
      })
      .passthrough(),
  })
  .passthrough();

/** Best-effort decode — Notist’s envelope can evolve; we only need presentations[]. */
function parseNotistEnvelope(raw: unknown): z.infer<typeof PresentationItemSchema>[] {
  const root = z.object({ data: z.array(z.unknown()) }).safeParse(raw);
  if (!root.success || !root.data.data[0]) return [];
  const author = root.data.data[0] as {
    relationships?: { data?: unknown[] };
  };
  const rel = author.relationships?.data;
  if (!Array.isArray(rel)) return [];
  const out: z.infer<typeof PresentationItemSchema>[] = [];
  for (const item of rel) {
    const parsed = PresentationItemSchema.safeParse(item);
    if (!parsed.success) continue;
    if (parsed.data.type !== "presentations") continue;
    out.push(parsed.data);
  }
  return out;
}

/** YYYY-MM-DD from Notist’s `presented_on` / `published_on` for sort + display. */
function calendarDayAndLabel(isoish: string | undefined): { day: Date; label: string } {
  if (!isoish) return { day: new Date(0), label: "" };
  const dayPart = isoish.slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dayPart)) {
    const normalized = isoish.includes("T") ? isoish : isoish.replace(" ", "T");
    const d = new Date(normalized);
    if (Number.isNaN(d.getTime())) return { day: new Date(0), label: "" };
    return { day: d, label: formatShortDate(d.toISOString()) };
  }
  const d = new Date(`${dayPart}T00:00:00.000Z`);
  return { day: d, label: formatShortDate(`${dayPart}T12:00:00.000Z`) };
}

function maybeHttpUrl(value: string | undefined): string | undefined {
  const t = value?.trim();
  if (!t) return undefined;
  try {
    const u = new URL(t);
    if (u.protocol !== "http:" && u.protocol !== "https:") return undefined;
    return t;
  } catch {
    return undefined;
  }
}

interface ParsedRow {
  title: string;
  presentedAt: Date;
  dateLabel: string;
  href: string;
  eventJsonUrl: string | undefined;
}

function parseEventTitleFromJson(raw: unknown): string {
  const r = z
    .object({
      data: z.array(
        z.object({
          attributes: z.object({ title: z.string().optional() }).passthrough(),
        }),
      ),
    })
    .safeParse(raw);
  if (!r.success) return "";
  const t = r.data.data[0]?.attributes?.title?.trim();
  return t ?? "";
}

async function fetchNotistEventTitleByUrl(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return "";
    const json: unknown = await res.json();
    return parseEventTitleFromJson(json);
  } catch {
    return "";
  }
}

async function resolveEventTitles(urls: string[]): Promise<Map<string, string>> {
  const unique = [...new Set(urls.filter(Boolean))];
  const map = new Map<string, string>();
  await Promise.all(
    unique.map(async (u) => {
      const title = await fetchNotistEventTitleByUrl(u);
      if (title) map.set(u, title);
    }),
  );
  return map;
}

/**
 * Extract presentations from a Notist profile `.json` document, newest first.
 * Conference names are filled by `fetchNotistPastTalks` via per-event `.json` URLs.
 */
export function parseNotistProfileJson(raw: unknown, limit: number): ParsedRow[] {
  const rows = parseNotistEnvelope(raw);
  const talks: ParsedRow[] = [];
  for (const row of rows) {
    const title = row.attributes.title?.trim();
    const href = row.links.self?.trim();
    if (!title || !href) continue;
    const dateStr = row.attributes.presented_on ?? row.attributes.published_on;
    const { day, label } = calendarDayAndLabel(dateStr);
    talks.push({
      title,
      presentedAt: day,
      dateLabel: label,
      href,
      eventJsonUrl: maybeHttpUrl(row.links.event),
    });
  }
  talks.sort((a, b) => b.presentedAt.getTime() - a.presentedAt.getTime());
  const cap = Math.min(Math.max(limit, 0), 50);
  return talks.slice(0, cap);
}

/**
 * Fetch and parse Notist JSON. Returns [] on network / parse errors so builds don’t fail.
 */
export async function fetchNotistPastTalks(feedUrl: string, limit: number): Promise<NotistPastTalk[]> {
  try {
    const res = await fetch(feedUrl, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return [];
    const json: unknown = await res.json();
    const rows = parseNotistProfileJson(json, limit);
    const eventUrls = rows.map((r) => r.eventJsonUrl).filter((u): u is string => Boolean(u));
    const titlesByEventUrl = await resolveEventTitles(eventUrls);
    return rows.map((r) => ({
      title: r.title,
      presentedAt: r.presentedAt,
      dateLabel: r.dateLabel,
      href: r.href,
      conference: r.eventJsonUrl ? titlesByEventUrl.get(r.eventJsonUrl) ?? "" : "",
    }));
  } catch {
    return [];
  }
}
