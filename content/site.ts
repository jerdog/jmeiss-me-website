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
  handle: z.string().min(1),
  role: z.string().min(1),
  company: z.string().min(1),
  companyUrl: z.string().url(),
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
