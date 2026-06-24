interface YouTubeProps {
  id: string;
  title?: string;
  aspect?: "16/9" | "4/3" | "1/1";
}

export function YouTube({ id, title = "YouTube video", aspect = "16/9" }: YouTubeProps) {
  return (
    <div className="content-youtube" style={{ aspectRatio: aspect.replace("/", " / ") }}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="content-youtube__frame"
      />
    </div>
  );
}
