import type { Metadata } from "next";
import { BPaper } from "@/components/surfaces/BPaper";
import { Container } from "@/components/layout/Container";
import { Tape } from "@/components/surfaces/Tape";
import { NowPanel } from "@/components/home/NowPanel";
import { now } from "@/content/now";
import { offSiteAnchorProps } from "@/lib/off-site-href";

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
      <Container className="page-pad-standard">
        <Tape rotation={-2}>now</Tape>
        <h1 className="page-title">what i&apos;m up to today-ish.</h1>
        <p className="page-lede">
          A{" "}
          <a
            href="https://nownownow.com/about"
            className="text-link"
            {...offSiteAnchorProps("https://nownownow.com/about")}
          >
            /now
          </a>{" "}
          page in the spirit of Derek Sivers — what I&apos;m focusing on at this point in life.
          Updated whenever it shifts. Or when the pack of rabid 🐿️ goes into hibernation.
        </p>
      </Container>

      <Container className="page-pad-now-bottom">
        <NowPanel now={now} variant="wide" />
      </Container>
    </BPaper>
  );
}
