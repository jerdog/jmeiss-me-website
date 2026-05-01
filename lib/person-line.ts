/**
 * Display helpers for Person fields that may be omitted in site.yaml.
 */

function normalizeSegment(value: string): string {
  const t = value.trim();
  if (t === "" || t === "-" || t === "—") return "";
  return t;
}

/** Hero / post byline: "role · company", skipping empty segments. */
export function roleCompanyLine(role: string, company: string): string | null {
  const r = normalizeSegment(role);
  const c = normalizeSegment(company);
  if (!r && !c) return null;
  return [r, c].filter(Boolean).join(" · ");
}
