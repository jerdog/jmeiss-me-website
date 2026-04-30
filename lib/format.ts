/**
 * Deterministic date formatters used in card chrome, post headers, etc.
 *
 * `toLocaleDateString` formats relative to the runtime's timezone by default,
 * which means the server (UTC) and the client (Jeremy's CST, a reader's
 * Tokyo) format the same ISO timestamp differently. That triggers React
 * hydration mismatches (#418). Pinning `timeZone: "UTC"` makes every
 * environment agree on the displayed day.
 */

const SHORT_DATE: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
};

/** "May 24, 2024" — matches Hugo's articleList format. */
export function formatShortDate(iso: string | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", SHORT_DATE);
}

const LONG_DATE: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
};

/** "May 24, 2024" with the full month name — used on post headers. */
export function formatLongDate(iso: string | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", LONG_DATE);
}
