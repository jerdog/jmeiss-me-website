import { visit } from "unist-util-visit";
import type { Root, Element } from "hast";

/**
 * Adds scope="col" to table header cells that lack a scope attribute.
 * Improves screen-reader table navigation (WCAG 1.3.1 H63).
 */
export function rehypeTableScope() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "th") return;
      const props = node.properties ?? {};
      if (props.scope === undefined) {
        node.properties = { ...props, scope: "col" };
      }
    });
  };
}
