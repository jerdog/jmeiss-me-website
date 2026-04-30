import type { MDXComponents } from "mdx/types";
import { YouTube } from "@/components/post/YouTube";
import { XEmbed } from "@/components/post/XEmbed";
import { Figure } from "@/components/post/Figure";
import { Button } from "@/components/post/Button";
import { PullQuote } from "@/components/post/PullQuote";
import { Callout } from "@/components/post/Callout";
import { PostImage } from "@/components/post/PostImage";
import { Tape } from "@/components/surfaces/Tape";

/**
 * Component map applied during MDX rendering. Authors can use these tags
 * directly inside `.mdx` post bodies.
 */
export const mdxComponents: MDXComponents = {
  YouTube,
  XEmbed,
  Figure,
  Button,
  PullQuote,
  Callout,
  Tape,
  img: (props) => {
    const { src, alt, width, height } = props as {
      src?: string;
      alt?: string;
      width?: number | string;
      height?: number | string;
    };
    if (!src) return null;
    const w = typeof width === "string" ? Number(width) : width;
    const h = typeof height === "string" ? Number(height) : height;
    return <PostImage src={src} alt={alt} width={w} height={h} />;
  },
};

/**
 * Next.js App Router convention: the framework automatically picks up
 * `useMDXComponents` from `mdx-components.tsx` at the project root for
 * `.mdx` page files.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...mdxComponents, ...components };
}
