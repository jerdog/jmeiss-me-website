import type { Metadata } from "next";
import Link from "next/link";
import { BPaper } from "@/components/surfaces/BPaper";
import { Container } from "@/components/layout/Container";
import { Tape } from "@/components/surfaces/Tape";
import { NowPanel } from "@/components/home/NowPanel";
import { now } from "@/content/now";

export const metadata: Metadata = {
  title: "Now",
  description: "What Jeremy Meiss is working on, reading, and drinking right now.",
  alternates: {
    canonical: "/now",
  },
};

export default function NowPage() {
  return (
    <BPaper>
      <Container className="py-10 md:py-14">
        <Tape rotation={-2}>now</Tape>
        <h1 className="mt-4 mb-3 font-display text-4xl leading-[0.95] tracking-tight md:text-5xl lg:text-6xl">
          what i&apos;m up to today-ish.
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
          A{" "}
          <Link
            href="https://nownownow.com/about"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-4 hover:text-accent-deep"
          >
            /now
          </Link>{" "}
          page in the spirit of Derek Sivers — what I&apos;m focusing on at this point in life.
          Updated whenever it shifts.
        </p>
      </Container>

      <Container className="pb-10">
        <NowPanel now={now} variant="wide" />
      </Container>
    </BPaper>
  );
}
