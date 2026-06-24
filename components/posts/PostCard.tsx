import Link from "next/link";
import { Card } from "@/components/surfaces/Card";
import type { PostSummary } from "@/lib/posts";
import { formatShortDate } from "@/lib/format";

interface PostCardProps {
  post: PostSummary;
  index?: number;
  dark?: boolean;
}

export function PostCard({ post, index = 0, dark }: PostCardProps) {
  const isDark = dark ?? index % 3 === 0;

  return (
    <Link href={`/posts/${post.urlSlug}`} className="block h-full">
      <Card
        variant={isDark ? "ink" : "card"}
        shadow={isDark ? "warm" : "ink-md"}
        className="post-card"
      >
        <div className={isDark ? "post-card__meta--dark" : "post-card__meta--light"}>
          <span>· essay {String(post.essayNumber).padStart(3, "0")} ·</span>
          <span>{post.readMinutes} min</span>
        </div>
        <h2 className="post-card__title">{post.title}</h2>
        <p className={isDark ? "post-card__excerpt--dark" : "post-card__excerpt--light"}>
          {post.excerpt}
        </p>
        <div className={isDark ? "post-card__footer--dark" : "post-card__footer--light"}>
          <span className={isDark ? "post-card__tags--dark" : "post-card__tags--light"}>
            {post.tags.map((t) => `#${t}`).join(" ")}
          </span>
          <span className={isDark ? "post-card__date--dark" : "post-card__date--light"}>
            {formatShortDate(post.date)} →
          </span>
        </div>
      </Card>
    </Link>
  );
}
