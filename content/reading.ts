/**
 * Bookshelf data for the /about page.
 *
 * Edit `content/data/reading.yaml`, not this file.
 */

import { z } from "zod";
import { loadYaml } from "@/lib/content";

const BookStateSchema = z.enum(["Reading", "Re-reading", "Finished", "Up next"]);

const BookSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  state: BookStateSchema,
  href: z.string().url().optional(),
});

const ReadingFileSchema = z.object({
  reading: z.array(BookSchema),
});

export type BookState = z.infer<typeof BookStateSchema>;
export type Book = z.infer<typeof BookSchema>;

export const reading: Book[] = loadYaml("reading.yaml", ReadingFileSchema).reading;
