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
    <section className="py-8">
      <h2 className="mb-3 font-display text-2xl md:text-3xl">keep reading.</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {posts.map((p) => (
          <Link key={p.urlSlug} href={`/posts/${p.urlSlug}`} className="block h-full">
            <Card variant="card" shadow="ink-sm" className="h-full px-5 py-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                {formatShortDate(p.date)}
              </p>
              <p className="mt-2 font-display text-xl leading-tight text-ink">{p.title}</p>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

