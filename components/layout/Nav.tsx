"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { SearchDialog } from "@/components/layout/SearchDialog";

const items = [
  { href: "/", label: "home" },
  { href: "/posts", label: "writing" },
  { href: "/speaking", label: "speaking" },
  { href: "/about", label: "about + now" },
];

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => {
    setOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  // Close the panel whenever the route changes. We diff against the previous
  // pathname so biome's exhaustive-deps check sees pathname being read.
  const [lastPath, setLastPath] = useState(pathname);
  useEffect(() => {
    if (pathname !== lastPath) {
      setOpen(false);
      setLastPath(pathname);
    }
  }, [pathname, lastPath]);

  // Focus the first link when the panel opens; trap focus while open.
  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const focusable = panel
      ? Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
          (el) => el.getAttribute("aria-hidden") !== "true",
        )
      : [];
    focusable[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
        return;
      }
      if (e.key !== "Tab" || !panel) return;

      const nodes = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.getAttribute("aria-hidden") !== "true",
      );
      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, closeMenu]);

  return (
    <header className="sticky top-0 z-40 bg-ink text-paper">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-4 px-5 py-4 sm:px-8 md:px-10">
        <Link href="/" className="flex items-center gap-3 rounded-full">
          <span
            aria-hidden
            className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-soft font-display text-base font-bold text-ink"
          >
            jm
          </span>
          <span className="font-display text-xl tracking-tight">jeremy meiss</span>
          <span
            aria-hidden
            className="reduced-motion-flat hidden font-hand text-lg text-highlight sm:inline-block"
            style={{ transform: "rotate(-3deg)" }}
          >
            (jerdog)
          </span>
        </Link>

        {/* Desktop nav: visible from sm up. */}
        <div className="hidden items-center gap-2 sm:flex sm:gap-3">
          <nav aria-label="Primary" className="flex items-center gap-1">
            {items.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3 py-2 text-sm transition-colors sm:px-4",
                    active
                      ? "bg-accent-soft font-medium text-ink"
                      : "text-paper hover:bg-paper/10",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <SearchDialog />
        </div>

        {/* Mobile: hamburger toggle, hidden from sm up. */}
        <button
          ref={menuButtonRef}
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-paper transition-colors hover:bg-paper/10 sm:hidden"
        >
          <svg
            aria-hidden
            role="presentation"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drop-down panel. Drop-down anchored under the bar; full-width
          dim covers the rest of the page so taps outside close it. */}
      {open ? (
        <div className="sm:hidden">
          <div
            aria-hidden
            onClick={closeMenu}
            className="fixed inset-0 top-[64px] z-30 cursor-default bg-ink/60 backdrop-blur-[2px]"
          />
          <div
            id="mobile-nav-panel"
            ref={panelRef}
            className="absolute inset-x-0 z-40 border-t border-paper/15 bg-ink shadow-lg"
          >
            <nav aria-label="Primary" className="flex flex-col gap-1 px-5 py-4">
              {items.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-full px-4 py-3 text-base transition-colors",
                      active
                        ? "bg-accent-soft font-medium text-ink"
                        : "text-paper hover:bg-paper/10",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="mt-2 border-t border-paper/10 pt-3">
                <SearchDialog />
              </div>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
