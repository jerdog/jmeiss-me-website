"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export interface TocEntry {
  id: string;
  text: string;
  depth: number;
}

interface ContentsRailProps {
  entries: TocEntry[];
}

/**
 * Sticky right rail with table of contents and a reading-progress bar that
 * tracks the entire article based on scroll position.
 */
export function ContentsRail({ entries }: ContentsRailProps) {
  const [activeId, setActiveId] = useState<string | null>(entries[0]?.id ?? null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (entries.length === 0) return;

    const headings = entries
      .map((e) => document.getElementById(e.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (records) => {
        const visible = records
          .filter((r) => r.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );

    for (const h of headings) observer.observe(h);
    return () => observer.disconnect();
  }, [entries]);

  useEffect(() => {
    function onScroll() {
      const article = document.querySelector("[data-post-article]");
      if (!article) return;
      const rect = article.getBoundingClientRect();
      const scrolled = -rect.top;
      const total = rect.height - window.innerHeight;
      const ratio = total > 0 ? Math.max(0, Math.min(1, scrolled / total)) : 0;
      setProgress(ratio);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (entries.length === 0) return null;

  return (
    <aside className="pt-2">
      <div className="sticky top-24 border border-ink bg-card px-5 py-4">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
          contents
        </p>
        <ul className="space-y-1.5 text-sm leading-loose">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className={cn(
                "transition-colors",
                entry.depth >= 3 ? "pl-3" : "",
                activeId === entry.id ? "text-warm font-medium" : "text-ink-soft",
              )}
            >
              <a
                href={`#${entry.id}`}
                className="block hover:text-accent focus:text-accent"
              >
                {activeId === entry.id ? "→ " : "· "}
                {entry.text}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-4 border-t border-dashed border-paper-deep pt-3">
          <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            reading progress
          </p>
          <div
            className="h-1.5 bg-paper-deep"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
            aria-label="Reading progress"
          >
            <div
              className="h-full bg-warm transition-[width]"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
