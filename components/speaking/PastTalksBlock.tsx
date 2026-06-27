import type { NotistPastTalk } from "@/lib/notist";
import { NewTabHint } from "@/components/a11y/NewTabHint";
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
    <section className="past-talks">
      <div className="past-talks__header">
        <h2 className="panel-title">past talks.</h2>
        <a
          href={portfolioUrl}
          className="btn-secondary"
          {...offSiteAnchorProps(portfolioUrl, { existingRel: "me" })}
        >
          full portfolio on {host} →
          <NewTabHint />
        </a>
      </div>
      {talks.length > 0 ? (
        <ul className="past-talks__list">
          {talks.map((t) => (
            <li key={t.href}>
              <a
                href={t.href}
                className="past-talks__item"
                {...offSiteAnchorProps(t.href, { existingRel: "me" })}
              >
                <span className="past-talks__date">{t.dateLabel || "—"}</span>
                <span className="past-talks__title">{t.title}</span>
                <span className="past-talks__event">{t.conference || "—"}</span>
                <NewTabHint />
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="past-talks__fallback">
          Slides and recordings for the full list live on{" "}
          <a
            href={portfolioUrl}
            className="past-talks__fallback-link"
            {...offSiteAnchorProps(portfolioUrl, { existingRel: "me" })}
          >
            {host}
            <NewTabHint />
          </a>
          .
        </p>
      )}
    </section>
  );
}
