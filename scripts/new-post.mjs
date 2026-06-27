#!/usr/bin/env node
/**
 * Scaffold a new post in content/posts with today's date and a slug derived
 * from the title argument.
 *
 * Usage:
 *   npm run new-post "On Building a DevRel Practice"
 *   -> creates content/posts/on-building-a-devrel-practice.mdx
 */
import { promises as fs } from "node:fs";
import path from "node:path";

const title = process.argv.slice(2).join(" ").trim();
if (!title) {
  console.error('Usage: npm run new-post "Post title here"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9\s-]/g, "")
  .trim()
  .replace(/\s+/g, "-")
  .replace(/-+/g, "-");

const today = new Date().toISOString().slice(0, 10);

const dir = path.join(process.cwd(), "content", "posts");
const file = path.join(dir, `${slug}.mdx`);

const exists = await fs.stat(file).then(
  () => true,
  () => false,
);
if (exists) {
  console.error(`File already exists: ${file}`);
  process.exit(1);
}

const body = `---
title: "${title.replace(/"/g, '\\"')}"
date: ${today}
tags: []
excerpt: ""
draft: true
---

The lede goes here.

{/* Use MDX components like <PullQuote>, <YouTube id="..." />, <Figure src="..." caption="..." /> */}
`;

await fs.mkdir(dir, { recursive: true });
await fs.writeFile(file, body, "utf8");
console.log(`Created ${path.relative(process.cwd(), file)}`);
