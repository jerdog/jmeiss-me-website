import type { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faBluesky } from "@fortawesome/free-brands-svg-icons/faBluesky";
import { faDev } from "@fortawesome/free-brands-svg-icons/faDev";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons/faLinkedinIn";
import { faMastodon } from "@fortawesome/free-brands-svg-icons/faMastodon";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons/faXTwitter";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { faRss } from "@fortawesome/free-solid-svg-icons/faRss";

/**
 * Maps a social-link label (matching `content/site.ts → socials[].label`)
 * to its FontAwesome `IconDefinition`. Per-icon imports keep the bundle
 * tree-shaken to only the icons actually referenced from `siteConfig`.
 */
export const socialIcons: Record<string, IconDefinition> = {
  Bluesky: faBluesky,
  DEV: faDev,
  GitHub: faGithub,
  LinkedIn: faLinkedinIn,
  Mastodon: faMastodon,
  X: faXTwitter,
  Twitter: faXTwitter,
  Email: faEnvelope,
  RSS: faRss,
};

export function iconForSocial(label: string): IconDefinition | undefined {
  return socialIcons[label];
}
