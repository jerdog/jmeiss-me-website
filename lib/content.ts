import { readFileSync } from "node:fs";
import path from "node:path";
import { parse as parseYaml } from "yaml";
import type { z } from "zod";

/**
 * Validate parsed YAML against a Zod schema.
 *
 * Used by `content/*.ts` modules that import `.yaml` files directly so
 * Turbopack tracks edits and triggers Fast Refresh in dev.
 */
export function validateYaml<T extends z.ZodTypeAny>(
  parsed: unknown,
  schema: T,
  filename: string,
): z.infer<T> {
  const result = schema.safeParse(parsed);
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `${i.path.join(".") || "<root>"}: ${i.message}`)
      .join("\n  ");
    throw new Error(`Content YAML failed validation (${filename}):\n  ${issues}`);
  }
  return result.data;
}

/**
 * Read a YAML file from `content/data/` and validate it with Zod.
 *
 * YAML is the editable source of truth for every non-post piece of site
 * content (site config, /now, talks, reading, coffee, services). The TS
 * modules in `content/*.ts` import the YAML files directly so the bundler
 * watches them in dev; this helper remains for scripts and one-off tools.
 *
 * Parameters:
 * - `filename`: a bare filename within `content/data/`, e.g. "site.yaml"
 * - `schema`: a Zod schema describing the expected shape
 *
 * Returns the parsed + validated payload as `z.infer<typeof schema>`.
 * Throws a descriptive Error if the file is missing, the YAML is
 * unparseable, or the shape fails validation.
 */
export function loadYaml<T extends z.ZodTypeAny>(
  filename: string,
  schema: T,
): z.infer<T> {
  const filePath = path.join(process.cwd(), "content", "data", filename);
  let raw: string;
  try {
    raw = readFileSync(filePath, "utf8");
  } catch (err) {
    throw new Error(
      `Failed to read content YAML at ${filePath}: ${err instanceof Error ? err.message : String(err)}`,
    );
  }

  let parsed: unknown;
  try {
    parsed = parseYaml(raw);
  } catch (err) {
    throw new Error(
      `Failed to parse YAML (${filename}): ${err instanceof Error ? err.message : String(err)}`,
    );
  }

  return validateYaml(parsed, schema, filename);
}
