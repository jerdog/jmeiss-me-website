import { Fragment, createElement, type ComponentType, type ReactElement } from "react";
import type { MDXComponents } from "mdx/types";
import { serialize } from "next-mdx-remote/serialize";
import { jsx, jsxs } from "react/jsx-runtime";
import { jsxDEV } from "react/jsx-dev-runtime";
import { mdxComponents } from "@/mdx-components";
import { mdxOptions } from "@/lib/mdx";

interface MDXContentProps {
  source: string;
  components?: MDXComponents;
}

const isDev = process.env.NODE_ENV !== "production";

/**
 * Server-side MDX renderer. We bypass `<MDXRemote/>` because `next-mdx-remote@6`
 * + React 19 dev mode trips the "without development properties" hydration
 * guard on rendered MDX output. Instead we compile via `serialize` (which
 * respects `mdxOptions.development` to pick the right JSX runtime call shape)
 * and feed the matching React JSX runtime functions back into the compiled
 * factory.
 *
 * In dev: MDX emits `_jsxDEV`-style calls; we pass `jsxDEV` for all three.
 * In prod: MDX emits `_jsx` and `_jsxs` calls; we pass the corresponding
 * functions from `react/jsx-runtime` so element types match the runtime
 * React expects to hydrate against.
 */
export async function MDXContent({
  source,
  components,
}: MDXContentProps): Promise<ReactElement> {
  // Third arg `rsc=true` makes serialize emit code that uses the JSX runtime
  // we pass in via `opts` rather than `_provideComponents` from @mdx-js/react.
  const { compiledSource } = await (
    serialize as unknown as (
      src: string,
      opts: Parameters<typeof serialize>[1],
      rsc: boolean,
    ) => ReturnType<typeof serialize>
  )(source, { mdxOptions, parseFrontmatter: false }, true);

  const runtime = isDev
    ? { jsx: jsxDEV, jsxs: jsxDEV, jsxDEV, Fragment }
    : { jsx, jsxs, jsxDEV, Fragment };

  const Content = Reflect.construct(Function, [
    "opts",
    "frontmatter",
    `${compiledSource}`,
  ]).apply(null, [runtime, {}]).default as ComponentType<{
    components?: MDXComponents;
  }>;

  return createElement(Content, {
    components: { ...mdxComponents, ...(components ?? {}) },
  });
}
