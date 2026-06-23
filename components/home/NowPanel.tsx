import Link from "next/link";
import { Card } from "@/components/surfaces/Card";
import type { NowPage } from "@/content/now";

interface NowPanelProps {
  now: NowPage;
  variant?: "panel" | "wide";
}

/**
 * /now summary panel. The "panel" variant is the side-card on the home page;
 * "wide" is the full-bleed dark band on /about and /now.
 */
export function NowPanel({ now, variant = "panel" }: NowPanelProps) {
  if (variant === "wide") {
    return (
      <div className="bg-ink px-8 py-7 text-paper">
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <p className="font-display text-3xl text-highlight md:text-4xl">
            /now{" "}
            <span className="ml-2 font-hand text-xl text-accent-soft">
              — what i&apos;m actually doing
            </span>
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent-soft">
            Updated: {now.updated}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-5">
          {now.items.map((item) => (
            <div key={item.label} className="border-t border-dashed border-muted pt-3">
              <p className="mb-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-accent-soft">
                {item.label}
              </p>
              <p className="text-sm leading-relaxed text-paper/90">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Card variant="ink" shadow="accent" className="px-8 pt-7 pb-7">
      <div className="mb-4 flex items-start justify-between gap-3 border-b border-dashed border-muted pb-3">
        <div>
          <Link href="/now" className="font-display text-3xl leading-none text-highlight">
            /now
          </Link>
          <p className="mt-0.5 font-hand text-lg text-accent-soft">
            what i&apos;m up to today-ish
          </p>
        </div>
        <p className="text-right font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-accent-soft">
          <span className="block">{now.updated}</span>
          <span className="block">{now.location}</span>
        </p>
      </div>

      {now.items.map((item, i) => (
        <div
          key={item.label}
          className={`py-2.5 ${
            i < now.items.length - 1 ? "border-b border-dashed border-ink-soft" : ""
          }`}
        >
          <p className="mb-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-accent-soft">
            {item.label}
          </p>
          <p className="text-sm leading-snug text-paper/90">{item.text}</p>
        </div>
      ))}
    </Card>
  );
}
