#!/usr/bin/env tsx
/**
 * Port Hugo shortcodes inside `content/posts/*.md(x)` files into MDX components.
 *
 * Replaces:
 *   {{< youtube ID >}}                       -> <YouTube id="ID" />
 *   {{< x user="USER" id="ID" >}}            -> <XEmbed user="USER" id="ID" />
 *   {{< figure src="..." attr="..." attrlink="..." width="..." caption="..." >}}
 *                                            -> <Figure src="..." attr="..." attrLink="..." caption="..." />
 *   {{< button href="..." relref="..." >}}…{{< /button >}}
 *                                            -> <Button href="...">…</Button>
 *
 * Idempotent: re-running on already-converted files is a no-op.
 *
 * Usage:
 *   npm run port-shortcodes        # dry-run, prints changes
 *   npm run port-shortcodes -- --write
 */

import { promises as fs } from "node:fs";
import path from "node:path";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

const args = new Set(process.argv.slice(2));
const WRITE = args.has("--write");
const VERBOSE = args.has("--verbose");

interface AttrMap {
  [key: string]: string;
}

/** Parse Hugo shortcode attributes like `user="foo" id=12345` -> object. */
function parseAttrs(input: string): AttrMap {
  const out: AttrMap = {};
  const positional: string[] = [];
  // Match `key="value"`, `key=value`, or bare positional values.
  const re = /(\w+)\s*=\s*("([^"]*)"|'([^']*)'|(\S+))|("([^"]*)"|'([^']*)'|(\S+))/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(input)) !== null) {
    if (m[1]) {
      const value = m[3] ?? m[4] ?? m[5] ?? "";
      out[m[1].toLowerCase()] = value;
    } else if (m[6]) {
      const value = m[7] ?? m[8] ?? m[9] ?? "";
      positional.push(value);
    }
  }
  if (positional.length > 0) out.__positional = positional.join(" ");
  return out;
}

const TRANSFORMS: Array<{
  name: string;
  regex: RegExp;
  replace: (match: string, ...captures: string[]) => string;
}> = [
  // Self-closing youtube: {{< youtube ID >}}  (positional ID)
  {
    name: "youtube",
    regex: /\{\{<\s*youtube\s+([^<>{}]+?)\s*>\}\}/g,
    replace: (_match, attrs) => {
      const parsed = parseAttrs(attrs);
      const id = parsed.id ?? parsed.__positional ?? "";
      return `<YouTube id="${id}" />`;
    },
  },
  // X / Twitter: {{< x user="..." id="..." >}}
  {
    name: "x",
    regex: /\{\{<\s*(?:x|twitter|tweet)\s+([^<>{}]+?)\s*>\}\}/g,
    replace: (_match, attrs) => {
      const parsed = parseAttrs(attrs);
      const user = parsed.user ?? "";
      const id = parsed.id ?? "";
      return `<XEmbed user="${user}" id="${id}" />`;
    },
  },
  // figure: {{< figure src="..." attr="..." attrlink="..." width="..." caption="..." >}}
  {
    name: "figure",
    regex: /\{\{<\s*figure\s+([^<>{}]+?)\s*>\}\}/g,
    replace: (_match, attrs) => {
      const parsed = parseAttrs(attrs);
      const props: string[] = [];
      if (parsed.src) props.push(`src="${escapeHtmlAttr(parsed.src)}"`);
      if (parsed.alt) props.push(`alt="${escapeHtmlAttr(parsed.alt)}"`);
      if (parsed.caption) props.push(`caption="${escapeHtmlAttr(parsed.caption)}"`);
      if (parsed.attr) props.push(`attr="${escapeHtmlAttr(parsed.attr)}"`);
      if (parsed.attrlink) props.push(`attrLink="${escapeHtmlAttr(parsed.attrlink)}"`);
      if (parsed.width && /^\d+$/.test(parsed.width)) props.push(`width={${parsed.width}}`);
      if (parsed.height && /^\d+$/.test(parsed.height)) props.push(`height={${parsed.height}}`);
      return `<Figure ${props.join(" ")} />`;
    },
  },
  // button (paired): {{< button relref="..." >}}label{{< /button >}}
  {
    name: "button",
    regex: /\{\{<\s*button\s+([^<>{}]+?)\s*>\}\}([\s\S]*?)\{\{<\s*\/button\s*>\}\}/g,
    replace: (_match, attrs, body) => {
      const parsed = parseAttrs(attrs);
      const href = parsed.href ?? parsed.relref ?? parsed.url ?? "#";
      const label = body.trim() || "Read more";
      return `<Button href="${escapeHtmlAttr(href)}">${label}</Button>`;
    },
  },
  // bluesky (defined but currently unused — supported for completeness)
  {
    name: "bluesky",
    regex: /\{\{<\s*bluesky\s+([^<>{}]+?)\s*>\}\}/g,
    replace: (_match, attrs) => {
      const parsed = parseAttrs(attrs);
      const url = parsed.link ?? parsed.url ?? parsed.__positional ?? "";
      return `<Bluesky url="${escapeHtmlAttr(url)}" />`;
    },
  },
];

function escapeHtmlAttr(s: string): string {
  return s.replace(/"/g, "&quot;").replace(/\\/g, "\\\\");
}

interface FileChange {
  file: string;
  hits: Record<string, number>;
  before: string;
  after: string;
}

async function processFile(filePath: string): Promise<FileChange | null> {
  const before = await fs.readFile(filePath, "utf8");
  let after = before;
  const hits: Record<string, number> = {};

  for (const t of TRANSFORMS) {
    const matches = after.match(t.regex);
    if (matches && matches.length > 0) hits[t.name] = matches.length;
    after = after.replace(t.regex, t.replace);
  }

  if (after === before) return null;
  return { file: filePath, hits, before, after };
}

async function main() {
  const entries = await fs.readdir(POSTS_DIR, { withFileTypes: true });
  const files = entries
    .filter((e) => e.isFile() && /\.mdx?$/.test(e.name) && !e.name.startsWith("_"))
    .map((e) => path.join(POSTS_DIR, e.name));

  const changes: FileChange[] = [];
  for (const file of files) {
    const change = await processFile(file);
    if (change) changes.push(change);
  }

  if (changes.length === 0) {
    console.log("No shortcodes found. Nothing to do.");
    return;
  }

  for (const change of changes) {
    const summary = Object.entries(change.hits)
      .map(([k, v]) => `${k}:${v}`)
      .join(" ");
    console.log(`[${WRITE ? "WRITE" : "DRY-RUN"}] ${path.relative(process.cwd(), change.file)}  (${summary})`);
    if (VERBOSE) {
      console.log("---- BEFORE ----");
      console.log(change.before);
      console.log("---- AFTER  ----");
      console.log(change.after);
    }
    if (WRITE) {
      await fs.writeFile(change.file, change.after, "utf8");
    }
  }

  if (!WRITE) {
    console.log(`\n${changes.length} files would change. Re-run with --write to apply.`);
  } else {
    console.log(`\n${changes.length} files updated.`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
