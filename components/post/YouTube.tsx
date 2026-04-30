interface YouTubeProps {
  id: string;
  title?: string;
  /** Optional aspect ratio. Defaults to 16/9. */
  aspect?: "16/9" | "4/3" | "1/1";
}

/**
 * Lite YouTube embed using a privacy-enhanced iframe.
 * Replaces the Hugo `{{< youtube ID >}}` shortcode.
 */
export function YouTube({ id, title = "YouTube video", aspect = "16/9" }: YouTubeProps) {
  return (
    <div
      className="my-6 w-full overflow-hidden border border-ink bg-ink"
      style={{ aspectRatio: aspect.replace("/", " / ") }}
    >
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
}
