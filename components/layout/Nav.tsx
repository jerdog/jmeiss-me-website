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

  const [lastPath, setLastPath] = useState(pathname);
  useEffect(() => {
    if (pathname !== lastPath) {
      setOpen(false);
      setLastPath(pathname);
    }
  }, [pathname, lastPath]);

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
    <header className="nav">
      <div className="nav__inner">
        <Link href="/" className="nav__brand">
          <span aria-hidden className="nav__monogram">
            jm
          </span>
          <span className="nav__name">jeremy meiss</span>
          <span
            aria-hidden
            className="nav__alias reduced-motion-flat"
            style={{ transform: "rotate(-3deg)" }}
          >
            (jerdog)
          </span>
        </Link>

        <div className="nav__desktop">
          <nav aria-label="Primary" className="nav__links">
            {items.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "nav-link",
                    active ? "nav-link--active" : "nav-link--inactive",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <SearchDialog />
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
          onClick={() => setOpen((v) => !v)}
          className="nav__menu-btn"
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

      {open ? (
        <div className="nav__mobile-only">
          <div aria-hidden onClick={closeMenu} className="nav__overlay" />
          <div id="mobile-nav-panel" ref={panelRef} className="nav__panel">
            <nav aria-label="Primary" className="nav__mobile-links">
              {items.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "nav-link nav-link--mobile",
                      active ? "nav-link--active" : "nav-link--inactive",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="nav__mobile-search">
                <SearchDialog />
              </div>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
