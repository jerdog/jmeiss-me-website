import type { NotistPastTalk } from "@/lib/notist";
import { offSiteAnchorProps } from "@/lib/off-site-href";

function portfolioLabel(portfolioUrl: string): string {
  try {
    return new URL(portfolioUrl).hostname.replace(/^www\./, "");
  } catch {
    return "portfolio";
  }
}

interface PastTalksBlockProps {
  talks: NotistPastTalk[];
  portfolioUrl: string;
}

export function PastTalksBlock({ talks, portfolioUrl }: PastTalksBlockProps) {
  const host = portfolioLabel(portfolioUrl);
  return (
    <section className="border-t border-dashed border-paper-deep pt-10 pb-2">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="font-display text-2xl md:text-3xl">past talks.</h2>
        <a
          href={portfolioUrl}
          className="inline-flex w-fit items-center rounded-full border border-ink bg-paper px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-card"
          {...offSiteAnchorProps(portfolioUrl, { existingRel: "me" })}
        >
          full portfolio on {host} →
        </a>
      </div>
      {talks.length > 0 ? (
        <ul className="m-0 list-none space-y-2 p-0">
          {talks.map((t) => (
            <li key={t.href}>
              <a
                href={t.href}
                className="group grid grid-cols-1 gap-1.5 border border-ink bg-card px-4 py-3 transition-colors hover:bg-paper sm:grid-cols-[minmax(0,7.5rem)_minmax(0,1fr)_minmax(0,11.5rem)] sm:items-start sm:gap-x-4 sm:gap-y-0"
                {...offSiteAnchorProps(t.href, { existingRel: "me" })}
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted group-hover:text-accent sm:pt-0.5">
                  {t.dateLabel || "—"}
                </span>
                <span className="font-display text-base leading-snug text-ink group-hover:underline min-w-0">
                  {t.title}
                </span>
                <span className="text-left text-sm leading-snug text-ink-soft sm:text-right sm:pt-0.5 min-w-0">
                  {t.conference || "—"}
                </span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="m-0 max-w-xl text-sm leading-relaxed text-ink-soft">
          Slides and recordings for the full list live on{" "}
          <a
            href={portfolioUrl}
            className="text-ink underline hover:no-underline"
            {...offSiteAnchorProps(portfolioUrl, { existingRel: "me" })}
          >
            {host}
          </a>
          .
        </p>
      )}
    </section>
  );
}
