/**
 * Talks list and topic chips for the /speaking page.
 *
 * Edit `content/data/talks.yaml`, not this file. Schema reference:
 *
 *   talks:
 *     - date: "May 2026"        # human-readable date
 *       title: "…"
 *       event: "DevOpsDays KC"
 *       location: "Kansas City, MO"   # optional
 *       type: "Keynote"               # Keynote|Talk|Panel|Workshop|Podcast|Webinar
 *       upcoming: true                # optional; highlights the card
 *       href: "https://…"             # optional event page
 *       recording: "https://…"        # optional video link
 *       slides: "https://…"           # optional
 *   topics:
 *     - "Building DevRel from scratch"
 */

import { z } from "zod";
import { loadYaml } from "@/lib/content";

const TalkTypeSchema = z.enum([
  "Keynote",
  "Talk",
  "Panel",
  "Workshop",
  "Podcast",
  "Webinar",
]);

const TalkSchema = z.object({
  date: z.string().min(1),
  title: z.string().min(1),
  event: z.string().min(1),
  location: z.string().optional(),
  type: TalkTypeSchema,
  upcoming: z.boolean().optional(),
  href: z.string().url().optional(),
  recording: z.string().url().optional(),
  slides: z.string().url().optional(),
});

const TalksFileSchema = z.object({
  talks: z.array(TalkSchema),
  topics: z.array(z.string().min(1)),
});

export type Talk = z.infer<typeof TalkSchema>;

const data = loadYaml("talks.yaml", TalksFileSchema);
export const talks: Talk[] = data.talks;
export const topics: string[] = data.topics;
