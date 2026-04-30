import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

/**
 * Heterogeneous frontmatter shape across the 23 legacy Hugo posts.
 *
 * Files use either TOML (`+++`) or YAML (`---`) frontmatter, and several
 * legacy keys overlap (`summary`/`description`, `keywords`/`tags`, `hero`/`cover`).
 * We accept the messy input here and normalize via `normalizePost`.
 */
const RawFrontmatter = z
  .object({
    title: z.string().min(1),
    date: z.union([z.string(), z.date()]).optional(),
    publishDate: z.union([z.string(), z.date()]).optional(),
    updated: z.union([z.string(), z.date()]).optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
    keywords: z.array(z.string()).optional(),
    description: z.string().optional(),
    summary: z.string().optional(),
    excerpt: z.string().optional(),
    hero: z.string().optional(),
    cover: z.string().optional(),
    slug: z.string().optional(),
    canonical: z.string().optional(),
    toc: z.boolean().optional(),
    author: z.unknown().optional(),
  })
  .passthrough();

export interface PostFrontmatter {
  title: string;
  /** ISO 8601 date string. */
  date: string;
  /** ISO 8601 date string when the post was last updated. */
  updated?: string;
  draft: boolean;
  tags: string[];
  excerpt: string;
  cover?: string;
  /** Frontmatter slug override (only used when present). */
  slug?: string;
  /** External canonical URL for cross-posts. */
  canonical?: string;
  toc: boolean;
}

export interface PostSummary extends PostFrontmatter {
  /** URL slug — frontmatter `slug` if set, otherwise filename without extension. */
  urlSlug: string;
  /** Filename without extension (used to find the source file). */
  fileSlug: string;
  /** Estimated read time in minutes (computed from word count). */
  readMinutes: number;
}

export interface Post extends PostSummary {
  /** Raw MDX content body (no frontmatter). */
  content: string;
}

const dateToIso = (value: string | Date | undefined): string | undefined => {
  if (value === undefined) return undefined;
  if (value instanceof Date) return value.toISOString();
  // gray-matter sometimes returns Date instances depending on engine; sometimes string.
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return parsed.toISOString();
};

const computeReadMinutes = (content: string): number => {
  const words = content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
};

const stripMarkdownish = (text: string): string =>
  text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const firstParagraph = (content: string): string => {
  const lines = content.split("\n");
  const buf: string[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.length === 0) {
      if (buf.length > 0) break;
      continue;
    }
    if (trimmed.startsWith("#") || trimmed.startsWith(">") || trimmed.startsWith("---"))
      continue;
    buf.push(trimmed);
  }
  return stripMarkdownish(buf.join(" ")).slice(0, 240);
};

/**
 * Coerce mixed legacy frontmatter into the normalized `PostFrontmatter` shape.
 * - `summary` -> `description` -> first paragraph -> "" (last resort)
 * - `keywords` merged into `tags` (deduped)
 * - `hero` -> `cover`
 * - the nested `[author]` block (single-author site) is dropped
 */
function normalizeFrontmatter(
  raw: z.infer<typeof RawFrontmatter>,
  body: string,
): PostFrontmatter {
  const dateRaw = raw.publishDate ?? raw.date;
  const date = dateToIso(dateRaw);
  if (!date) {
    throw new Error(`Invalid or missing date frontmatter (got: ${String(dateRaw)})`);
  }

  const updated = dateToIso(raw.updated);

  const tagSet = new Set<string>();
  const addTag = (t: string) => {
    const cleaned = t.trim().toLowerCase();
    if (cleaned) tagSet.add(cleaned);
  };
  for (const t of raw.tags ?? []) addTag(t);
  for (const k of raw.keywords ?? []) addTag(k);
  const tags = Array.from(tagSet);

  const excerpt =
    raw.excerpt?.trim() ||
    raw.summary?.trim() ||
    raw.description?.trim() ||
    firstParagraph(body) ||
    "";

  return {
    title: raw.title.trim(),
    date,
    updated,
    draft: Boolean(raw.draft),
    tags,
    excerpt,
    cover: normalizeAssetPath((raw.cover ?? raw.hero)?.trim()),
    slug: raw.slug?.trim() || undefined,
    canonical: raw.canonical?.trim() || undefined,
    toc: Boolean(raw.toc),
  };
}

/**
 * gray-matter has no built-in TOML engine in CJS; configure one inline using a
 * minimal hand-rolled TOML reader. Posts in this repo only use top-level keys,
 * arrays, and one nested table (`[author]`) — keeping the parser tiny.
 *
 * We delegate to gray-matter's default YAML engine for `---`, and our TOML
 * parser kicks in when the delimiter is `+++`.
 */
