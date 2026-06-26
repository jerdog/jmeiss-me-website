"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { cn } from "@/lib/cn";
import { smoothScrollToElement } from "@/lib/smooth-scroll";

export interface TocEntry {
  id: string;
  text: string;
  depth: number;
}

interface ContentsRailProps {
  entries: TocEntry[];
}

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

  function handleTocClick(event: MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      smoothScrollToElement(target);
      history.replaceState(null, "", `#${id}`);
    }
  }

  if (entries.length === 0) return null;

  return (
    <aside className="contents-rail">
      <div className="contents-rail__panel">
        <p className="contents-rail__label">contents</p>
        <ul className="contents-rail__list">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className={cn(
                "contents-rail__item",
                entry.depth >= 3 && "contents-rail__item--nested",
                activeId === entry.id
                  ? "contents-rail__item--active"
                  : "contents-rail__item--inactive",
              )}
            >
              <a
                href={`#${entry.id}`}
                className="contents-rail__link"
                onClick={(event) => handleTocClick(event, entry.id)}
              >
                {activeId === entry.id ? "→ " : "· "}
                {entry.text}
              </a>
            </li>
          ))}
        </ul>
        <div className="contents-rail__progress-wrap">
          <p className="contents-rail__progress-label">reading progress</p>
          <div
            className="contents-rail__progress-track"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
            aria-label="Reading progress"
          >
            <div
              className="contents-rail__progress-bar"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
