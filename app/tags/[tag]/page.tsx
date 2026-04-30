import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BPaper } from "@/components/surfaces/BPaper";
import { Container } from "@/components/layout/Container";
import { Tape } from "@/components/surfaces/Tape";
import { PostCard } from "@/components/posts/PostCard";
import { getAllTags, getPostsByTag, tagFromSlug, tagToSlug } from "@/lib/posts";

interface PageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({ tag: tagToSlug(tag) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag } = await params;
  const canonical = (await tagFromSlug(tag)) ?? tag;
  return {
    title: `#${canonical}`,
    description: `Essays tagged #${canonical} on jmeiss.me.`,
    alternates: {
      canonical: `/tags/${tagToSlug(canonical)}`,
    },
  };
}

export default async function TagArchivePage({ params }: PageProps) {
  const { tag } = await params;
  const canonical = await tagFromSlug(tag);
  if (!canonical) notFound();
  const posts = await getPostsByTag(canonical);
  if (posts.length === 0) notFound();

  return (
    <BPaper>
      <Container className="py-10 md:py-14">
        <Link
          href="/posts"
          className="font-hand text-xl text-accent transition-colors hover:text-accent-deep"
        >
          ← all writing
        </Link>
        <Tape rotation={-2} className="mt-4">
          tag archive
        </Tape>
        <h1 className="mt-3 mb-3 font-display text-4xl leading-[0.98] tracking-tight md:text-5xl lg:text-6xl">
          #{canonical}
        </h1>
        <p className="text-base text-ink-soft md:text-lg">
          {posts.length} {posts.length === 1 ? "essay" : "essays"} tagged #{canonical}.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          {posts.map((post, i) => (
            <PostCard key={post.urlSlug} post={post} index={i} />
          ))}
        </div>
      </Container>
    </BPaper>
  );
}
