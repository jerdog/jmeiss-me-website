import type { AnchorHTMLAttributes } from "react";

/**
 * True when `href` is absolute http(s) and its origin differs from `pageOrigin`.
 * Use `pageOrigin` = `new URL(siteConfig.url).origin` on the server, or
 * `window.location.origin` in client-only code.
 */
export function isOffSiteHref(href: string, pageOrigin: string): boolean {
  const t = href.trim();
  if (!t || !/^https?:\/\//i.test(t)) return false;
  try {
    return new URL(t).origin !== new URL(pageOrigin).origin;
  } catch {
    return false;
  }
}

export function offSiteAnchorProps(
  href: string,
  pageOrigin: string,
  options?: { existingRel?: string | null },
): Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel"> {
  if (!isOffSiteHref(href, pageOrigin)) return {};
  const extra = options?.existingRel?.trim();
  const rel = extra ? `noopener noreferrer ${extra}` : "noopener noreferrer";
  return { target: "_blank", rel };
}
