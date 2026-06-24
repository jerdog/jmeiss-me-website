import Link from "next/link";
import { Card } from "@/components/surfaces/Card";
import type { NowPage } from "@/content/now";
import { cn } from "@/lib/cn";

interface NowPanelProps {
  now: NowPage;
  variant?: "panel" | "wide";
}

export function NowPanel({ now, variant = "panel" }: NowPanelProps) {
  if (variant === "wide") {
    return (
      <div className="now-panel--wide">
        <div className="now-panel__header-wide">
          <p className="now-panel__title-wide">
            /now <span className="now-panel__subtitle-wide">— what i&apos;m actually doing</span>
          </p>
          <p className="now-panel__meta-wide">Updated: {now.updated}</p>
        </div>
        <div className="now-panel__grid">
          {now.items.map((item) => (
            <div key={item.label} className="now-panel__item-wide">
              <p className="now-panel__label-wide">{item.label}</p>
              <p className="now-panel__text-wide">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Card variant="ink" shadow="accent" className="now-panel--card">
      <div className="now-panel__header-card">
        <div>
          <Link href="/now" className="now-panel__title-card">
            /now
          </Link>
          <p className="now-panel__subtitle-card">what i&apos;m up to today-ish</p>
        </div>
        <p className="now-panel__meta-card">
          <span className="block">{now.updated}</span>
          <span className="block">{now.location}</span>
        </p>
      </div>

      {now.items.map((item, i) => (
        <div
          key={item.label}
          className={cn(
            "now-panel__item-card",
            i < now.items.length - 1 && "now-panel__item-card--bordered",
          )}
        >
          <p className="now-panel__label-card">{item.label}</p>
          <p className="now-panel__text-card">{item.text}</p>
        </div>
      ))}
    </Card>
  );
}
