import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { NewTabHint } from "@/components/a11y/NewTabHint";
import { isOffSiteHref, offSiteAnchorProps } from "@/lib/off-site-href";

/** Block-level tags disallowed in YAML inline copy (content is unwrapped, not dropped). */
const DISALLOWED_BLOCKS = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "ul",
  "ol",
  "li",
  "blockquote",
  "pre",
  "hr",
  "img",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
  "dl",
  "dt",
  "dd",
] as const;

interface InlineMarkdownProps {
  children: string;
}

/**
 * Renders a short YAML string as inline-safe Markdown (**bold**, *em*, [links](url), `code`).
 * Block elements are stripped; paragraph breaks become `<br />`.
 */
export function InlineMarkdown({ children }: InlineMarkdownProps) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      skipHtml
      disallowedElements={[...DISALLOWED_BLOCKS]}
      unwrapDisallowed
      components={{
        p: ({ children: paragraphChildren }) => <>{paragraphChildren}</>,
        strong: ({ children: strongChildren }) => (
          <strong className="font-semibold">{strongChildren}</strong>
        ),
        em: ({ children: emChildren }) => <em>{emChildren}</em>,
        code: ({ children: codeChildren }) => (
          <code className="font-mono text-[0.92em]">{codeChildren}</code>
        ),
        a: ({ href, children: linkChildren }) => {
          if (!href) return <>{linkChildren}</>;
          if (isOffSiteHref(href)) {
            return (
              <a href={href} className="text-link" {...offSiteAnchorProps(href)}>
                {linkChildren}
                <NewTabHint />
              </a>
            );
          }
          return (
            <Link href={href} className="text-link">
              {linkChildren}
            </Link>
          );
        },
      }}
    >
      {children}
    </Markdown>
  );
}
