import Link from "next/link";
import type { Talk } from "@/content/talks";
import { cn } from "@/lib/cn";

interface TalkRowProps {
  talk: Talk;
}

export function TalkRow({ talk }: TalkRowProps) {
  const [month, year] = talk.date.split(" ");
  const inner = (
    <div
      className={cn(
        "grid grid-cols-[3.5rem_1fr_4.5rem] items-center gap-4 border border-ink px-4 py-4",
        talk.upcoming ? "bg-highlight hard-shadow-ink-sm" : "bg-card",
      )}
    >
      <div className="border border-ink bg-paper py-2 text-center font-display leading-none">
        <p className="text-base text-ink">{month}</p>
        <p className="text-[11px] text-muted">{year}</p>
      </div>
      <div>
        <p className="font-display text-lg leading-tight text-ink">{talk.title}</p>
        <p className="mt-0.5 text-xs text-ink-soft">
          {talk.event}
          {talk.location ? ` · ${talk.location}` : ""}
        </p>
      </div>
      <p
        className={cn(
          "text-right font-mono text-[9px] font-bold uppercase tracking-[0.14em]",
          talk.upcoming ? "text-warm" : "text-accent",
        )}
      >
        {talk.upcoming ? "↑ next" : talk.type}
      </p>
    </div>
  );

  if (talk.href) {
    return (
      <Link href={talk.href} className="block hover:bg-card focus-visible:outline-2">
        {inner}
      </Link>
    );
  }
  return inner;
}