const tomlEngine = {
  parse: (input: string) => parseSimpleToml(input),
  stringify: () => {
    throw new Error("TOML stringify is not implemented");
  },
};

/**
 * Tiny TOML reader sufficient for the legacy frontmatter shapes used in this
 * repo. Handles top-level keys, ISO dates, booleans, numbers, double-quoted
 * strings (with simple escapes), and arrays of strings. Tables (`[author]`)
 * are parsed into nested objects but we don't actually consume them later.
 *
 * Not a general TOML implementation — keep it boring.
 */
function parseSimpleToml(input: string): Record<string, unknown> {
  const lines = input.split(/\r?\n/);
  const root: Record<string, unknown> = {};
  let table: Record<string, unknown> = root;
  for (const raw of lines) {
    const stripped = raw.replace(/^\s+|\s+$/g, "");
    if (!stripped || stripped.startsWith("#")) continue;
    const tableMatch = stripped.match(/^\[([^\]]+)\]$/);
    if (tableMatch) {
      const key = tableMatch[1].trim();
      const next: Record<string, unknown> = {};
      root[key] = next;
      table = next;
      continue;
    }
    const kv = stripped.match(/^([A-Za-z0-9_-]+)\s*=\s*(.+)$/);
    if (!kv) continue;
    const [, key, valueRaw] = kv;
    table[key] = parseTomlValue(stripInlineComment(valueRaw).trim());
  }
  return root;
}

/**
 * Some posts (carried over from Hugo) reference assets without a leading `/`,
 * e.g. `hero = "images/posts/foo.png"`. Hugo serves these from `static/` so
 * they resolve, but Next.js treats unprefixed paths as relative. Normalize to
 * site-root absolute paths unless the asset is already absolute or remote.
 */
function normalizeAssetPath(value: string | undefined): string | undefined {
  if (!value) return value;
  if (/^(?:https?:)?\/\//.test(value) || value.startsWith("/")) return value;
  return `/${value}`;
}

/**
 * Strip an unquoted trailing `# comment`. Walks the input character by
 * character respecting double-quoted and single-quoted strings so we don't
 * accidentally truncate values that contain `#`.
 */
function stripInlineComment(input: string): string {
  let inDouble = false;
  let inSingle = false;
  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    const prev = input[i - 1];
    if (ch === '"' && prev !== "\\" && !inSingle) inDouble = !inDouble;
    else if (ch === "'" && prev !== "\\" && !inDouble) inSingle = !inSingle;
    else if (ch === "#" && !inDouble && !inSingle) {
      return input.slice(0, i);
    }
  }
  return input;
}

function parseTomlValue(input: string): unknown {
  if (input.startsWith('"') && input.endsWith('"')) {
    return input.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\");
  }
  if (input === "true" || input === "false") return input === "true";
  if (/^-?\d+$/.test(input)) return Number(input);
  if (/^-?\d+\.\d+$/.test(input)) return Number(input);
  // ISO datetime (e.g. 2024-06-12T12:15:11-05:00)
  if (/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:?\d{2})?)?$/.test(input)) {
    return new Date(input);
  }
  if (input.startsWith("[") && input.endsWith("]")) {
    const inner = input.slice(1, -1).trim();
    if (!inner) return [];
    // naive split — fine because posts only use string arrays in legacy frontmatter
    return inner
      .split(",")
      .map((s) => s.trim())
      .map((s) => parseTomlValue(s));
  }
  return input;
}

interface ParseOptions {
  /** Include drafts. Defaults to false in production, true in dev. */
  includeDrafts?: boolean;
}

async function readPostFile(filePath: string): Promise<Post> {
  const fileSlug = path.basename(filePath).replace(/\.mdx?$/, "");
  const source = await fs.readFile(filePath, "utf8");

  // Detect frontmatter delimiter and pick the engine.
  const trimmed = source.trimStart();
  const isTomlFrontmatter = trimmed.startsWith("+++");

  const parsed = matter(source, {
    delimiters: isTomlFrontmatter ? "+++" : "---",
    engines: isTomlFrontmatter
      ? { toml: tomlEngine, "+++": tomlEngine }
      : undefined,
    language: isTomlFrontmatter ? "toml" : "yaml",
  });

  let validated: z.infer<typeof RawFrontmatter>;
  try {
    validated = RawFrontmatter.parse(parsed.data);
  } catch (err) {
    if (err instanceof z.ZodError) {
      const issues = err.issues
        .map((i) => `${i.path.join(".")}: ${i.message}`)
        .join("; ");
      throw new Error(`${path.basename(filePath)} — frontmatter invalid: ${issues}`);
    }
    throw err;
  }
  let normalized: PostFrontmatter;
  try {
    normalized = normalizeFrontmatter(validated, parsed.content);
  } catch (err) {
    throw new Error(
      `${path.basename(filePath)} — ${err instanceof Error ? err.message : String(err)}`,
    );
  }

  const urlSlug = normalized.slug ?? fileSlug;
  const readMinutes = computeReadMinutes(parsed.content);

  return {
    ...normalized,
    fileSlug,
    urlSlug,
    readMinutes,
    content: parsed.content,
  };
}

