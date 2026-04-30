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
      <header className="px-1 pb-6 pt-2">
        <Tape rotation={-2} className="mb-3">
          the writing
        </Tape>
        <h1 className="my-3 font-display text-5xl leading-[0.95] tracking-tight md:text-6xl lg:text-[5.25rem]">
          {posts.length} essays. some good, some{" "}
          <span className="relative inline-block">
            spicy.
            <svg
              aria-hidden
              width="100%"
              height="40"
              viewBox="0 0 200 40"
              preserveAspectRatio="none"
              className="absolute -left-2 -top-2 h-[calc(100%+1rem)] w-[calc(100%+1rem)]"
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
        <p className="max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
          mostly devrel & devex, with regular detours into metrics, community, and the parts of
          leadership nobody wants to write about.
        </p>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {allTags.map((tag) => {
            const isActive = active === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActive(tag)}
                aria-pressed={isActive}
                className={cn(
                  "rounded-full border border-ink px-3.5 py-1 font-body text-xs transition-colors",
                  isActive ? "bg-accent text-paper" : "bg-card text-ink hover:bg-highlight",
                )}
              >
                #{tag}
              </button>
            );
          })}
        </div>
      </header>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {filtered.map((post, i) => (
          <PostCard key={post.urlSlug} post={post} index={i} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="my-10 rounded-md border border-dashed border-rule bg-card px-6 py-12 text-center">
          <p className="font-display text-2xl text-ink">No essays under #{active} yet.</p>
          <button
            type="button"
            onClick={() => setActive("all")}
            className="mt-3 text-sm text-accent underline underline-offset-4"
          >
            ← back to all essays
          </button>
        </div>
      ) : null}
    </>
  );
}
