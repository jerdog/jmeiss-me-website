import type { Metadata } from "next";
import { BPaper } from "@/components/surfaces/BPaper";
import { InlineMarkdown } from "@/components/content/InlineMarkdown";
import { Container } from "@/components/layout/Container";
import { Tape } from "@/components/surfaces/Tape";
import { AboutCredentials } from "@/components/about/AboutCredentials";
import { BadgeWall } from "@/components/about/BadgeWall";
import { PortraitCard } from "@/components/about/PortraitCard";
import { Bookshelf } from "@/components/about/Bookshelf";
import { DrinkingPanel } from "@/components/about/DrinkingPanel";
import { SocialGrid } from "@/components/about/SocialGrid";
import { NowPanel } from "@/components/home/NowPanel";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig, siteOrigin } from "@/content/site";
import { badgeProfileUrl, badges } from "@/content/badges";
import { drinks } from "@/content/drinking";
import { drinkingFromNow, now, readingFromNow } from "@/content/now";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Jeremy Meiss — DevRel & DevEx leader, international speaker, KC-based, ADHD-fueled technologist.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  const { person, socials, employment, affiliations } = siteConfig;

  const mainEntity: Record<string, unknown> = {
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: person.name,
    description: person.longBio,
    jobTitle: person.role,
    url: siteConfig.url,
    email: `mailto:${person.email}`,
    image: `${siteConfig.url}${person.portrait}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kansas City",
      addressRegion: "MO",
      addressCountry: "US",
    },
    sameAs: socials.filter((s) => s.href.startsWith("http")).map((s) => s.href),
  };
  if (person.handle) mainEntity.alternateName = person.handle;
  if (person.company && person.companyUrl) {
    mainEntity.worksFor = {
      "@type": "Organization",
      name: person.company,
      url: person.companyUrl,
    };
  }

  const profileJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteConfig.url}/about#profilepage`,
    url: `${siteConfig.url}/about`,
    name: `About ${person.name}`,
    inLanguage: "en-US",
    mainEntity,
  };

  return (
    <BPaper>
      <JsonLd data={profileJsonLd} />
      <Container className="page-pad-about-hero">
        <div className="page-grid-12-wide">
          <div className="page-col-5">
            <PortraitCard />
          </div>
          <div className="page-col-7">
            <Tape rotation={-3}>about</Tape>
            <h1 className="page-title-tight">
              over three decades in tech. still genuinely{" "}
              <span className="page-title-emphasis">likes</span> it.
            </h1>
            <p className="page-lede">
              <InlineMarkdown>{person.longBio}</InlineMarkdown>
            </p>

            <AboutCredentials employment={employment} affiliations={affiliations} />

            <div className="about-actions">
              <a href={person.resumeHref} className="btn-primary">
                Download resume (PDF)
              </a>
              <a href={`mailto:${person.email}`} className="btn-secondary">
                Email me
              </a>
            </div>
          </div>
        </div>
      </Container>

      <Container className="page-pad-section">
        <BadgeWall badges={badges} profileUrl={badgeProfileUrl} pageOrigin={siteOrigin} />
      </Container>

      <Container className="page-pad-section">
        <NowPanel now={now} variant="wide" />
      </Container>

      <Container className="page-pad-section">
        <div className="page-grid-2">
          <Bookshelf text={readingFromNow(now)} />
          <DrinkingPanel snapshot={drinkingFromNow(now)} drinks={drinks} />
        </div>
      </Container>

      <Container className="page-pad-footer">
        <h2 className="section-title">say hi.</h2>
        <SocialGrid socials={socials} />
      </Container>
    </BPaper>
  );
}
