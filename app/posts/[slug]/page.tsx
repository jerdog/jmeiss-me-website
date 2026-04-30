import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BPaper } from "@/components/surfaces/BPaper";
import { Container } from "@/components/layout/Container";
import { PostHeader } from "@/components/post/PostHeader";
import { ContentsRail } from "@/components/post/ContentsRail";
import { RelatedPosts } from "@/components/post/RelatedPosts";
import { MDXContent } from "@/components/post/MDXContent";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { extractToc } from "@/lib/mdx";
import { siteConfig } from "@/content/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts({ includeDrafts: false });
  return posts.map((p) => ({ slug: p.urlSlug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const url = `${siteConfig.url}/posts/${post.urlSlug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: post.canonical ?? url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url,
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: [siteConfig.person.name],
      tags: post.tags,
      images: post.cover ? [{ url: post.cover }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.cover ? [post.cover] : undefined,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getAllPosts();
  const number = allPosts.length - allPosts.findIndex((p) => p.urlSlug === post.urlSlug);
  const related = await getRelatedPosts(post.urlSlug, 3);
  const toc = extractToc(post.content);

  return (
    <BPaper>
      <Container className="pt-6 pb-2">
        <Link
          href="/posts"
          className="font-hand text-xl text-accent transition-colors hover:text-accent-deep"
        >
          ← back to the writing
        </Link>
      </Container>

      <Container>
        <PostHeader post={post} number={number} />
      </Container>

      <Container className="pt-2 pb-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_280px]">
          <article
            data-post-article
            className="prose-mdx pt-3"
          >
            <MDXContent source={post.content} />
            <div className="mt-8 border-y-2 border-ink py-5 font-hand text-2xl text-warm">
              — jeremy, somewhere in kansas city
            </div>
          </article>

          <ContentsRail entries={toc} />
        </div>
      </Container>

      <Container>
        <RelatedPosts posts={related} />
      </Container>

      <div className="h-12" />
    </BPaper>
  );
}
