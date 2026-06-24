import Image from "next/image";
import { Card } from "@/components/surfaces/Card";
import { Tape } from "@/components/surfaces/Tape";
import type { PostSummary } from "@/lib/posts";
import { siteConfig } from "@/content/site";
import { formatLongDate } from "@/lib/format";
import { roleCompanyLine } from "@/lib/person-line";

interface PostHeaderProps {
  post: PostSummary;
  number?: number;
}

export function PostHeader({ post, number }: PostHeaderProps) {
  const { person } = siteConfig;
  const date = formatLongDate(post.date);
  const byline = roleCompanyLine(person.role, person.company);

  return (
    <Card variant="card" shadow="ink" className="post-header">
      {number !== undefined ? (
        <Tape rotation={-3} color="warm" textColor="paper" className="post-header__tape">
          essay № {number}
        </Tape>
      ) : null}

      <p className="post-header__meta">
        {post.tags.map((t) => `#${t}`).join("  ")}
        {post.tags.length > 0 ? " · " : ""}
        {date} · {post.readMinutes} min
      </p>

      <h1 className="post-header__title">{post.title}</h1>

      <p className="post-header__excerpt">{post.excerpt}</p>

      <div className="post-header__byline">
        <div className="post-header__avatar-wrap">
          <Image
            src={person.avatar}
            alt=""
            width={44}
            height={44}
            className="post-header__avatar"
          />
        </div>
        <div className="post-header__author">
          <p className="post-header__name">{person.name}</p>
          {byline ? <p className="post-header__role">{byline}</p> : null}
        </div>
        <span className="post-header__hint reduced-motion-flat" style={{ transform: "rotate(-2deg)" }}>
          real take inside ↓
        </span>
      </div>
    </Card>
  );
}
