import { serialize } from "next-mdx-remote/serialize";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { readFileSync } from "node:fs";

const body = readFileSync(
  "content/posts/developer-experience-more-than-productivity-metrics.mdx",
  "utf8",
).replace(/^---[\s\S]*?---\n/, "");

const html = await unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeStringify)
  .process(body);

console.log(String(html).slice(800, 2200));
