#!/usr/bin/env tsx
/**
 * Static internal link check — scans source files, no server or external HTTP.
 *
 * Usage:
 *   npm run check-links
 *
 * Validates `/…` links in content, app, and components against known routes
 * and files under `public/`. External URLs are counted but not fetched.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import { getAllPosts, getAllTags, tagToSlug } from "@/lib/posts";

const ROOT = process.cwd();
const PUBLIC = join(ROOT, "public");

const STATIC_ROUTES = new Set([
  "/",
  "/posts",
  "/about",
  "/now",
  "/speaking",
  "/atom.xml",
  "/index.xml",
  "/feed.json",
  "/sitemap.xml",
  "/robots.txt",
  "/manifest.webmanifest",
  "/icon.png",
  "/apple-icon.png",
]);

interface LinkRef {
  url: string;
  file: string;
  line: number;
}

function walkDir(dir: string, extensions: RegExp): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkDir(full, extensions));
    } else if (extensions.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

function lineAt(source: string, index: number): number {
  return source.slice(0, index).split("\n").length;
}

function extractLinks(source: string, file: string): LinkRef[] {
  const links: LinkRef[] = [];
  const patterns = [
    /\[(?:[^\]]*)\]\(([^)]+)\)/g,
    /\bhref\s*=\s*["']([^"']+)["']/gi,
    /\bsrc\s*=\s*["']([^"']+)["']/gi,
    /\b(?:href|url|resumeHref|avatar|portrait|cover|hero)\s*:\s*["']([^"']+)["']/gi,
    /href=\{["'`]([^"'`]+)["'`]\}/g,
  ];

  for (const pattern of patterns) {
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(source)) !== null) {
      links.push({ url: match[1].trim(), file, line: lineAt(source, match.index) });
    }
  }
  return links;
}

function normalizePath(pathname: string): string {
  let path = pathname.split("#")[0]?.split("?")[0] ?? pathname;
  if (path !== "/" && path.endsWith("/")) path = path.slice(0, -1);
  return path;
}

function isExternal(url: string): boolean {
  return /^https?:\/\//i.test(url) || url.startsWith("//");
}

function isIgnored(url: string): boolean {
  return (
    url.startsWith("#") ||
    url.startsWith("mailto:") ||
    url.startsWith("tel:") ||
    url.startsWith("javascript:") ||
    url.startsWith("data:") ||
    url.includes("${") ||
    url.includes("{")
  );
}

function publicFileExists(pathname: string): boolean {
  const rel = pathname.startsWith("/") ? pathname.slice(1) : pathname;
  return existsSync(join(PUBLIC, rel));
}

async function main() {
  const posts = await getAllPosts({ includeDrafts: true });
  const tags = await getAllTags({ includeDrafts: true });

  const validRoutes = new Set(STATIC_ROUTES);
  for (const post of posts) validRoutes.add(`/posts/${post.urlSlug}`);
  for (const tag of tags) validRoutes.add(`/tags/${tagToSlug(tag)}`);

  const scanFiles = [
    ...walkDir(join(ROOT, "content"), /\.(mdx?|ya?ml|tsx?)$/i),
    ...walkDir(join(ROOT, "app"), /\.tsx$/i),
    ...walkDir(join(ROOT, "components"), /\.tsx$/i),
  ];

  const broken: LinkRef[] = [];
  const seen = new Set<string>();
  let internal = 0;
  let external = 0;
  let skipped = 0;

  for (const file of scanFiles) {
    const source = readFileSync(file, "utf8");
    const relFile = relative(ROOT, file);

    for (const link of extractLinks(source, relFile)) {
      const { url } = link;
      if (isIgnored(url)) {
        skipped++;
        continue;
      }
      if (isExternal(url)) {
        external++;
        continue;
      }
      if (!url.startsWith("/")) {
        skipped++;
        continue;
      }

      internal++;
      const path = normalizePath(url);
      if (validRoutes.has(path) || publicFileExists(path)) continue;

      const key = `${relFile}:${link.line}:${path}`;
      if (seen.has(key)) continue;
      seen.add(key);
      broken.push({ ...link, url: path });
    }
  }

  if (broken.length > 0) {
    console.error(`Found ${broken.length} broken internal link(s):\n`);
    for (const item of broken) {
      console.error(`  ${item.file}:${item.line}  ${item.url}`);
    }
    process.exit(1);
  }

  console.log(
    `[check-links] OK — ${internal} internal, ${external} external (not checked), ${skipped} skipped`,
  );
}

main().catch((error) => {
  console.error("[check-links] Failed:", error instanceof Error ? error.message : error);
  process.exit(1);
});
