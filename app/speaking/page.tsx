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
      <Container className="py-10 md:py-14">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <Tape rotation={-3} color="highlight">
              on stage
            </Tape>
            <h1 className="mt-4 mb-3 font-display text-5xl leading-[1.08] tracking-tight md:text-6xl md:leading-[1.06] lg:text-[5.25rem] lg:leading-[1.05]">
              i give the kind of talks that have{" "}
              <span className="box-decoration-clone rounded-sm bg-highlight px-1 py-px">
                actual jokes
              </span>
              .
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
              keynotes, conference talks, panels, podcasts. mostly emerging technologies, devops, ai, devrel, devex, and community.
              occasionally squirrels.
            </p>
          </div>
          <div className="md:col-span-5">
            <div
              className="reduced-motion-flat border border-ink bg-ink px-6 py-5 text-paper"
              style={{ transform: "rotate(1deg)" }}
            >
              <p className="font-hand text-2xl text-highlight">want me at your event?</p>
              <p className="mt-1.5 text-sm leading-relaxed text-paper/85">
                i&apos;ll travel. send me a note about format, audience, and what you want them
                to walk away believing.
              </p>
              <a
                href={`mailto:${siteConfig.person.email}?subject=Speaking%20request`}
                className="mt-3 inline-flex items-center rounded-full bg-warm px-4 py-2 text-sm font-medium text-paper transition-colors hover:opacity-90"
              >
                send the note →
              </a>
            </div>
          </div>
        </div>
      </Container>

      <Container className="pt-2 pb-6">
        <div className="mb-4 flex items-baseline gap-4">
          <h2 className="font-display text-2xl md:text-3xl">upcoming events.</h2>
          {upcomingRows.length > 0 ? (
            <span className="font-hand text-lg text-muted">
              {upcomingRows.length} on the calendar
            </span>
          ) : null}
        </div>
        {upcomingRows.length === 0 ? (
          <EmptyTalksState />
        ) : (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {upcomingRows.map((t) => (
              <TalkRow key={`upcoming-${t.date}-${t.title}`} talk={t} />
            ))}
          </div>
        )}
      </Container>

      {talks.length > 0 ? (
        <Container className="pb-6">
          <div className="mb-4 flex items-baseline gap-4">
            <h2 className="font-display text-2xl md:text-3xl">more dates.</h2>
            <span className="font-hand text-lg text-muted">{talks.length} in the catalog</span>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {talks.map((t) => (
              <TalkRow key={`${t.date}-${t.title}`} talk={t} />
            ))}
          </div>
        </Container>
      ) : null}

      {pastTalks ? (
        <Container className="pb-6">
          <PastTalksBlock talks={notistPast} portfolioUrl={pastTalks.portfolioUrl} />
        </Container>
      ) : null}

      <Container className="pt-6 pb-12">
        <h2 className="mb-4 font-display text-2xl md:text-3xl">topics i&apos;ll happily talk about.</h2>
        <TopicChips topics={topics} />
      </Container>
    </BPaper>
  );
}
