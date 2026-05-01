/**
 * Talks list and topic chips for the /speaking page.
 *
 * Edit `content/data/talks.yaml`, not this file. Schema reference:
 *
 *   upcomingTalks:               # optional; shown only while eventDate is today or later (UTC)
 *     - eventDate: "2026-05-15"   # YYYY-MM-DD — required for filtering
 *       date: "May 2026"          # optional; month/year chip override for TalkRow
 *       title: "…"
 *       event: "DevOpsDays KC"
 *       location: "Kansas City, MO"   # optional
 *       type: "Keynote"               # Keynote|Talk|Panel|Workshop|Podcast|Webinar
 *       href: "https://…"             # optional event page
 *       recording: "https://…"        # optional
 *       slides: "https://…"           # optional
 *
 *   talks:
 *     - date: "May 2026"        # human-readable date (catalog / supplemental rows)
 *       ...
 *
 *   topics:
 *     - "Building DevRel from scratch"
 *
 *   pastTalks:                      # optional — Notist `.json` profile URL
 *      ...
 */

import { z } from "zod";
import { loadYaml } from "@/lib/content";
import { formatMonthYearUtcFromYmd } from "@/lib/format";

const TalkTypeSchema = z.enum([
  "Keynote",
  "Talk",
  "Panel",
  "Workshop",
  "Podcast",
  "Webinar",
]);

const TalkSchema = z.object({
  date: z.string().min(1),
  title: z.string().min(1),
  event: z.string().min(1),
  location: z.string().optional(),
  type: TalkTypeSchema,
  upcoming: z.boolean().optional(),
  href: z.string().url().optional(),
  recording: z.string().url().optional(),
  slides: z.string().url().optional(),
});

const UpcomingTalkSchema = z.object({
  /** Calendar day the talk happens (UTC). Rows past this day disappear from the site automatically. */
  eventDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  /** Optional chip text (e.g. multi-day conf). Defaults to month + year from `eventDate`. */
  date: z.string().min(1).optional(),
  title: z.string().min(1),
  event: z.string().min(1),
  location: z.string().optional(),
  type: TalkTypeSchema,
  href: z.string().url().optional(),
  recording: z.string().url().optional(),
  slides: z.string().url().optional(),
});

const PastTalksSchema = z.object({
  /** Notist public profile JSON, e.g. https://noti.st/username.json */
  feedUrl: z.string().url(),
  portfolioUrl: z.string().url().default("https://speaking.jmeiss.me"),
  /** Most recent N talks from the feed (capped at 50 in code). */
  limit: z.number().int().min(1).max(50).default(10),
});

const TalksFileSchema = z.object({
  upcomingTalks: z.array(UpcomingTalkSchema).default([]),
  talks: z.array(TalkSchema),
  topics: z.array(z.string().min(1)),
  pastTalks: PastTalksSchema.optional(),
});

export type Talk = z.infer<typeof TalkSchema>;
export type UpcomingTalk = z.infer<typeof UpcomingTalkSchema>;
export type PastTalksConfig = z.infer<typeof PastTalksSchema>;

const data = loadYaml("talks.yaml", TalksFileSchema);

export const upcomingTalks: UpcomingTalk[] = data.upcomingTalks;
export const talks: Talk[] = data.talks;
export const topics: string[] = data.topics;
export const pastTalks: PastTalksConfig | undefined = data.pastTalks;

/** Today as YYYY-MM-DD in UTC — matches `eventDate` comparison. */
export function utcTodayYmd(now: Date): string {
  return now.toISOString().slice(0, 10);
}

/** Map YAML upcoming entries to `Talk` rows, only if `eventDate` is today or later (UTC). Soonest first. */
export function visibleUpcomingTalkRows(entries: UpcomingTalk[], now: Date = new Date()): Talk[] {
  const today = utcTodayYmd(now);
  return [...entries]
    .filter((t) => t.eventDate >= today)
    .sort((a, b) => a.eventDate.localeCompare(b.eventDate))
    .map((t) => ({
      title: t.title,
      event: t.event,
      location: t.location,
      type: t.type,
      href: t.href,
      recording: t.recording,
      slides: t.slides,
      date: t.date?.trim() || formatMonthYearUtcFromYmd(t.eventDate),
      upcoming: true,
    }));
}
