#!/usr/bin/env node
/**
 * Sync Credly badges into content/data/badges.yaml from the public JSON API.
 *
 * Usage:
 *   npm run sync-badges
 *   npm run sync-badges -- https://www.credly.com/users/other-user/badges.json
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { stringify } from "yaml";

const DEFAULT_URL = "https://www.credly.com/users/jeremy-meiss/badges.json";
const OUT_FILE = path.join(process.cwd(), "content", "data", "badges.yaml");

const apiUrl = process.argv[2]?.trim() || DEFAULT_URL;
const profileUrl = apiUrl.replace(/\/badges\.json$/, "");

const res = await fetch(apiUrl);
if (!res.ok) {
  console.error(`Failed to fetch ${apiUrl}: ${res.status} ${res.statusText}`);
  process.exit(1);
}

/** @type {{ data: Array<Record<string, unknown>> }} */
const json = await res.json();

const badges = json.data
  .filter((b) => b.public === true && b.state === "accepted")
  .sort((a, b) => String(b.issued_at_date ?? "").localeCompare(String(a.issued_at_date ?? "")))
  .map((b) => {
    /** @type {{ entities?: Array<{ entity?: { name?: string } }> }} */
    const issuer = b.issuer;
    /** @type {{ name?: string }} */
    const badgeTemplate = b.badge_template;
    return {
      name: badgeTemplate?.name ?? "Unknown badge",
      issuer: issuer?.entities?.[0]?.entity?.name ?? "Unknown",
      image: b.image_url,
      href: `https://www.credly.com/badges/${b.id}`,
    };
  });

const header = `# Verified credentials (Credly) for /about.
#
# Regenerate from Credly:
#   npm run sync-badges
#
# Source: ${apiUrl}

`;

const body = stringify({ profileUrl, badges }, { lineWidth: 0 });
await fs.writeFile(OUT_FILE, header + body, "utf8");

console.log(`Wrote ${badges.length} badge(s) to ${path.relative(process.cwd(), OUT_FILE)}`);
