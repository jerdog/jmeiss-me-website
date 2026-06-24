import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import type { Pluggable } from "unified";
import type { TocEntry } from "@/components/post/ContentsRail";
import { rehypeUnwrapMedia } from "@/lib/rehype-unwrap-media";
import { rehypeTableScope } from "@/lib/rehype-table-scope";

/**
 * Shared remark/rehype plugin chain for MDX rendering on post pages.
 *
 * Order matters: rehypeSlug runs first so headings get IDs, then
 * rehypeAutolinkHeadings injects an `#`-anchor next to each heading,
 * then rehypePrettyCode handles fenced code blocks via Shiki.
 */
/**
 * `development: true` tells @mdx-js/mdx (transitively used by
 * next-mdx-remote) to emit `_jsxDEV` calls with full source location props
 * when running in dev. Without it, MDX components fail to render under
 * `next dev` + React 19 with "Attempted to render … without development
 * properties." Production builds set NODE_ENV=production so this flips off.
 */
export const mdxOptions = {
  development: process.env.NODE_ENV !== "production",
  remarkPlugins: [remarkGfm] as Pluggable[],
  rehypePlugins: [
    rehypeUnwrapMedia,
    rehypeSlug,
    [
      rehypeAutolinkHeadings,
      {
        behavior: "append",
        properties: { className: ["heading-anchor"], ariaHidden: true, tabIndex: -1 },
        content: { type: "text", value: " #" },
      },
    ],
    [
      rehypePrettyCode,
      {
        theme: { dark: "github-dark-dimmed", light: "github-light" },
        keepBackground: false,
        defaultLang: "plaintext",
      },
    ],
    rehypeTableScope,
  ] as Pluggable[],
};

const headingRegex = /^(#{2,3})\s+(.+?)\s*$/gm;

const slugify = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

/**
 * Extract a flat ToC from a Markdown/MDX body. Only collects H2 and H3
 * headings — deeper levels add visual noise without helping navigation.
 *
 * Slugs match the ones produced by `rehypeSlug` (GitHub-style), so the
 * generated anchor links resolve correctly.
 */
export function extractToc(body: string): TocEntry[] {
  const entries: TocEntry[] = [];
  // Strip fenced code blocks so headings inside code don't get picked up.
  const sanitized = body.replace(/```[\s\S]*?```/g, "");
  let match: RegExpExecArray | null;
  while ((match = headingRegex.exec(sanitized)) !== null) {
    const depth = match[1].length;
    const text = match[2].replace(/[*_`]/g, "").trim();
    if (!text) continue;
    entries.push({ id: slugify(text), text, depth });
  }
  return entries;
}
