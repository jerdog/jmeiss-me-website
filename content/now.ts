/**
 * /now page content.
 *
 * Edit `content/data/now.yaml`, not this file. Build-time Zod validation
 * catches schema drift; the /now item ordering in YAML is preserved in
 * the rendered output. An empty `items` list renders an empty-state UI.
 * An empty `updated` string falls back to this file's last-modified month/year.
 */

import { statSync } from "node:fs";
import path from "node:path";
import { z } from "zod";
import nowYaml from "./data/now.yaml";
import { validateYaml } from "@/lib/content";

const NowItemSchema = z.object({
  label: z.string().min(1),
  text: z.string().min(1),
});

const NowPageSchema = z.object({
  updated: z.string(),
  location: z.string().min(1),
  items: z.array(NowItemSchema),
});

const NOW_YAML = "now.yaml";

function updatedFromFileMtime(filename: string): string {
  const filePath = path.join(process.cwd(), "content", "data", filename);
  const { mtime } = statSync(filePath);
  return mtime.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export type NowItem = z.infer<typeof NowItemSchema>;
export type NowPage = z.infer<typeof NowPageSchema>;

const rawNow = validateYaml(nowYaml, NowPageSchema, NOW_YAML);

export const now: NowPage = {
  ...rawNow,
  updated: rawNow.updated.trim() || updatedFromFileMtime(NOW_YAML),
};

/** Home feed strip coffee card — sourced from the /now “Drinking” item. */
export interface FeedCoffeeCard {
  title: string;
  meta: string;
  href: string;
}

const DRINKING_LABEL = "drinking";

export function feedCoffeeFromNow(page: NowPage): FeedCoffeeCard {
  const drinking = page.items.find((item) => item.label.toLowerCase() === DRINKING_LABEL);
  return {
    title: drinking?.text.trim() || "What's in the cup lately.",
    meta: "the about page",
    href: "/about",
  };
}
