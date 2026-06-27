/**
 * Structured drinking log for /about.
 *
 * Edit `content/data/drinking.yaml`, not this file.
 * The /now “Drinking” item remains the quick snapshot for /now and the feed strip.
 */

import { z } from "zod";
import drinkingYaml from "./data/drinking.yaml";
import { validateYaml } from "@/lib/content";

const CoffeeDrinkSchema = z.object({
  kind: z.literal("coffee"),
  roaster: z.string().min(1),
  origin: z.string().min(1),
  method: z.string().min(1),
  note: z.string().min(1),
  href: z.string().url().optional(),
});

const SpiritDrinkSchema = z.object({
  kind: z.literal("spirit"),
  producer: z.string().min(1),
  name: z.string().min(1),
  style: z.string().min(1),
  note: z.string().min(1),
  serving: z.string().min(1).optional(),
  href: z.string().url().optional(),
});

const DrinkSchema = z.discriminatedUnion("kind", [CoffeeDrinkSchema, SpiritDrinkSchema]);

const DrinkingFileSchema = z.object({
  drinks: z.array(DrinkSchema),
});

export type CoffeeDrink = z.infer<typeof CoffeeDrinkSchema>;
export type SpiritDrink = z.infer<typeof SpiritDrinkSchema>;
export type Drink = z.infer<typeof DrinkSchema>;

export const drinks: Drink[] = validateYaml(
  drinkingYaml,
  DrinkingFileSchema,
  "drinking.yaml",
).drinks;
