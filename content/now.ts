/**
 * /now page items.
 *
 * Author/edit by hand; commit to git to deploy. The /now item ordering is
 * preserved in the rendered output. To "clear" an item, delete it from the
 * array — empty arrays render an empty-state UI.
 */

export interface NowItem {
  /** Mono uppercase label, e.g. "WORKING ON". */
  label: string;
  /** Sentence-case body text. Plain text is fine; minimal MDX is not currently supported here. */
  text: string;
}

export interface NowPage {
  /** Last update timestamp in human-readable form. */
  updated: string;
  /** City + (optional) state. */
  location: string;
  items: NowItem[];
}

export const now: NowPage = {
  updated: "TBD — Jeremy to set",
  location: "Kansas City, MO",
  items: [
    {
      label: "Working on",
      text: "Migrating jmeiss.me from Hugo to Next.js. Notes-first, not yet shipped.",
    },
    {
      label: "Reading",
      text: "Currently working through a backlog. Updates incoming once /now is wired.",
    },
    {
      label: "Drinking",
      text: "Daily-driver pour-overs from local Kansas City roasters.",
    },
  ],
};
