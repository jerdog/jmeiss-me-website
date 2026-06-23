import { visit } from "unist-util-visit";
import type { Element, Parents, Root } from "hast";

/** Block-level media tags that must not live inside `<p>`. */
const UNWRAP_TAGS = new Set(["img", "figure", "video", "iframe"]);

/**
 * Markdown wraps standalone `![alt](src)` images in `<p>`. Our MDX `img`
 * component renders a `<figure>`, which is invalid inside `<p>` and triggers
 * React hydration warnings. Hoist lone media elements out of their paragraph.
 */
export function rehypeUnwrapMedia() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element, index, parent: Parents | undefined) => {
      if (node.tagName !== "p" || parent == null || index == null) return;

      const { children } = node;
      if (children.length !== 1) return;

      const only = children[0];
      if (only.type !== "element" || !UNWRAP_TAGS.has(only.tagName)) return;

      parent.children.splice(index, 1, only);
    });
  };
}
