import { BPaper } from "@/components/surfaces/BPaper";
import { Container } from "@/components/layout/Container";
import { HeroCard } from "@/components/home/HeroCard";
import { NowPanel } from "@/components/home/NowPanel";
import { FeedStrip } from "@/components/home/FeedStrip";
import { RecentEssays } from "@/components/home/RecentEssays";
import { ServicesStrip } from "@/components/home/ServicesStrip";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllPosts } from "@/lib/posts";
import { now } from "@/content/now";
import { siteConfig } from "@/content/site";

export default async function HomePage() {
  const posts = await getAllPosts();
  const recent = posts.slice(0, 4);

  // WebSite + Person on the home page so search engines get a sitelinks
  // searchbox candidate (Pagefind index handles the actual queries) and a
  // canonical Person entity that downstream schema (BlogPosting authors)
  // can reference by `@id` if we ever want to wire that up.
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
