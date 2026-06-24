import Link from "next/link";
import type { SocialLink } from "@/content/site";
import { Icon } from "@/components/icons/Icon";
import { iconForSocial } from "@/components/icons/social";
import { isOffSiteHref, offSiteAnchorProps } from "@/lib/off-site-href";

interface SocialGridProps {
  socials: SocialLink[];
}

export function SocialGrid({ socials }: SocialGridProps) {
  return (
    <div className="social-grid">
      {socials.map((s, i) => {
        const icon = iconForSocial(s.label);
        const card = (
          <>
            <p className="social-grid__label">
              {icon ? <Icon icon={icon} size="1.1em" className="icon" /> : null}
              <span>{s.label}</span>
            </p>
            <p className="social-grid__handle">{s.handle}</p>
          </>
        );

        return isOffSiteHref(s.href) ? (
          <a
            key={s.label}
            href={s.href}
            className="social-grid__card reduced-motion-flat"
            style={{ transform: `rotate(${(((i % 3) - 1) * 0.6).toFixed(2)}deg)` }}
            {...offSiteAnchorProps(s.href, { existingRel: s.rel })}
          >
            {card}
          </a>
        ) : (
          <Link
            key={s.label}
            href={s.href}
            rel={s.rel ?? "noopener noreferrer"}
            className="social-grid__card reduced-motion-flat"
            style={{ transform: `rotate(${(((i % 3) - 1) * 0.6).toFixed(2)}deg)` }}
          >
            {card}
          </Link>
        );
      })}
    </div>
  );
}
