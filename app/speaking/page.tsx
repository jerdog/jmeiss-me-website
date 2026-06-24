import type { Metadata } from "next";
import { BPaper } from "@/components/surfaces/BPaper";
import { Container } from "@/components/layout/Container";
import { Tape } from "@/components/surfaces/Tape";
import { TalkRow } from "@/components/speaking/TalkRow";
import { TopicChips } from "@/components/speaking/TopicChips";
import { EmptyTalksState } from "@/components/speaking/EmptyTalksState";
import { PastTalksBlock } from "@/components/speaking/PastTalksBlock";
import {
  talks,
  topics,
  pastTalks,
  upcomingTalks,
  visibleUpcomingTalkRows,
} from "@/content/talks";
import { siteConfig } from "@/content/site";
import { fetchNotistPastTalks } from "@/lib/notist";

export const metadata: Metadata = {
  title: "Speaking",
  description:
    "Keynotes, conference talks, panels, and podcasts on Emerging Technologies, DevOps, AI, Developer Relations, Developer Experience, community, and more.",
  alternates: {
    canonical: "/speaking",
  },
};

export default async function SpeakingPage() {
  const upcomingRows = visibleUpcomingTalkRows(upcomingTalks);
  const notistPast = pastTalks
    ? await fetchNotistPastTalks(pastTalks.feedUrl, pastTalks.limit)
    : [];

  return (
    <BPaper>
      <Container className="page-pad-standard">
        <div className="page-grid-12">
          <div className="page-col-7">
            <Tape rotation={-3} color="highlight">
              on stage
            </Tape>
            <h1 className="page-title-speaking">
              i give talks on tech and culture. sometimes with{" "}
              <span className="speaking-highlight">jokes</span>.
            </h1>
            <p className="page-lede-narrow">
              keynotes, conference talks, panels, podcasts. mostly emerging technologies, culture, devops, ai, devrel, devex, and community.
              occasionally squirrels.
            </p>
          </div>
          <div className="page-col-5">
            <div className="speaking-cta reduced-motion-flat" style={{ transform: "rotate(1deg)" }}>
              <p className="speaking-cta-title">want me at your event?</p>
              <p className="speaking-cta-body">
                i'll travel. send me a note about format, audience, and what you want them
                to walk away having learned.
              </p>
              <a
                href={`mailto:${siteConfig.person.email}?subject=Speaking%20request`}
                className="btn-warm"
              >
                send the note →
              </a>
            </div>
          </div>
        </div>
      </Container>

      <Container className="speaking-section">
        <div className="section-header">
          <h2 className="section-title-inline">upcoming events.</h2>
          {upcomingRows.length > 0 ? (
            <span className="section-note">
              {upcomingRows.length} on the calendar
            </span>
          ) : null}
        </div>
        {upcomingRows.length === 0 ? (
          <EmptyTalksState />
        ) : (
          <div className="speaking-grid">
            {upcomingRows.map((t) => (
              <TalkRow key={`upcoming-${t.date}-${t.title}`} talk={t} />
            ))}
          </div>
        )}
      </Container>

      {talks.length > 0 ? (
        <Container className="page-pad-section">
          <div className="section-header">
            <h2 className="section-title-inline">more dates.</h2>
            <span className="section-note">{talks.length} in the catalog</span>
          </div>
          <div className="speaking-grid">
            {talks.map((t) => (
              <TalkRow key={`${t.date}-${t.title}`} talk={t} />
            ))}
          </div>
        </Container>
      ) : null}

      {pastTalks ? (
        <Container className="page-pad-section">
          <PastTalksBlock talks={notistPast} portfolioUrl={pastTalks.portfolioUrl} />
        </Container>
      ) : null}

      <Container className="page-pad-footer">
        <h2 className="section-title">topics i&apos;ll happily talk about.</h2>
        <TopicChips topics={topics} />
      </Container>
    </BPaper>
  );
}
