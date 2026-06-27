# jmeiss.me — Hugo → Next.js Implementation Plan

A staged, low-risk migration from the current Hugo static site to Next.js, preserving every existing post, URL, and feed while shipping the new azure/white/black design (Direction B v2).

---

## 0. Goals & non-goals

**Goals**
- Move from Hugo → Next.js (App Router) without losing a single post or breaking a single inbound link.
- Ship the approved design (azure/white/black, WCAG AA).
- Keep authoring as Markdown/MDX — Jeremy keeps writing in his editor of choice, commits to git, deploy is automatic.
- Maintain RSS, sitemap, and canonical URLs.
- Lighthouse 95+ across the board; perfect a11y score.

**Non-goals (for v1)**
- No CMS. Posts stay as files in the repo.
- No comments system. Mastodon/Bluesky reply links only.
- No newsletter integration in v1 (can be added later).
- No i18n.

---

## 1. Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15 (App Router)** | RSC, file-based routing, mature MDX story |
| Language | **TypeScript** | Type-safe content models |
| Content | **MDX** via `@next/mdx` + `gray-matter` + `remark`/`rehype` | Posts already exist as Markdown; MDX adds component embeds (pull quotes, callouts, the tape labels) |
| Styling | **Tailwind v4** + CSS variables for the design tokens | Tokens map 1:1 to the palette |
| Type | `next/font/google` — DM Serif Display, Inter, JetBrains Mono, Caveat | Self-hosted, zero CLS |
| Search | **Pagefind** (build-time index) | No runtime cost, no service |
| Feeds | `feed` package, generated at build | RSS / Atom / JSON Feed |
| Analytics | **Plausible** (or none) | Privacy-respecting, no banner |
| Hosting | **Vercel** (or Cloudflare Pages) | Static export friendly; `output: 'export'` is on the table |
| CI | GitHub Actions: lint, typecheck, build, Pagefind, Lighthouse-CI |  |

---

## 2. Information architecture

Routes match the prototype 1:1 plus the legacy URLs from the Hugo site:

```
/                          → Home (hero + /now panel + recent feed)
/writing                   → Posts index, filterable by tag
/writing/[slug]            → Post (magazine layout)
/speaking                  → Talks list + topics + "book me"
/about                     → Bio + bookshelf + coffee log + socials
/now                       → Standalone /now page
/tags/[tag]                → Tag archive
/feed.xml, /atom.xml, /feed.json, /sitemap.xml, /robots.txt
```

**Redirects from Hugo** — preserve every existing URL via `next.config.js` `redirects()`:
- `/posts/:slug` → `/writing/:slug`
- `/post/:slug` → `/writing/:slug`
- `/categories/:tag` → `/tags/:tag`
- `/index.xml` → `/feed.xml`

---

## 3. Content model

```ts
// types/post.ts
export interface PostFrontmatter {
  title: string;
  date: string;            // ISO
  updated?: string;
  tags: string[];
  excerpt: string;
  draft?: boolean;
  canonical?: string;      // for cross-posts
  cover?: string;
}
```

Posts live at `content/posts/YYYY-MM-DD-slug.mdx`. A `lib/posts.ts` module reads the directory at build time, validates frontmatter with Zod, and exposes:

```ts
getAllPosts() / getPostBySlug() / getPostsByTag() / getAllTags()
```

The `/now` page is a single MDX file at `content/now.mdx` with structured frontmatter for the items.

The bookshelf and coffee log are TS data files (`content/reading.ts`, `content/coffee.ts`) — small enough to not need MDX, easy to update.

---

## 4. Design system → code

The palette and type from the v2 prototype become CSS variables in `app/globals.css`:

```css
:root {
  --paper: #ffffff;
  --paper-deep: #eaf1f8;
  --card: #f5f9fd;
  --ink: #0b0d10;
  --ink-soft: #2a3340;
  --muted: #5a6878;
  --rule: #cbd6e2;
  --accent: #0a5fbf;
  --accent-deep: #08458a;
  --accent-soft: #7fb6f1;
  --warm: #b1361b;
  --highlight: #cfe4fb;

  --font-display: var(--font-dm-serif-display);
  --font-body: var(--font-inter);
  --font-hand: var(--font-caveat);
  --font-mono: var(--font-jetbrains-mono);
}
```

Components mirror the prototype:

