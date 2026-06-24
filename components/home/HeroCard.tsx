import Link from "next/link";
import { Card } from "@/components/surfaces/Card";
import { Tape } from "@/components/surfaces/Tape";
import { siteConfig } from "@/content/site";
import { roleCompanyLine } from "@/lib/person-line";

export function HeroCard() {
  const { person } = siteConfig;
  const byline = roleCompanyLine(person.role, person.company);
  return (
    <Card variant="card" shadow="ink" className="hero-card">
      <Tape rotation={-3} className="hero-card__tape-left">
        hello
      </Tape>
      <Tape rotation={4} color="highlight" className="hero-card__tape-right">
        personal website
      </Tape>

      {byline ? <p className="hero-card__byline">{byline}</p> : null}

      <h1 className="hero-card__title">
        hi, i&apos;m jeremy.{" "}
        <span className="hero-card__underline-wrap">
          welcome
          <svg
            aria-hidden
            width="100%"
            height="14"
            viewBox="0 0 400 14"
            preserveAspectRatio="none"
            className="hero-card__underline"
          >
            <path
              d="M2,8 Q100,2 200,7 T398,6"
              stroke="var(--color-warm)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </span>
        .
      </h1>

      <p className="hero-card__blurb">{person.blurb}</p>

      <div className="hero-card__actions">
        <Link href="/speaking" className="btn-secondary-lg">
          my speaking portfolio
        </Link>
        <Link href="/posts" className="btn-primary-lg">
          read my writing
        </Link>
        <Link href="/about" className="btn-primary-lg">
          about me
        </Link>
        <span className="hand-accent reduced-motion-flat ml-1" style={{ transform: "rotate(-2deg)" }}>
          ← start here
        </span>
      </div>
    </Card>
  );
}
