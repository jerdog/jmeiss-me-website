import Link from "next/link";
import { NewTabHint } from "@/components/a11y/NewTabHint";
import type { Talk } from "@/content/talks";
import { cn } from "@/lib/cn";
import { isOffSiteHref, offSiteAnchorProps } from "@/lib/off-site-href";

interface TalkRowProps {
  talk: Talk;
}

export function TalkRow({ talk }: TalkRowProps) {
  const [month, year] = talk.date.split(" ");
  const inner = (
    <div className={cn("talk-row", talk.upcoming ? "talk-row--upcoming" : "talk-row--past")}>
      <div className="talk-row__date">
        <p className="talk-row__month">{month}</p>
        <p className="talk-row__year">{year}</p>
      </div>
      <div>
        <p className="talk-row__title">{talk.title}</p>
        <p className="talk-row__meta">
          {talk.event}
          {talk.location ? ` · ${talk.location}` : ""}
        </p>
      </div>
      <p className={talk.upcoming ? "talk-row__badge--upcoming" : "talk-row__badge--past"}>
        {talk.upcoming ? "↑ next" : talk.type}
      </p>
    </div>
  );

  if (talk.href) {
    if (isOffSiteHref(talk.href)) {
      return (
        <a href={talk.href} className="talk-row__link" {...offSiteAnchorProps(talk.href)}>
          {inner}
          <NewTabHint />
        </a>
      );
    }
    return (
      <Link href={talk.href} className="talk-row__link">
        {inner}
      </Link>
    );
  }
  return inner;
}
