import type { ComponentType, ReactElement } from "react";
import type { MDXComponents } from "mdx/types";
import { serialize } from "next-mdx-remote/serialize";
import { jsx as jsxProd } from "react/jsx-runtime";
import { jsxDEV } from "react/jsx-dev-runtime";
// `next-mdx-remote/rsc` re-exports the same `jsxRuntime` constant it uses for
// rendering, but importing it directly lets us avoid React.createElement (which
// React 19 dev mode rejects when the child component was compiled with
// `_jsxDEV`). Picking the runtime to match `process.env.NODE_ENV` is exactly
// what the library does in `dist/jsx-runtime.cjs`, so behavior is consistent.
import { mdxComponents } from "@/mdx-components";
import { mdxOptions } from "@/lib/mdx";

interface MDXContentProps {
  source: string;
  components?: MDXComponents;
}

const jsxFn =
  process.env.NODE_ENV === "production"
    ? (jsxProd as unknown as typeof jsxDEV)
    : jsxDEV;

/**
 * Server-side MDX renderer. Compiles via `next-mdx-remote/serialize` (which
 * already respects `process.env.NODE_ENV` for the `development` MDX flag) and
 * then constructs the element with the matching React JSX runtime so dev mode
 * doesn't trip the "without development properties" guard introduced in
 * React 19.
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

  const Content = Reflect.construct(Function, [
    "opts",
    "frontmatter",
    `${compiledSource}`,
  ]).apply(null, [
    {
      // mdx 3 emits both jsx and jsxs in production, jsx + jsxDEV in dev.
      jsx: jsxFn,
      jsxs: jsxFn,
      jsxDEV,
      Fragment: (await import("react")).Fragment,
    },
    {},
  ]).default as ComponentType<{ components?: MDXComponents }>;

  return jsxFn(
    Content,
    { components: { ...mdxComponents, ...(components ?? {}) } },
    undefined,
    false,
    { fileName: "<mdx-content>" },
    null,
  );
}
