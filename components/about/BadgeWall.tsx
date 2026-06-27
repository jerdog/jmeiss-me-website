import Image from "next/image";
import { NewTabHint } from "@/components/a11y/NewTabHint";
import type { Badge } from "@/content/badges";
import { offSiteAnchorProps } from "@/lib/off-site-href";

interface BadgeWallProps {
  badges: Badge[];
  profileUrl?: string;
}

export function BadgeWall({ badges, profileUrl }: BadgeWallProps) {
  if (badges.length === 0) return null;

  return (
    <div className="panel-box badge-wall">
      <div className="panel-heading badge-wall__header">
        <div>
          <h2 className="panel-title">credentials.</h2>
          <span className="hand-note">— verified on Credly</span>
        </div>
        {profileUrl ? (
          <a
            href={profileUrl}
            className="btn-text badge-wall__profile-link"
            {...offSiteAnchorProps(profileUrl)}
          >
            see all on Credly →
            <NewTabHint />
          </a>
        ) : null}
      </div>

      <ul className="badge-wall__grid">
        {badges.map((badge) => (
          <li key={badge.href}>
            <a
              href={badge.href}
              className="badge-wall__item reduced-motion-flat"
              {...offSiteAnchorProps(badge.href)}
            >
              <span className="badge-wall__image-wrap">
                <Image
                  src={badge.image}
                  alt={`${badge.name} badge`}
                  width={120}
                  height={120}
                  className="badge-wall__image"
                />
              </span>
              <span className="badge-wall__name">{badge.name}</span>
              <span className="badge-wall__issuer">{badge.issuer}</span>
              <NewTabHint />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
