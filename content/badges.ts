/**
 * Credly badges for the /about credentials panel.
 *
 * Edit `content/data/badges.yaml`, not this file.
 */

import { z } from "zod";
import badgesYaml from "./data/badges.yaml";
import { validateYaml } from "@/lib/content";

const BadgeSchema = z.object({
  name: z.string().min(1),
  issuer: z.string().min(1),
  image: z.string().url(),
  href: z.string().url(),
});

const BadgesFileSchema = z.object({
  /** Optional link to your full Credly profile. */
  profileUrl: z.preprocess(
    (val) => (val === undefined || val === null || String(val).trim() === "" ? undefined : val),
    z.string().url().optional(),
  ),
  badges: z.array(BadgeSchema),
});

export type Badge = z.infer<typeof BadgeSchema>;
export type BadgesFile = z.infer<typeof BadgesFileSchema>;

const data = validateYaml(badgesYaml, BadgesFileSchema, "badges.yaml");

export const badgeProfileUrl: string | undefined = data.profileUrl;
export const badges: Badge[] = data.badges;
