import type { Metadata } from "next";
import { BPaper } from "@/components/surfaces/BPaper";
import { Container } from "@/components/layout/Container";
import { Tape } from "@/components/surfaces/Tape";
import { TalkRow } from "@/components/speaking/TalkRow";
import { TopicChips } from "@/components/speaking/TopicChips";
import { EmptyTalksState } from "@/components/speaking/EmptyTalksState";
import { talks, topics } from "@/content/talks";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Speaking",
  description:
    "Keynotes, conference talks, panels, and podcasts on Developer Relations, Developer Experience, community, and more.",
  alternates: {
    canonical: "/speaking",
  },
};

export default function SpeakingPage() {
  const upcoming = talks.filter((t) => t.upcoming);
  const past = talks.filter((t) => !t.upcoming);

  return (
    <BPaper>
      <Container className="py-10 md:py-14">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <Tape rotation={-3} color="highlight">
              on stage
            </Tape>
            <h1 className="mt-4 mb-3 font-display text-5xl leading-[0.95] tracking-tight md:text-6xl lg:text-[5.25rem]">
              i give the kind of talks that have{" "}
              <span className="bg-highlight px-1.5">actual jokes</span>.
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
              keynotes, conference talks, panels, podcasts. mostly devrel, devex, and community.
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
          <h2 className="font-display text-2xl md:text-3xl">upcoming &amp; recent.</h2>
          {talks.length > 0 ? (
            <span className="font-hand text-lg text-muted">{talks.length} in the catalog</span>
          ) : null}
        </div>
        {talks.length === 0 ? (
          <EmptyTalksState />
        ) : (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {[...upcoming, ...past].map((t) => (
              <TalkRow key={`${t.date}-${t.title}`} talk={t} />
            ))}
          </div>
        )}
      </Container>

      <Container className="pt-6 pb-12">
        <h2 className="mb-4 font-display text-2xl md:text-3xl">topics i&apos;ll happily talk about.</h2>
        <TopicChips topics={topics} />
      </Container>
    </BPaper>
  );
}
