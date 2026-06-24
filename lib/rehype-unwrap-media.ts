import { visit } from "unist-util-visit";
import type { Element, Parents, Root, Text } from "hast";

/** Block-level media tags that must not live inside `<p>`. */
const UNWRAP_TAGS = new Set(["img", "figure", "video", "iframe"]);

function isWhitespaceText(node: unknown): node is Text {
  return node != null && typeof node === "object" && (node as Text).type === "text" && /^\s*$/.test((node as Text).value);
}

function isMediaElement(node: unknown): node is Element {
  return (
    node != null &&
    typeof node === "object" &&
    (node as Element).type === "element" &&
    UNWRAP_TAGS.has((node as Element).tagName)
  );
}

function meaningfulChildren(children: Element["children"]) {
  return children.filter((child) => !isWhitespaceText(child));
}

/**
 * Markdown wraps `![alt](src)` in `<p>`. Caption lines on the next row
 * (without a blank line) land in the same paragraph, e.g.
 * `![img](x.png)\n(Source: …)`. Our MDX `img` component renders a
 * `<figure>`, which is invalid inside `<p>` and triggers hydration errors.
 *
 * Hoist media elements out of their paragraph — including when mixed with
 * inline caption text — so block figures never nest inside `<p>`.
 */
export function rehypeUnwrapMedia() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element, index, parent: Parents | undefined) => {
      if (node.tagName !== "p" || parent == null || index == null) return;

      const meaningful = meaningfulChildren(node.children);
      const media = meaningful.filter(isMediaElement);
      if (media.length === 0) return;

      const nonMedia = meaningful.filter((child) => !isMediaElement(child));

      if (nonMedia.length === 0) {
        parent.children.splice(index, 1, ...(media.length === 1 ? [media[0]] : media));
        return;
      }

      const remainder: Element = {
        type: "element",
        tagName: "p",
        properties: node.properties,
        children: nonMedia,
      };

      parent.children.splice(index, 1, ...media, remainder);
    });
  };
}
