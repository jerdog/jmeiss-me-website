import { visit } from "unist-util-visit";
import type { Root, Element, ElementContent } from "hast";

/**
 * Wraps `<table>` elements for horizontal scroll and panel styling on small screens.
 */
export function rehypeWrapTables() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element, index, parent) => {
      if (node.tagName !== "table" || !parent || index === undefined) return;
      const wrapper: Element = {
        type: "element",
        tagName: "div",
        properties: { className: ["mdx-table-wrap"] },
        children: [node as ElementContent],
      };
      parent.children[index] = wrapper;
    });
  };
}
