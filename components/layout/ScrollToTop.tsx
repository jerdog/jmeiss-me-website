"use client";

import { useEffect, useState } from "react";
import { smoothScrollToTop } from "@/lib/smooth-scroll";

/** Show once the reader has scrolled past the initial viewport fold. */
function pastFold(): boolean {
  const threshold = Math.max(240, Math.round(window.innerHeight * 0.25));
  return window.scrollY > threshold;
}

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(pastFold());
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      className="scroll-to-top"
      aria-label="Scroll to top"
      onClick={smoothScrollToTop}
    >
      ↑ top
    </button>
  );
}
