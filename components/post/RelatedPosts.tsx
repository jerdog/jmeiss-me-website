import Link from "next/link";
import { Card } from "@/components/surfaces/Card";
import type { PostSummary } from "@/lib/posts";
import { formatShortDate } from "@/lib/format";

interface RelatedPostsProps {
  posts: PostSummary[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="related-posts">
      <h2 className="related-posts__title">keep reading.</h2>
      <div className="related-posts__grid">
        {posts.map((p) => (
          <Link key={p.urlSlug} href={`/posts/${p.urlSlug}`} className="block h-full">
            <Card variant="card" shadow="ink-sm" className="related-posts__card">
              <p className="related-posts__date">{formatShortDate(p.date)}</p>
              <p className="related-posts__post-title">{p.title}</p>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
