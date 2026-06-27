import Link from "next/link";
import { Card } from "@/components/surfaces/Card";
import type { PostSummary } from "@/lib/posts";
import { formatShortDate } from "@/lib/format";
import { cn } from "@/lib/cn";

interface RecentEssaysProps {
  posts: PostSummary[];
}

export function RecentEssays({ posts }: RecentEssaysProps) {
  if (posts.length === 0) return null;

  return (
    <section className="recent-essays">
      <div className="section-heading-row-compact">
        <h2 className="section-heading">recent essays.</h2>
        <Link href="/posts" className="btn-text">
          see them all →
        </Link>
      </div>
      <Card variant="card" shadow="ink-md" className="recent-essays__list">
        <ul>
          {posts.map((p, i) => (
            <li
              key={p.urlSlug}
              className={cn(i < posts.length - 1 && "recent-essays__item")}
            >
              <Link href={`/posts/${p.urlSlug}`} className="recent-essays__link">
                <span className="recent-essays__index">
                  ·{String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="recent-essays__title">{p.title}</span>
                  <span className="recent-essays__tags">
                    {p.tags.map((t) => `#${t}`).join(" ")}
                  </span>
                </span>
                <span className="recent-essays__date">
                  {formatShortDate(p.date)} · {p.readMinutes} min
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  );
}
