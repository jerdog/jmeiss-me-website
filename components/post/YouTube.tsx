import { NewTabHint } from "@/components/a11y/NewTabHint";
import { offSiteAnchorProps } from "@/lib/off-site-href";

interface YouTubeProps {
  id: string;
  title?: string;
  aspect?: "16/9" | "4/3" | "1/1";
}

export function YouTube({ id, title = "YouTube video", aspect = "16/9" }: YouTubeProps) {
  const watchUrl = `https://www.youtube.com/watch?v=${encodeURIComponent(id)}`;

  return (
    <figure className="content-youtube-wrap">
      <div className="content-youtube" style={{ aspectRatio: aspect.replace("/", " / ") }}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`}
          title={title}
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="content-youtube__frame"
        />
      </div>
      <figcaption className="content-youtube__caption">
        <a href={watchUrl} className="text-link" {...offSiteAnchorProps(watchUrl)}>
          {title}
          <NewTabHint />
        </a>
        {" · "}
        <a href={watchUrl} className="text-link" {...offSiteAnchorProps(watchUrl)}>
          Watch on YouTube
          <NewTabHint />
        </a>
        {" "}
        (enable captions in the player)
      </figcaption>
    </figure>
  );
}
