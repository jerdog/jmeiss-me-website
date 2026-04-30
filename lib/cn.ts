import clsx, { type ClassValue } from "clsx";

/** Compose class names with conditionals. Re-exported for terseness. */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
