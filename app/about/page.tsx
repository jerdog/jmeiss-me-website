import type { Metadata } from "next";
import { BPaper } from "@/components/surfaces/BPaper";
import { Container } from "@/components/layout/Container";
import { Tape } from "@/components/surfaces/Tape";
import { PortraitCard } from "@/components/about/PortraitCard";
import { Bookshelf } from "@/components/about/Bookshelf";
import { CoffeeLog } from "@/components/about/CoffeeLog";
import { SocialGrid } from "@/components/about/SocialGrid";
import { NowPanel } from "@/components/home/NowPanel";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/content/site";
import { now } from "@/content/now";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Jeremy Meiss — DevRel & DevEx leader, international speaker, KC-based, ADHD-fueled technologist.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  const { person, socials, affiliations } = siteConfig;

  // ProfilePage / Person JSON-LD: this is the canonical "about" entity for
  // the site. Same `@id` as the home page Person so crawlers can stitch the
  // graph together; here we add the longer description and address details.
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
      <Container className="pt-10 pb-6 md:pt-14">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <PortraitCard />
          </div>
          <div className="md:col-span-7">
            <Tape rotation={-3}>about</Tape>
            <h1 className="mt-4 mb-4 font-display text-4xl leading-[0.98] tracking-tight md:text-5xl lg:text-6xl">
              over three decades in tech. still genuinely{" "}
              <span className="italic text-warm">likes</span> it.
            </h1>
            <p className="text-base leading-relaxed text-ink-soft md:text-lg">{person.longBio}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {affiliations.map((a) => (
                <span
                  key={a}
                  className="rounded-full border border-ink bg-card px-3 py-1 font-body text-xs"
                >
                  {a}
                </span>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={person.resumeHref}
                className="inline-flex items-center rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-accent-deep"
              >
                Download resume (PDF)
              </a>
              <a
                href={`mailto:${person.email}`}
                className="inline-flex items-center rounded-full border border-ink bg-paper px-4 py-2 text-sm text-ink transition-colors hover:bg-card"
              >
                Email me
              </a>
            </div>
          </div>
        </div>
      </Container>

      <Container className="py-6">
        <NowPanel now={now} variant="wide" />
      </Container>

      <Container className="py-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Bookshelf />
          <CoffeeLog />
        </div>
      </Container>

      <Container className="pt-6 pb-12">
        <h2 className="mb-4 font-display text-2xl md:text-3xl">say hi.</h2>
        <SocialGrid socials={socials} />
      </Container>
    </BPaper>
  );
}
