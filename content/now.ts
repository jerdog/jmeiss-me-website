/**
 * /now page content.
 *
 * Edit `content/data/now.yaml`, not this file. Build-time Zod validation
 * catches schema drift; the /now item ordering in YAML is preserved in
 * the rendered output. An empty `items` list renders an empty-state UI.
 */

import { z } from "zod";
import { loadYaml } from "@/lib/content";

const NowItemSchema = z.object({
  label: z.string().min(1),
  text: z.string().min(1),
});

const NowPageSchema = z.object({
  updated: z.string().min(1),
  location: z.string().min(1),
  items: z.array(NowItemSchema),
});

export type NowItem = z.infer<typeof NowItemSchema>;
export type NowPage = z.infer<typeof NowPageSchema>;

export const now: NowPage = loadYaml("now.yaml", NowPageSchema);
