/**
 * Server-rendered JSON-LD structured data.
 *
 * Renders a `<script type="application/ld+json">` containing the schema.org
 * payload for the page. Used on the home, /about, and individual post pages
 * so search engines, social cards, and AI crawlers have a clean, validated
 * description of each piece of content.
 *
 * Why a dedicated component:
 * - keeps the schema next to the page that owns it (vs. one massive layout)
 * - avoids JSON.stringify hydration mismatches (server-only render)
 * - makes the cast to `dangerouslySetInnerHTML` explicit and reviewable
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: required for JSON-LD
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
