export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scrollBehavior(): ScrollBehavior {
  return prefersReducedMotion() ? "auto" : "smooth";
}

export function smoothScrollToTop() {
  window.scrollTo({ top: 0, behavior: scrollBehavior() });
}

export function smoothScrollToElement(element: Element) {
  element.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
}
