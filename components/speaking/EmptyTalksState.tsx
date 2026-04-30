import { siteConfig } from "@/content/site";

export function EmptyTalksState() {
  return (
    <div className="rounded-md border border-dashed border-rule bg-card px-7 py-12 text-center">
      <p className="font-display text-2xl text-ink">
        Talk list is being assembled.
      </p>
      <p className="mt-2 text-sm text-ink-soft">
        I&apos;ve given a stack of conference talks, podcasts, and panels — they&apos;ll show up
        here once I finish porting the back catalog.
      </p>
      <p className="mt-4 text-sm">
        In the meantime,{" "}
        <a
          href={`mailto:${siteConfig.person.email}`}
          className="text-accent underline underline-offset-4 hover:text-accent-deep"
        >
          email me about a speaking slot
        </a>
        .
      </p>
    </div>
  );
}
