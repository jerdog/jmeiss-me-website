/**
 * Off-site link detection using the canonical site URL from `site.yaml`.
 * Do not import this module from Client Components — use `@/lib/off-site-href-core`
 * with `window.location.origin` instead (see `SearchModal`).
 */

import { siteOrigin } from "@/content/site";
import {
  isOffSiteHref as isOffSiteHrefCore,
  offSiteAnchorProps as offSiteAnchorPropsCore,
} from "@/lib/off-site-href-core";

export function isOffSiteHref(href: string): boolean {
  return isOffSiteHrefCore(href, siteOrigin);
}

export function offSiteAnchorProps(
  href: string,
  options?: { existingRel?: string | null },
): ReturnType<typeof offSiteAnchorPropsCore> {
  return offSiteAnchorPropsCore(href, siteOrigin, options);
}
