import { readFileSync } from "node:fs";
import { serialize } from "next-mdx-remote/serialize";
import rehypeStringify from "rehype-stringify";
import rehypeParse from "rehype-parse";
import { unified } from "unified";
import { mdxOptions } from "../lib/mdx";

async function main() {
  const body = readFileSync(
    "content/posts/developer-experience-more-than-productivity-metrics.mdx",
    "utf8",
  ).replace(/^---[\s\S]*?---\n/, "");

  const { compiledSource } = await (
    serialize as unknown as (
      src: string,
      opts: Parameters<typeof serialize>[1],
      rsc: boolean,
    ) => ReturnType<typeof serialize>
  )(body, { mdxOptions, parseFrontmatter: false }, true);

  // compiledSource is JS; run through MDX compile to HTML via rehype only on a snippet instead
  const snippet = body.slice(body.indexOf("Common culprits"), body.indexOf("## Defining"));
  const { compiledSource: snippetCompiled } = await (
    serialize as unknown as (
      src: string,
      opts: Parameters<typeof serialize>[1],
      rsc: boolean,
    ) => ReturnType<typeof serialize>
  )(snippet, { mdxOptions, parseFrontmatter: false }, true);

  // Use remark/rehype via serialize internals - easier: compile markdown chunk with same plugins
  const { remarkPlugins, rehypePlugins } = mdxOptions;
  const { compile } = await import("@mdx-js/mdx");
  const vfile = await compile(snippet, {
    remarkPlugins,
    rehypePlugins: [...rehypePlugins, rehypeStringify],
    format: "mdx",
  });
  console.log(String(vfile));
}

main().catch(console.error);
