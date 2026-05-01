/**
 * Site-level configuration and personal content.
 *
 * Sourced from `content/data/site.yaml` — edit that file, not this one.
 * This module loads + validates the YAML at build time via Zod and
 * exports the typed payload so every call site continues to work
 * unchanged (`import { siteConfig } from "@/content/site"`).
 */

import { z } from "zod";
import { loadYaml } from "@/lib/content";

function trimPersonField(value: unknown): string {
  if (value === undefined || value === null) return "";
  const s = String(value).trim();
  if (s === "-" || s === "—") return "";
  return s;
}

const SocialLinkSchema = z.object({
  label: z.string().min(1),
  handle: z.string().min(1),
  href: z.string().min(1),
  rel: z.string().optional(),
});

const SideProjectSchema = z.object({
  name: z.string().min(1),
  href: z.string().url(),
});

const PersonSchema = z.object({
  name: z.string().min(1),
  handle: z.preprocess(trimPersonField, z.string()),
  role: z.string().min(1),
  company: z.preprocess(trimPersonField, z.string()),
  companyUrl: z.preprocess(trimPersonField, z.string()).superRefine((val, ctx) => {
    if (!val) return;
    if (!z.string().url().safeParse(val).success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "companyUrl must be a valid URL when set",
      });
    }
  }),
  location: z.string().min(1),
  tagline: z.string().min(1),
  blurb: z.string().min(1),
  longBio: z.string().min(1),
  twitter: z.string().optional(),
  email: z.string().email(),
  resumeHref: z.string().min(1),
  avatar: z.string().min(1),
  portrait: z.string().min(1),
  portraitCaption: z.string().min(1),
});

const SiteConfigSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  url: z.string().url(),
  rssPath: z.string().min(1),
  copyright: z.string().min(1),
  person: PersonSchema,
  socials: z.array(SocialLinkSchema).min(1),
  affiliations: z.array(z.string().min(1)),
  sideProjects: z.array(SideProjectSchema),
});

export type SocialLink = z.infer<typeof SocialLinkSchema>;
export type SiteConfig = z.infer<typeof SiteConfigSchema>;

export const siteConfig: SiteConfig = loadYaml("site.yaml", SiteConfigSchema);

/** Origin of `siteConfig.url` — for same-origin vs external link checks. */
export const siteOrigin = new URL(siteConfig.url).origin;
