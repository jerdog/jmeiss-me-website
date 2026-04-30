import Link from "next/link";
import { BPaper } from "@/components/surfaces/BPaper";
import { Container } from "@/components/layout/Container";
import { Tape } from "@/components/surfaces/Tape";

export default function NotFound() {
  return (
    <BPaper>
      <Container className="py-16 md:py-24">
        <Tape rotation={-3} color="warm" textColor="paper">
          404
        </Tape>
        <h1 className="mt-4 mb-4 font-display text-5xl leading-[0.95] tracking-tight md:text-6xl">
          this page doesn&apos;t exist (yet?).
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
          The link you followed might be old, or the page may have moved during the migration
          from Hugo. Try the{" "}
          <Link
            href="/posts"
            className="text-accent underline underline-offset-4 hover:text-accent-deep"
          >
            writing index
          </Link>{" "}
          or head{" "}
          <Link
            href="/"
            className="text-accent underline underline-offset-4 hover:text-accent-deep"
          >
            home
          </Link>
          .
        </p>
      </Container>
    </BPaper>
  );
}
