import Link from "next/link";
import { Card } from "@/components/surfaces/Card";
import { Tape } from "@/components/surfaces/Tape";
import { siteConfig } from "@/content/site";
import { roleCompanyLine } from "@/lib/person-line";

export function HeroCard() {
  const { person } = siteConfig;
  const byline = roleCompanyLine(person.role, person.company);
  return (
    <Card variant="card" shadow="ink" className="px-7 py-10 sm:px-11 sm:py-10">
      <Tape rotation={-3} className="absolute -top-3.5 left-10">
        hello
      </Tape>
      <Tape rotation={4} color="highlight" className="absolute -top-3.5 right-14">
        personal website
      </Tape>

      {byline ? (
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
          {byline}
        </p>
      ) : null}

      <h1 className="mt-3 mb-4 font-display text-5xl leading-[0.95] tracking-tight text-ink sm:text-6xl md:text-7xl lg:text-[5.5rem]">
        hi, i&apos;m jeremy. {" "}
        <span className="relative inline-block">
          welcome
          <svg
            aria-hidden
            width="100%"
            height="14"
            viewBox="0 0 400 14"
            preserveAspectRatio="none"
            className="absolute bottom-[-6px] left-0"
          >
            <path
              d="M2,8 Q100,2 200,7 T398,6"
              stroke="var(--color-warm)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </span>.
      </h1>

      <p className="mb-5 max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft">
        {person.blurb}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <Link
          href="/speaking"
          className="rounded-full border border-ink bg-transparent px-5 py-2.5 font-body text-sm text-ink transition-colors hover:bg-card"
        >
          my speaking portfolio
        </Link>
        <Link
          href="/posts"
          className="rounded-full bg-ink px-5 py-2.5 font-body text-sm font-medium opacity-75 text-paper transition-colors hover:bg-accent-deep"
        >
          read my writing
        </Link>
        <Link
          href="/posts"
          className="rounded-full bg-ink px-5 py-2.5 font-body text-sm font-medium text-paper transition-colors hover:bg-accent-deep"
        >
          about me
        </Link>
        <span
          className="reduced-motion-flat ml-1 inline-block font-hand text-xl text-warm"
          style={{ transform: "rotate(-2deg)" }}
        >
          ← start here
        </span>
      </div>
    </Card>
  );
}
