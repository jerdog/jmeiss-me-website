"use client";

import { useMemo, useState } from "react";
import { Tape } from "@/components/surfaces/Tape";
import { PostCard } from "@/components/posts/PostCard";
import type { PostSummary } from "@/lib/posts";
import { cn } from "@/lib/cn";

interface PostsIndexClientProps {
  posts: PostSummary[];
  tags: string[];
}

export function PostsIndexClient({ posts, tags }: PostsIndexClientProps) {
  const [active, setActive] = useState<string>("all");

  const filtered = useMemo(() => {
    if (active === "all") return posts;
    return posts.filter((p) => p.tags.includes(active));
  }, [posts, active]);

  const allTags = ["all", ...tags];

  return (
    <>
      <header className="posts-index__header">
        <Tape rotation={-2} className="posts-index__tape">
          the writing
        </Tape>
        <h1 className="posts-index__title">
          {posts.length} essays. some good, some{" "}
          <span className="posts-index__highlight">
            spicy.
            <svg
              aria-hidden
              width="100%"
              height="40"
              viewBox="0 0 200 40"
              preserveAspectRatio="none"
              className="posts-index__scribble"
            >
              <path
                d="M10,30 Q50,2 100,18 T190,12 Q190,38 100,32 T10,30 Z"
                stroke="var(--color-warm)"
                strokeWidth="2.5"
                fill="none"
              />
            </svg>
          </span>
        </h1>
        <p className="posts-index__lede">
          mostly devrel & devex, with regular detours into metrics, community, and the parts of
          leadership nobody wants to write about.
        </p>

        <div className="posts-index__filters" role="group" aria-label="Filter essays by tag">
          {allTags.map((tag) => {
            const isActive = active === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActive(tag)}
                aria-pressed={isActive}
                aria-label={tag === "all" ? "Show all essays" : `Filter by ${tag}`}
                className={cn(
                  "filter-chip",
                  isActive ? "filter-chip--active" : "filter-chip--inactive",
                )}
              >
                #{tag}
              </button>
            );
          })}
        </div>
      </header>

      <div className="posts-index__grid">
        {filtered.map((post, i) => (
          <PostCard key={post.urlSlug} post={post} index={i} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="posts-index__empty">
          <p className="empty-state-title">No essays under #{active} yet.</p>
          <button type="button" onClick={() => setActive("all")} className="btn-text-spaced">
            ← back to all essays
          </button>
        </div>
      ) : null}
    </>
  );
}
