import { BPaper } from "@/components/surfaces/BPaper";
import { Container } from "@/components/layout/Container";
import { HeroCard } from "@/components/home/HeroCard";
import { NowPanel } from "@/components/home/NowPanel";
import { FeedStrip, type FeedTalk } from "@/components/home/FeedStrip";
import { RecentEssays } from "@/components/home/RecentEssays";
import { ServicesStrip } from "@/components/home/ServicesStrip";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllPosts } from "@/lib/posts";
import { now, feedCoffeeFromNow } from "@/content/now";
import { siteConfig } from "@/content/site";
import { pastTalks, upcomingTalks, visibleUpcomingTalkRows } from "@/content/talks";
import { fetchNotistPastTalks } from "@/lib/notist";

export default async function HomePage() {
  const posts = await getAllPosts();
  const recent = posts.slice(0, 4);

  const upcoming = visibleUpcomingTalkRows(upcomingTalks)[0];
  let feedTalk: FeedTalk | undefined;

  if (upcoming) {
    const metaParts = [upcoming.date, upcoming.event].filter(Boolean);
    feedTalk = {
      timing: "upcoming",
      title: upcoming.title,
      meta: metaParts.join(" · "),
      href: upcoming.href ?? "/speaking",
    };
  } else if (pastTalks) {
    const latest = (await fetchNotistPastTalks(pastTalks.feedUrl, 1))[0];
    if (latest) {
      const metaParts = [latest.dateLabel, latest.conference].filter(Boolean);
      feedTalk = {
        timing: "recent",
        title: latest.title,
        meta: metaParts.join(" · "),
        href: latest.href,
      };
    }
  }

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
        <FeedStrip posts={posts} feedTalk={feedTalk} feedCoffee={feedCoffeeFromNow(now)} />
        <RecentEssays posts={recent} />
        <ServicesStrip />
      </Container>

      <div className="page-spacer" />
    </BPaper>
  );
}
