import Link from "next/link";
import { NewTabHint } from "@/components/a11y/NewTabHint";
import { InlineMarkdown } from "@/components/content/InlineMarkdown";
import { Card } from "@/components/surfaces/Card";
import type { FeedCoffee } from "@/content/coffee";
import type { Talk } from "@/content/talks";
import { formatLongDate } from "@/lib/format";
import type { PostSummary } from "@/lib/posts";
import { isOffSiteHref, offSiteAnchorProps } from "@/lib/off-site-href";
import { cn } from "@/lib/cn";

interface FeedStripProps {
  posts: PostSummary[];
  upcomingTalk?: Talk;
  feedCoffee: FeedCoffee;
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

function talkFeedItem(talk: Talk): FeedItem {
  const metaParts = [talk.date, talk.event].filter(Boolean);
  return {
    kind: "TALK",
    title: talk.title,
    meta: metaParts.join(" · "),
    rotate: 1.5,
    variant: "highlight",
    accent: "ink",
    href: talk.href ?? "/speaking",
  };
}

function coffeeFeedItem(feed: FeedCoffee): FeedItem {
  return {
    kind: "COFFEE",
    title: feed.title,
    meta: feed.meta,
    rotate: -0.5,
    variant: "card",
    accent: "warm",
    href: feed.href,
  };
}

export function FeedStrip({ posts, upcomingTalk, feedCoffee }: FeedStripProps) {
  const newest = posts.slice(0, 2);

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
    ...(upcomingTalk ? [talkFeedItem(upcomingTalk)] : []),
    coffeeFeedItem(feedCoffee),
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
        {items.map((c) => (
          <FeedCard key={`${c.kind}-${c.title}-${c.href ?? ""}`} item={c} />
        ))}
      </div>
    </section>
  );
}

function FeedCard({ item }: { item: FeedItem }) {
  const inner = (
    <Card variant={item.variant} shadow="ink-sm" rotation={item.rotate} className="feed-card">
      <p className={cn("eyebrow-xs", accentClass[item.accent])}>· {item.kind} ·</p>
      <p className="feed-card__title">
        <InlineMarkdown>{item.title}</InlineMarkdown>
      </p>
      <p
        className={
          item.variant === "highlight" ? "feed-card__meta--on-highlight" : "feed-card__meta"
        }
      >
        <InlineMarkdown>{item.meta}</InlineMarkdown>
      </p>
    </Card>
  );

  if (!item.href) return inner;

  if (isOffSiteHref(item.href)) {
    return (
      <a href={item.href} className="block" {...offSiteAnchorProps(item.href)}>
        {inner}
        <NewTabHint />
      </a>
    );
  }

  return <Link href={item.href}>{inner}</Link>;
}
