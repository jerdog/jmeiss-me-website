import { Feed } from "feed";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/content/site";

/**
 * RSS feed served at /index.xml — the exact path Hugo produced, so existing
 * RSS subscriptions don't break.
 *
 * GUID is the canonical post URL. Item ordering is newest-first, matching
 * Hugo's default. We expose the post excerpt in the description (no full
 * content) to keep the feed light; subscribers click through for the body.
 */
export const dynamic = "force-static";

export async function GET(): Promise<Response> {
  const posts = await getAllPosts();
  const updated = posts[0]?.date ? new Date(posts[0].date) : new Date();

  const feed = new Feed({
    title: siteConfig.title,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    language: "en-us",
    image: `${siteConfig.url}/images/jeremy-meiss.jpg`,
    favicon: `${siteConfig.url}/favicon.ico`,
    copyright: siteConfig.copyright,
    updated,
    feedLinks: {
      rss2: `${siteConfig.url}/index.xml`,
      atom: `${siteConfig.url}/atom.xml`,
      json: `${siteConfig.url}/feed.json`,
    },
    author: {
      name: siteConfig.person.name,
      email: siteConfig.person.email,
      link: siteConfig.url,
    },
    generator: "Next.js + feed",
  });

  for (const post of posts) {
    const url = post.canonical ?? `${siteConfig.url}/posts/${post.urlSlug}`;
    feed.addItem({
      id: url,
      link: url,
      title: post.title,
      description: post.excerpt,
      date: new Date(post.date),
      category: post.tags.map((tag) => ({ name: tag })),
      author: [
        {
          name: siteConfig.person.name,
          link: siteConfig.url,
        },
      ],
      image: post.cover ? `${siteConfig.url}${post.cover}` : undefined,
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
