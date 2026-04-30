import Link from "next/link";
import { Card } from "@/components/surfaces/Card";
import type { PostSummary } from "@/lib/posts";

interface RecentEssaysProps {
  posts: PostSummary[];
}

export function RecentEssays({ posts }: RecentEssaysProps) {
  if (posts.length === 0) return null;

  return (
    <section className="py-8 md:py-10">
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="font-display text-3xl tracking-tight md:text-4xl">recent essays.</h2>
        <Link
          href="/posts"
          className="font-body text-sm text-accent underline underline-offset-4 hover:text-accent-deep"
        >
          see them all →
        </Link>
      </div>
      <Card variant="card" shadow="ink-md" className="overflow-hidden">
        <ul>
          {posts.map((p, i) => (
            <li
              key={p.urlSlug}
              className={i < posts.length - 1 ? "border-b border-dashed border-paper-deep" : ""}
            >
              <Link
                href={`/posts/${p.urlSlug}`}
                className="grid grid-cols-[3rem_1fr] items-center gap-5 px-6 py-4 transition-colors hover:bg-paper-deep/30 sm:grid-cols-[3rem_1fr_12rem]"
              >
                <span className="font-display text-2xl leading-none text-muted">
                  ·{String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block font-display text-lg leading-tight text-ink sm:text-xl">
                    {p.title}
                  </span>
                  <span className="mt-1 block text-xs text-muted">
                    {p.tags.map((t) => `#${t}`).join(" ")}
                  </span>
                </span>
                <span className="hidden text-right font-mono text-[10px] uppercase tracking-[0.12em] text-muted sm:block">
                  {formatDate(p.date)} · {p.readMinutes} min
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
