import { BPaper } from "@/components/surfaces/BPaper";
import { Container } from "@/components/layout/Container";
import { HeroCard } from "@/components/home/HeroCard";
import { NowPanel } from "@/components/home/NowPanel";
import { FeedStrip } from "@/components/home/FeedStrip";
import { RecentEssays } from "@/components/home/RecentEssays";
import { ServicesStrip } from "@/components/home/ServicesStrip";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllPosts } from "@/lib/posts";
import { feedCoffee } from "@/content/coffee";
import { now } from "@/content/now";
import { siteConfig } from "@/content/site";
import { upcomingTalks, visibleUpcomingTalkRows } from "@/content/talks";

export default async function HomePage() {
  const posts = await getAllPosts();
  const recent = posts.slice(0, 4);
  const nextTalk = visibleUpcomingTalkRows(upcomingTalks)[0];

  const homeJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.title,
      description: siteConfig.description,
      inLanguage: "en-US",
      publisher: { "@id": `${siteConfig.url}/#person` },
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: siteConfig.person.name,
      jobTitle: siteConfig.person.role,
      url: siteConfig.url,
      image: `${siteConfig.url}${siteConfig.person.portrait}`,
      ...(siteConfig.person.company && siteConfig.person.companyUrl
        ? {
            worksFor: {
              "@type": "Organization",
              name: siteConfig.person.company,
              url: siteConfig.person.companyUrl,
            },
          }
        : {}),
      sameAs: siteConfig.socials
        .filter((s) => s.href.startsWith("http"))
        .map((s) => s.href),
    },
  ];

  return (
    <BPaper>
      <JsonLd data={homeJsonLd} />
      <Container className="page-pad-hero">
        <div className="page-grid-12">
          <div className="page-col-7">
            <HeroCard />
          </div>
          <div className="page-col-5">
            <NowPanel now={now} variant="panel" />
          </div>
        </div>
      </Container>

      <Container>
        <FeedStrip posts={posts} upcomingTalk={nextTalk} feedCoffee={feedCoffee} />
        <RecentEssays posts={recent} />
        <ServicesStrip />
      </Container>

      <div className="page-spacer" />
    </BPaper>
  );
}
