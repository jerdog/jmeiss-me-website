/**
 * Talks list for the /speaking page. Edit and commit to deploy.
 *
 * Date format is human-readable (e.g. "May 2026"). Mark `upcoming: true` for
 * future engagements — the UI gives those a highlight treatment.
 */

export interface Talk {
  /** Human date e.g. "May 2026" or "Mar 12, 2026". */
  date: string;
  title: string;
  event: string;
  /** City / venue, optional. */
  location?: string;
  /** Talk format. */
  type: "Keynote" | "Talk" | "Panel" | "Workshop" | "Podcast" | "Webinar";
  /** Whether this is a future engagement. */
  upcoming?: boolean;
  /** Optional link (event page or recording). */
  href?: string;
  /** Optional video / recording link if separate from `href`. */
  recording?: string;
  /** Optional slides link. */
  slides?: string;
}

/**
 * Empty until Jeremy populates. The /speaking page renders an empty-state
 * with a "book me" callout when this is empty.
 */
export const talks: Talk[] = [];

/**
 * Topics Jeremy is happy to speak on. Wired into TopicChips on /speaking.
 */
export const topics: string[] = [
  "Building DevRel from scratch",
  "Measuring DevRel without OKR pain",
  "Developer Experience as a strategy",
  "Community, but not the cringe kind",
  "Mentorship & rebuilding civilisation",
  "ADHD in the technologist's life",
  "AI in CONTRIBUTING.md",
  "CI/CD interoperability",
];
