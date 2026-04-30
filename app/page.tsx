import { BPaper } from "@/components/surfaces/BPaper";
import { Container } from "@/components/layout/Container";
import { HeroCard } from "@/components/home/HeroCard";
import { NowPanel } from "@/components/home/NowPanel";
import { FeedStrip } from "@/components/home/FeedStrip";
import { RecentEssays } from "@/components/home/RecentEssays";
import { ServicesStrip } from "@/components/home/ServicesStrip";
import { getAllPosts } from "@/lib/posts";
import { now } from "@/content/now";

export default async function HomePage() {
  const posts = await getAllPosts();
  const recent = posts.slice(0, 4);

  return (
    <BPaper>
      <Container className="py-8 md:py-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <HeroCard />
          </div>
          <div className="md:col-span-5">
            <NowPanel now={now} variant="panel" />
          </div>
        </div>
      </Container>

      <Container>
        <FeedStrip posts={posts} />
        <RecentEssays posts={recent} />
        <ServicesStrip />
      </Container>

      <div className="h-12" />
    </BPaper>
  );
}
