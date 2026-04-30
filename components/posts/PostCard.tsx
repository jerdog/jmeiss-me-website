import Link from "next/link";
import { Card } from "@/components/surfaces/Card";
import type { PostSummary } from "@/lib/posts";

interface PostCardProps {
  post: PostSummary;
  /** Index in the visible list — used to alternate dark/light treatment. */
  index?: number;
  /** When true, render the dark variant. Overrides index-based logic. */
  dark?: boolean;
}

export function PostCard({ post, index = 0, dark }: PostCardProps) {
  const isDark = dark ?? index % 3 === 0;
  const variant = isDark ? "ink" : "card";
  const shadow = isDark ? "warm" : "ink-md";
  const accent = isDark ? "text-highlight" : "text-accent";
  const subtle = isDark ? "text-paper/70" : "text-ink-soft/85";
  const ruleClass = isDark ? "border-paper/20" : "border-paper-deep";
  const handColor = isDark ? "text-highlight" : "text-warm";

  return (
    <Link href={`/posts/${post.urlSlug}`} className="block h-full">
      <Card
        variant={variant}
        shadow={shadow}
        className="flex h-full min-h-[220px] flex-col gap-2.5 px-7 py-6"
      >
        <div className={`flex justify-between font-mono text-[10px] uppercase tracking-[0.14em] ${accent}`}>
          <span>· essay {String(post.urlSlug.length % 999).padStart(3, "0")} ·</span>
          <span>{post.readMinutes} min</span>
        </div>
        <h3 className="font-display text-2xl leading-tight tracking-tight">
          {post.title}
        </h3>
        <p className={`text-sm leading-relaxed ${subtle}`}>{post.excerpt}</p>
        <div
          className={`mt-auto flex items-baseline justify-between border-t border-dashed ${ruleClass} pt-3`}
        >
          <span className={`text-xs ${isDark ? "text-paper/70" : "text-muted"}`}>
            {post.tags.map((t) => `#${t}`).join(" ")}
          </span>
          <span className={`font-hand text-base ${handColor}`}>{formatDate(post.date)} →</span>
        </div>
      </Card>
    </Link>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
