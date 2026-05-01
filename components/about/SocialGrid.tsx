import Link from "next/link";
import { cn } from "@/lib/cn";
import type { SocialLink } from "@/content/site";
import { Icon } from "@/components/icons/Icon";
import { iconForSocial } from "@/components/icons/social";
import { isOffSiteHref, offSiteAnchorProps } from "@/lib/off-site-href";

interface SocialGridProps {
  socials: SocialLink[];
}

export function SocialGrid({ socials }: SocialGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {socials.map((s, i) => {
        const icon = iconForSocial(s.label);
        return isOffSiteHref(s.href) ? (
          <a
            key={s.label}
            href={s.href}
            className={cn(
              "reduced-motion-flat hard-shadow-ink-sm block border border-ink bg-card px-5 py-4 text-ink no-underline transition-colors hover:bg-highlight",
            )}
            style={{ transform: `rotate(${(((i % 3) - 1) * 0.6).toFixed(2)}deg)` }}
            {...offSiteAnchorProps(s.href, { existingRel: s.rel })}
          >
            <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
              {icon ? <Icon icon={icon} size="1.1em" className="shrink-0" /> : null}
              <span>{s.label}</span>
            </p>
            <p className="mt-1 font-display text-base leading-tight">{s.handle}</p>
          </a>
        ) : (
          <Link
            key={s.label}
            href={s.href}
            rel={s.rel ?? "noopener noreferrer"}
            className={cn(
              "reduced-motion-flat hard-shadow-ink-sm block border border-ink bg-card px-5 py-4 text-ink no-underline transition-colors hover:bg-highlight",
            )}
            style={{ transform: `rotate(${(((i % 3) - 1) * 0.6).toFixed(2)}deg)` }}
          >
            <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
              {icon ? <Icon icon={icon} size="1.1em" className="shrink-0" /> : null}
              <span>{s.label}</span>
            </p>
            <p className="mt-1 font-display text-base leading-tight">{s.handle}</p>
          </Link>
        );
      })}
    </div>
  );
}
