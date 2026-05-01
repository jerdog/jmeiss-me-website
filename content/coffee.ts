/**
 * Coffee log data for the /about page.
 *
 * Edit `content/data/coffee.yaml`, not this file.
 */

import { z } from "zod";
import { loadYaml } from "@/lib/content";

const CoffeeSchema = z.object({
  roaster: z.string().min(1),
  origin: z.string().min(1),
  method: z.string().min(1),
  note: z.string().min(1),
  href: z.string().url().optional(),
});

const CoffeeFileSchema = z.object({
  coffee: z.array(CoffeeSchema),
});

export type Coffee = z.infer<typeof CoffeeSchema>;

export const coffee: Coffee[] = loadYaml("coffee.yaml", CoffeeFileSchema).coffee;
