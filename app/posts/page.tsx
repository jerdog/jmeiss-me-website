import type { Metadata } from "next";
import { BPaper } from "@/components/surfaces/BPaper";
import { Container } from "@/components/layout/Container";
import { PostsIndexClient } from "@/components/posts/PostsIndexClient";
import { getAllPosts, getAllTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays on Developer Relations, Developer Experience, community, leadership, and the work that makes developer-facing teams effective.",
  alternates: {
    canonical: "/posts",
  },
};

export default async function WritingIndexPage() {
  const posts = await getAllPosts();
  const tags = await getAllTags();

  return (
    <BPaper>
      <Container className="py-10 md:py-14">
        <PostsIndexClient posts={posts} tags={tags} />
      </Container>
    </BPaper>
  );
}
