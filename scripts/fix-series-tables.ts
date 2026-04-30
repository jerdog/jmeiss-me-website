#!/usr/bin/env tsx
/**
 * Convert legacy "Moving DevRel Forward 6-Part Series" navigation tables
 * (which use bare `<li>` items inside `<td>` and HTML-style attributes that
 * MDX rejects) into a `<Callout>` with a proper `<ul>`.
 *
 * Idempotent. Run once after the .md -> .mdx rename.
 */
import { promises as fs } from "node:fs";
import path from "node:path";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const WRITE = process.argv.includes("--write");

const TABLE_REGEX =
  /<table\s+width="50%"\s+border="1">\s*<tr>\s*<th>([^<]+)<\/th>\s*<\/tr>\s*<tr>\s*<td>([\s\S]*?)<\/td>\s*<\/tr>\s*<\/table>/g;

async function main() {
  const entries = await fs.readdir(POSTS_DIR);
  const files = entries
    .filter((e) => /\.mdx?$/.test(e) && !e.startsWith("_"))
    .map((e) => path.join(POSTS_DIR, e));

  let changed = 0;
  for (const file of files) {
    const before = await fs.readFile(file, "utf8");
    const after = before.replace(TABLE_REGEX, (_match, title, body) => {
      const items: string[] = [];
      const liRegex = /<li>([\s\S]*?)(?=<li>|<\/td>|$)/g;
      let m: RegExpExecArray | null;
      while ((m = liRegex.exec(body)) !== null) {
        const inner = m[1].replace(/<\/li>\s*$/, "").trim();
        if (inner) items.push(`    <li>${inner}</li>`);
      }
      return `<Callout title="${title.trim()}">\n  <ul>\n${items.join("\n")}\n  </ul>\n</Callout>`;
    });

    if (after !== before) {
      changed++;
      const rel = path.relative(process.cwd(), file);
      console.log(`[${WRITE ? "WRITE" : "DRY-RUN"}] ${rel}`);
      if (WRITE) await fs.writeFile(file, after, "utf8");
    }
  }

  console.log(`\n${changed} file(s) ${WRITE ? "updated" : "would change"}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