let cache: Promise<Post[]> | null = null;

async function readAllPosts(): Promise<Post[]> {
  if (cache) return cache;
  cache = (async () => {
    const entries = await fs.readdir(POSTS_DIR, { withFileTypes: true });
    const files = entries
      .filter((e) => e.isFile() && /\.mdx?$/.test(e.name) && !e.name.startsWith("_"))
      .map((e) => path.join(POSTS_DIR, e.name));
    const posts = await Promise.all(files.map(readPostFile));
    posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
    return posts;
  })();
  return cache;
}

function isPublished(post: Post, opts: ParseOptions): boolean {
  if (post.draft && !opts.includeDrafts) return false;
  return true;
}

/** All posts, newest first, drafts excluded by default. */
export async function getAllPosts(opts: ParseOptions = {}): Promise<PostSummary[]> {
  const posts = await readAllPosts();
  return posts.filter((p) => isPublished(p, opts)).map((p) => stripContent(p));
}

function stripContent(post: Post): PostSummary {
  const summary: PostSummary = {
    title: post.title,
    date: post.date,
    updated: post.updated,
    draft: post.draft,
    tags: post.tags,
    excerpt: post.excerpt,
    cover: post.cover,
    slug: post.slug,
    canonical: post.canonical,
    toc: post.toc,
    fileSlug: post.fileSlug,
    urlSlug: post.urlSlug,
    readMinutes: post.readMinutes,
  };
  return summary;
}

/** Single post by URL slug (frontmatter slug -> filename slug). */
export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await readAllPosts();
  return posts.find((p) => p.urlSlug === slug);
}

export async function getPostsByTag(
  tag: string,
  opts: ParseOptions = {},
): Promise<PostSummary[]> {
  const all = await getAllPosts(opts);
  const lower = tag.toLowerCase();
  return all.filter((p) => p.tags.includes(lower));
}

export async function getAllTags(opts: ParseOptions = {}): Promise<string[]> {
  const all = await getAllPosts(opts);
  const set = new Set<string>();
  for (const p of all) for (const t of p.tags) set.add(t);
  return Array.from(set).sort();
}

/**
 * Count of posts per tag, useful for tag clouds and the writing index filter.
 */
export async function getTagCounts(
  opts: ParseOptions = {},
): Promise<Record<string, number>> {
  const all = await getAllPosts(opts);
  const counts: Record<string, number> = {};
  for (const p of all) for (const t of p.tags) counts[t] = (counts[t] ?? 0) + 1;
  return counts;
}

/** Slugify a tag for URL use (kebab-case). The display title is the original. */
export function tagToSlug(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Resolve a slugged tag back to the canonical (lowercased) tag stored on posts. */
export async function tagFromSlug(slug: string): Promise<string | undefined> {
  const tags = await getAllTags({ includeDrafts: true });
  return tags.find((t) => tagToSlug(t) === slug);
}

/** Adjacent posts (newer/older) for the post detail page. */
export async function getAdjacentPosts(slug: string): Promise<{
  previous?: PostSummary;
  next?: PostSummary;
}> {
  const all = await getAllPosts();
  const idx = all.findIndex((p) => p.urlSlug === slug);
  if (idx === -1) return {};
  return {
    previous: all[idx + 1],
    next: idx > 0 ? all[idx - 1] : undefined,
  };
}

/**
 * "Related" picks: posts that share at least one tag with the given slug.
 * Falls back to the most recent posts if there are no tag overlaps.
 */
export async function getRelatedPosts(slug: string, limit = 3): Promise<PostSummary[]> {
  const all = await getAllPosts();
  const target = all.find((p) => p.urlSlug === slug);
  if (!target) return [];
  const others = all.filter((p) => p.urlSlug !== slug);

  const scored = others
    .map((p) => ({
      post: p,
      score: p.tags.filter((t) => target.tags.includes(t)).length,
    }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score || (a.post.date < b.post.date ? 1 : -1))
    .slice(0, limit)
    .map((s) => s.post);

  if (scored.length >= limit) return scored;
  const filler = others
    .filter((p) => !scored.includes(p))
    .slice(0, limit - scored.length);
  return [...scored, ...filler];
}
