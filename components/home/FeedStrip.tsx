import Link from "next/link";
import { Card } from "@/components/surfaces/Card";
import type { PostSummary } from "@/lib/posts";
import { formatLongDate } from "@/lib/format";
import { cn } from "@/lib/cn";

interface FeedStripProps {
  posts: PostSummary[];
}

interface FeedItem {
  kind: "POST" | "TALK" | "COFFEE";
  title: string;
  meta: string;
  rotate: number;
  variant: "card" | "highlight" | "ink";
  accent: "accent" | "warm" | "highlight" | "ink";
  href?: string;
}

const accentClass: Record<FeedItem["accent"], string> = {
  accent: "feed-card__kind--accent",
  warm: "feed-card__kind--warm",
  highlight: "feed-card__kind--highlight",
  ink: "feed-card__kind--ink",
};

export function FeedStrip({ posts }: FeedStripProps) {
  const newest = posts.slice(0, 2);
  const placeholderTalk: FeedItem = {
    kind: "TALK",
    title: "Talks list — coming soon",
    meta: "the speaking page",
    rotate: 1.5,
    variant: "highlight",
    accent: "ink",
    href: "/speaking",
  };
  const placeholderCoffee: FeedItem = {
    kind: "COFFEE",
    title: "Coffee log — in progress",
    meta: "the about page",
    rotate: -0.5,
    variant: "card",
    accent: "warm",
    href: "/about",
  };

  const items: FeedItem[] = [
    ...(newest[0]
      ? [
          {
            kind: "POST" as const,
            title: newest[0].title,
            meta: formatLongDate(newest[0].date),
            rotate: -1,
            variant: "card" as const,
            accent: "accent" as const,
            href: `/posts/${newest[0].urlSlug}`,
          },
        ]
      : []),
    placeholderTalk,
    placeholderCoffee,
    ...(newest[1]
      ? [
          {
            kind: "POST" as const,
            title: newest[1].title,
            meta: formatLongDate(newest[1].date),
            rotate: 0.8,
            variant: "card" as const,
            accent: "accent" as const,
            href: `/posts/${newest[1].urlSlug}`,
          },
        ]
      : []),
  ];

  return (
    <section className="feed-strip">
      <div className="section-heading-row">
        <h2 className="section-heading">the feed.</h2>
        <span className="feed-strip__note">— posts, talks, coffee, repeat.</span>
      </div>
      <div className="feed-strip__grid">
        {items.map((c, i) => (
          <FeedCard key={`${c.kind}-${i}`} item={c} />
        ))}
      </div>
    </section>
  );
}

function FeedCard({ item }: { item: FeedItem }) {
  const inner = (
    <Card variant={item.variant} shadow="ink-sm" rotation={item.rotate} className="feed-card">
      <p className={cn("eyebrow-xs", accentClass[item.accent])}>· {item.kind} ·</p>
      <p className="feed-card__title">{item.title}</p>
      <p
        className={
          item.variant === "highlight" ? "feed-card__meta--on-highlight" : "feed-card__meta"
        }
      >
        {item.meta}
      </p>
    </Card>
  );

  if (item.href) {
    return <Link href={item.href}>{inner}</Link>;
  }

  return inner;
}
