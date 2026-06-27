"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { NewTabHint } from "@/components/a11y/NewTabHint";
import type { Badge } from "@/content/badges";
import { cn } from "@/lib/cn";
import { offSiteAnchorProps } from "@/lib/off-site-href-core";

const INITIAL_VISIBLE = 4;

interface BadgeWallProps {
  badges: Badge[];
  profileUrl?: string;
  pageOrigin: string;
}

function BadgeGrid({ badges, pageOrigin }: { badges: Badge[]; pageOrigin: string }) {
  return (
    <ul className="badge-wall__grid">
      {badges.map((badge) => (
        <li key={badge.href}>
          <a
            href={badge.href}
            className="badge-wall__item reduced-motion-flat"
            {...offSiteAnchorProps(badge.href, pageOrigin)}
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
  );
}

export function BadgeWall({ badges, profileUrl, pageOrigin }: BadgeWallProps) {
  const [expanded, setExpanded] = useState(false);
  const morePanelId = useId();

  if (badges.length === 0) return null;

  const visibleBadges = badges.slice(0, INITIAL_VISIBLE);
  const hiddenBadges = badges.slice(INITIAL_VISIBLE);
  const hasMore = hiddenBadges.length > 0;

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
            {...offSiteAnchorProps(profileUrl, pageOrigin)}
          >
            see all on Credly →
            <NewTabHint />
          </a>
        ) : null}
      </div>

      <BadgeGrid badges={visibleBadges} pageOrigin={pageOrigin} />

      {hasMore ? (
        <>
          <div
            id={morePanelId}
            className={cn("badge-wall__more", expanded && "badge-wall__more--open")}
            aria-hidden={!expanded}
            inert={expanded ? undefined : true}
          >
            <div className="badge-wall__more-inner">
              <BadgeGrid badges={hiddenBadges} pageOrigin={pageOrigin} />
            </div>
          </div>

          <div className="badge-wall__expand-wrap">
            <button
              type="button"
              className="badge-wall__expand-btn btn-secondary"
              aria-expanded={expanded}
              aria-controls={morePanelId}
              onClick={() => setExpanded((open) => !open)}
            >
              {expanded
                ? "show fewer credentials"
                : `show ${hiddenBadges.length} more credentials`}
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}
