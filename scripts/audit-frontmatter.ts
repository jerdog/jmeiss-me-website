#!/usr/bin/env tsx
/**
 * Walk content/posts and report any post whose frontmatter fails the Zod
 * schema, plus a summary table (file, slug, date, tag count).
 *
 * Usage:
 *   npm run audit-frontmatter
 */

import { getAllPosts } from "../lib/posts.js";

async function main() {
  try {
    const posts = await getAllPosts({ includeDrafts: true });
    const drafts = posts.filter((p) => p.draft).length;
    console.log(`\nValidated ${posts.length} posts (${drafts} drafts).\n`);
    console.log(
      [
        "№".padStart(3),
        "flag".padEnd(5),
        "fileSlug".padEnd(50),
        "urlSlug".padEnd(50),
        "date".padEnd(12),
        "tags",
      ].join(" "),
    );
    console.log("-".repeat(150));
    for (const p of posts) {
      const date = p.date.slice(0, 10);
      const slugMismatch = p.fileSlug !== p.urlSlug ? " *" : "";
      const flag = p.draft ? "draft" : "";
      console.log(
        [
          String(p.essayNumber).padStart(3),
          flag.padEnd(5),
          (p.fileSlug + slugMismatch).padEnd(50),
          p.urlSlug.padEnd(50),
          date.padEnd(12),
          p.tags.length.toString(),
        ].join(" "),
      );
    }
    console.log(
      "\n* = frontmatter slug overrides filename (URL differs from filename).\n" +
        "Essay numbers are chronological (oldest = 1). Drafts get placeholder\n" +
        "slots after the last published post so the production sequence stays\n" +
        "gap-free.\n",
    );
  } catch (err) {
    console.error("Frontmatter audit failed:");
    if (err instanceof Error) {
      console.error(err.message);
      if (err.stack) console.error(err.stack);
    } else {
      console.error(String(err));
    }
    process.exit(1);
  }
}

main();
