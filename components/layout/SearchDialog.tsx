"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

/**
 * The full search modal — Pagefind loader, results, debounced search — is
 * code-split via next/dynamic and only fetched when the user actually opens
 * search. The trigger button + keyboard shortcut listener stay in the
 * always-shipped layout chunk so Cmd/Ctrl+K and "/" work immediately.
 */
const SearchModal = dynamic(() => import("./SearchModal"), { ssr: false });

export function SearchDialog() {
  const [open, setOpen] = useState(false);

  // Open with `/` or Cmd/Ctrl+K. Close with Escape. The modal also handles
  // its own Esc internally once mounted, but we keep this here so the
  // shortcut works without paying the cost of loading the modal up front.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      const isTyping = tag === "input" || tag === "textarea" || target?.isContentEditable;
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !isTyping)) {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape" && open) setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open search"
        className="inline-flex w-full items-center gap-2 rounded-full border border-paper/30 bg-paper/5 px-3 py-1.5 text-xs text-paper/80 transition-colors hover:bg-paper/10 sm:w-auto"
      >
        <span aria-hidden>⌕</span>
        <span>Search</span>
        <span className="ml-2 rounded border border-paper/20 bg-paper/10 px-1 font-mono text-[10px]">
          ⌘K
        </span>
      </button>

      {open ? <SearchModal onClose={() => setOpen(false)} /> : null}
    </>
  );
}
