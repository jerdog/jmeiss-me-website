import type { MetadataRoute } from "next";
import { getAllPosts, getAllTags, tagToSlug } from "@/lib/posts";
import { siteConfig } from "@/content/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const posts = await getAllPosts();
  const tags = await getAllTags();
  const newest = posts[0]?.date ? new Date(posts[0].date) : new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: newest, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/posts`, lastModified: newest, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/speaking`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/now`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
  ];

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/posts/${post.urlSlug}`,
    lastModified: post.updated ? new Date(post.updated) : new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  const tagEntries: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${base}/tags/${tagToSlug(tag)}`,
    lastModified: newest,
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  return [...staticPages, ...postEntries, ...tagEntries];
}
