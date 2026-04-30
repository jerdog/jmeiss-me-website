import Image from "next/image";
import { Card } from "@/components/surfaces/Card";
import { Tape } from "@/components/surfaces/Tape";
import type { PostSummary } from "@/lib/posts";
import { siteConfig } from "@/content/site";
import { formatLongDate } from "@/lib/format";

interface PostHeaderProps {
  post: PostSummary;
  /** Display number for the tape sticker (e.g. "47" -> "essay № 47"). */
  number?: number;
}

export function PostHeader({ post, number }: PostHeaderProps) {
  const { person } = siteConfig;
  const date = formatLongDate(post.date);

  return (
    <Card variant="card" shadow="ink" className="px-7 py-9 sm:px-12 sm:py-9">
      {number !== undefined ? (
        <Tape
          rotation={-3}
          color="warm"
          textColor="paper"
          className="absolute -top-3.5 left-8"
        >
          essay № {number}
        </Tape>
      ) : null}

      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
        {post.tags.map((t) => `#${t}`).join("  ")}
        {post.tags.length > 0 ? " · " : ""}
        {date} · {post.readMinutes} min
      </p>

      <h1 className="mb-5 font-display text-4xl leading-[0.95] tracking-tight md:text-5xl lg:text-6xl xl:text-7xl">
        {post.title}
      </h1>

      <p className="m-0 max-w-3xl text-lg leading-relaxed text-ink-soft md:text-xl">
        {post.excerpt}
      </p>

      <div className="mt-6 flex items-center gap-3 border-t border-dashed border-paper-deep pt-5">
        <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-accent-soft text-ink">
          <Image
            src={person.avatar}
            alt=""
            width={44}
            height={44}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold">{person.name}</p>
          <p className="text-xs text-muted">
            {person.role} · {person.company}
          </p>
        </div>
        <span
          className="reduced-motion-flat ml-auto hidden font-hand text-xl text-warm sm:inline-block"
          style={{ transform: "rotate(-2deg)" }}
        >
          real take inside ↓
        </span>
      </div>
    </Card>
  );
}
