/**
 * Coffee data for the site.
 *
 * Edit `content/data/coffee.yaml`, not this file.
 * `feed` drives the home feed strip; `coffee` is the full log on /about.
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

const FeedCoffeeSchema = z.object({
  title: z.string().min(1),
  meta: z.string().min(1),
  href: z.string().min(1).default("/about"),
});

const CoffeeFileSchema = z.object({
  feed: FeedCoffeeSchema,
  coffee: z.array(CoffeeSchema),
});

export type Coffee = z.infer<typeof CoffeeSchema>;
export type FeedCoffee = z.infer<typeof FeedCoffeeSchema>;

const data = loadYaml("coffee.yaml", CoffeeFileSchema);

export const feedCoffee: FeedCoffee = data.feed;
export const coffee: Coffee[] = data.coffee;
