import Link from "next/link";
import { Card } from "@/components/surfaces/Card";
import type { PostSummary } from "@/lib/posts";

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
  accent: "text-accent",
  warm: "text-warm",
  highlight: "text-highlight",
  ink: "text-ink",
};

/**
 * The 4-card mixed activity feed on the home page. Pulls the latest 2 posts
 * by default and pads with placeholder talk/coffee cards until live data exists.
 */
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
            meta: formatDate(newest[0].date),
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
            meta: formatDate(newest[1].date),
            rotate: 0.8,
            variant: "card" as const,
            accent: "accent" as const,
            href: `/posts/${newest[1].urlSlug}`,
          },
        ]
      : []),
  ];

  return (
    <section className="py-8 md:py-10">
      <div className="mb-5 flex items-baseline justify-between">
        <h2 className="font-display text-3xl tracking-tight md:text-4xl">the feed.</h2>
        <span className="hidden font-hand text-xl text-muted sm:block">
          — posts, talks, coffee, repeat.
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((c, i) => (
          <FeedCard key={`${c.kind}-${i}`} item={c} />
        ))}
      </div>
    </section>
  );
}

function FeedCard({ item }: { item: FeedItem }) {
  const inner = (
    <Card
      variant={item.variant}
      shadow="ink-sm"
      rotation={item.rotate}
      className="flex min-h-[140px] flex-col justify-between px-4 pt-4 pb-4"
    >
      <p
        className={`font-mono text-[9px] font-bold uppercase tracking-[0.18em] ${accentClass[item.accent]}`}
      >
        · {item.kind} ·
      </p>
      <p className="mt-2 font-display text-lg leading-[1.15] text-ink">{item.title}</p>
      <p className="mt-2 font-hand text-base text-muted">{item.meta}</p>
    </Card>
  );

  if (item.href) {
    return (
      <Link href={item.href} className="block">
        {inner}
      </Link>
    );
  }

  return inner;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