```
components/
  layout/Nav.tsx, Footer.tsx, Container.tsx
  surfaces/Card.tsx, Tape.tsx, Tag.tsx
  post/PostHeader.tsx, PullQuote.tsx, OrderedList.tsx, RelatedPosts.tsx
  home/NowPanel.tsx, FeedStrip.tsx, RecentEssays.tsx, ServicesStrip.tsx
  speaking/TalkRow.tsx, TopicChips.tsx
  about/Bookshelf.tsx, CoffeeLog.tsx, SocialGrid.tsx
```

MDX components are registered in `mdx-components.tsx` so authors can write `<PullQuote>` and `<Tape>` directly in posts.

---

## 5. Migration steps

| # | Step | Owner | Notes |
|---|---|---|---|
| 1 | Audit Hugo content. Script (`scripts/audit-hugo.ts`) walks `content/` and dumps a CSV of every post with slug, date, frontmatter keys, broken-link candidates. | Eng | One-time. Confirms count and surfaces edge cases. |
| 2 | Stand up empty Next.js repo with the design system (tokens, fonts, base layout, Nav, Footer). Visual smoke test against the prototype. | Eng | 1 day. |
| 3 | Build the 5 page templates against fixture data (the same `JM_DATA` used in the prototype). | Eng | 2–3 days. |
| 4 | Write `lib/posts.ts` + Zod schema. Wire MDX rendering with the rehype/remark pipeline (slug, autolink headings, code highlighting via Shiki). | Eng | 1 day. |
| 5 | **Content migration**: rsync Hugo `content/` into the new `content/` tree. Run a normalizer that rewrites Hugo shortcodes (`{{< youtube >}}`, etc.) into MDX components. | Eng | 1 day. |
| 6 | Wire the redirects table. Cross-check against a list of the top inbound URLs (pull from CrUX or server logs). | Eng | 0.5 day. |
| 7 | Generate feeds, sitemap, robots. Verify `feedvalidator.org` passes. | Eng | 0.5 day. |
| 8 | Add Pagefind to the build, add a `<SearchDialog>` component to Nav. | Eng | 0.5 day. |
| 9 | Accessibility pass: axe-core in CI, manual keyboard sweep, focus-visible styling, prefers-reduced-motion for the rotated cards. | Eng + Jeremy | 0.5 day. |
| 10 | Performance pass: Lighthouse-CI budget (LCP < 1.5s, CLS 0, INP < 200ms). | Eng | 0.5 day. |
| 11 | Staging deploy to a preview URL. Jeremy reviews 10 random posts, the /now page, and the speaking page. | Jeremy | Async. |
| 12 | DNS cutover. Keep the old Hugo build live at `legacy.jmeiss.me` for 30 days as a safety net. | Eng | 1 hour. |
| 13 | Post-launch: monitor 404s in analytics for a week. Add any missing redirects. | Eng | Ongoing. |

**Total engineering: ~7–9 working days.** Most of the risk lives in steps 5 and 6.

---

## 6. Authoring workflow (post-launch)

Jeremy's day-to-day for writing a new post:

```bash
# 1. Create a file
content/posts/2026-05-12-some-title.mdx

# 2. Write
---
title: "..."
date: 2026-05-12
tags: [devrel, metrics]
excerpt: "..."
---

The lede goes here.

<PullQuote>The juicy bit.</PullQuote>

# 3. git commit && git push  → Vercel deploys.
```

A `pnpm new-post "Title here"` script scaffolds the file with today's date and a slug.

---

## 7. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Broken inbound links from old URLs | Audit + redirect table in step 6; legacy site stays up at `legacy.` for 30 days |
| Hugo shortcodes that don't translate cleanly | Step 5 normalizer surfaces every shortcode; we hand-port the long-tail |
| RSS reader breakage | Keep the same feed item GUIDs (use canonical URL); validate before cutover |
| Webfont CLS on slow networks | `next/font` with `display: swap` and metric-overrides |
| Image weight | All `<img>` → `next/image` with explicit width/height during migration |

---

## 8. What ships in v1 vs v1.1

**v1 (cutover):** all 5 pages, full content migration, feeds, sitemap, redirects, search, a11y, perf.

**v1.1 (within 30 days):** OG image generation per post (`@vercel/og`), Plausible dashboard, optional newsletter signup, Webmentions endpoint.

---

## 9. Open questions for Jeremy

1. Confirm the canonical post URL pattern — `/writing/:slug` (proposed) or keep `/posts/:slug`?
2. Should comments be Mastodon-reply-only, or do you want Webmentions wired up day-one?
3. Newsletter — in v1 or punt to v1.1?
4. Where does the repo live — keep `jerdog/jmeiss.me` or fresh repo?
5. Do you want the `/now` updates to be git-committed or pulled from a private gist (lower friction)?
