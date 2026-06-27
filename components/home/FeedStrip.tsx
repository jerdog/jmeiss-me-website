import Link from "next/link";
import { NewTabHint } from "@/components/a11y/NewTabHint";
import { InlineMarkdown } from "@/components/content/InlineMarkdown";
import { Card } from "@/components/surfaces/Card";
import type { FeedCoffee } from "@/content/coffee";
import { formatLongDate } from "@/lib/format";
import type { PostSummary } from "@/lib/posts";
import { isOffSiteHref, offSiteAnchorProps } from "@/lib/off-site-href";
import { cn } from "@/lib/cn";

export type FeedTalkTiming = "upcoming" | "recent";

export interface FeedTalk {
  timing: FeedTalkTiming;
  title: string;
  meta: string;
  href: string;
}

interface FeedStripProps {
  posts: PostSummary[];
  feedTalk?: FeedTalk;
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
  talkTiming?: FeedTalkTiming;
  ctaLabel: string;
}

const accentClass: Record<FeedItem["accent"], string> = {
  accent: "feed-card__kind--accent",
  warm: "feed-card__kind--warm",
  highlight: "feed-card__kind--highlight",
  ink: "feed-card__kind--ink",
};

const CTA_LABEL = "Check it out";

function talkFeedItem(talk: FeedTalk): FeedItem {
  return {
    kind: "TALK",
    title: talk.title,
    meta: talk.meta,
    rotate: 1.5,
    variant: "highlight",
    accent: "ink",
    href: talk.href,
    talkTiming: talk.timing,
    ctaLabel: CTA_LABEL,
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
    ctaLabel: CTA_LABEL,
  };
}

export function FeedStrip({ posts, feedTalk, feedCoffee }: FeedStripProps) {
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
            ctaLabel: CTA_LABEL,
          },
        ]
      : []),
    ...(feedTalk ? [talkFeedItem(feedTalk)] : []),
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
            ctaLabel: CTA_LABEL,
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
  const card = (
    <Card variant={item.variant} shadow="ink-sm" className="feed-card">
      <div className="feed-card__header">
        <p className={cn("eyebrow-xs", accentClass[item.accent])}>· {item.kind} ·</p>
        {item.talkTiming ? (
          <span
            className={cn(
              "feed-card__pill",
              item.talkTiming === "upcoming"
                ? "feed-card__pill--upcoming"
                : "feed-card__pill--recent",
            )}
          >
            {item.talkTiming === "upcoming" ? "Upcoming" : "Recent"}
          </span>
        ) : null}
      </div>
      <div className="feed-card__body">
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
      </div>
      {item.href ? (
        <div className="feed-card__footer">
          <span className="feed-card__cta" aria-hidden="true">
            {item.ctaLabel} →
          </span>
        </div>
      ) : null}
    </Card>
  );

  if (!item.href) {
    return (
      <div
        className="feed-card-link"
        style={{ "--feed-rotate": `${item.rotate}deg` } as React.CSSProperties}
      >
        {card}
      </div>
    );
  }

  const linkProps = {
    className: cn("feed-card-link", `feed-card-link--${item.variant}`),
    style: { "--feed-rotate": `${item.rotate}deg` } as React.CSSProperties,
  };

  if (isOffSiteHref(item.href)) {
    return (
      <a href={item.href} {...linkProps} {...offSiteAnchorProps(item.href)}>
        {card}
        <NewTabHint />
      </a>
    );
  }

  return (
    <Link href={item.href} {...linkProps}>
      {card}
    </Link>
  );
}
