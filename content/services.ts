/**
 * "What I actually do" services strip on the home page.
 *
 * Edit `content/data/services.yaml`, not this file.
 */

import { z } from "zod";
import { loadYaml } from "@/lib/content";

const ServiceSchema = z.object({
  number: z.string().min(1),
  title: z.string().min(1),
  body: z.string().min(1),
  href: z.string().optional(),
});

const ServicesFileSchema = z.object({
  services: z.array(ServiceSchema).min(1),
});

export type Service = z.infer<typeof ServiceSchema>;

export const services: Service[] = loadYaml("services.yaml", ServicesFileSchema).services;
