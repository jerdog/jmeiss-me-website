#!/usr/bin/env tsx
/**
 * Lint MDX post bodies for accessibility issues that Lighthouse often misses:
 * - heading level skips (page template supplies h1; body must not jump levels)
 * - images with empty or missing alt text
 *
 * Usage:
 *   npm run audit-a11y-content
 */

import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const POSTS_DIR = join(process.cwd(), "content/posts");

interface Issue {
  file: string;
  line: number;
  rule: string;
  message: string;
}

function stripFrontmatter(source: string): string {
  if (!source.startsWith("---")) return source;
  const end = source.indexOf("\n---", 3);
  if (end === -1) return source;
  return source.slice(end + 4);
}

function stripFencedCode(source: string): string {
  return source.replace(/```[\s\S]*?```/g, "");
}

function lineNumberAt(source: string, index: number): number {
  return source.slice(0, index).split("\n").length;
}

function auditFile(file: string): Issue[] {
  const source = readFileSync(join(POSTS_DIR, file), "utf8");
  const body = stripFencedCode(stripFrontmatter(source));
  const issues: Issue[] = [];

  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  let prevLevel = 1;
  let match: RegExpExecArray | null;
  while ((match = headingRegex.exec(body)) !== null) {
    const level = match[1].length;
    if (level > prevLevel + 1) {
      issues.push({
        file,
        line: lineNumberAt(source, match.index),
        rule: "heading-order",
        message: `Heading skips level ${prevLevel} → h${level}: "${match[2].slice(0, 60)}"`,
      });
    }
    prevLevel = level;
  }

  const emptyMarkdownImg = /!\[\]\([^)]+\)/g;
  while ((match = emptyMarkdownImg.exec(body)) !== null) {
    issues.push({
      file,
      line: lineNumberAt(source, match.index),
      rule: "image-alt",
      message: "Image has empty alt text (![]())",
    });
  }

  const htmlImgRegex = /<img\b[^>]*>/gi;
  while ((match = htmlImgRegex.exec(body)) !== null) {
    const tag = match[0];
    if (!/\balt\s*=\s*["'][^"']+["']/.test(tag)) {
      issues.push({
        file,
        line: lineNumberAt(source, match.index),
        rule: "image-alt",
        message: "<img> missing non-empty alt attribute",
      });
    }
  }

  return issues;
}

function main() {
  const files = readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
  const issues = files.flatMap(auditFile);

  if (issues.length === 0) {
    console.log(`\n✓ ${files.length} posts — no a11y content issues found.\n`);
    return;
  }

  console.error(`\n✗ ${issues.length} accessibility issue(s) in post content:\n`);
  for (const issue of issues) {
    console.error(`  ${issue.file}:${issue.line} [${issue.rule}] ${issue.message}`);
  }
  console.error("\nFix these before merging, or run with care if alt is intentionally empty.\n");
  process.exit(1);
}

main();
