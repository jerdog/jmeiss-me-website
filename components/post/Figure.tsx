import Image from "next/image";
import { cn } from "@/lib/cn";
import { NewTabHint } from "@/components/a11y/NewTabHint";
import { isOffSiteHref, offSiteAnchorProps } from "@/lib/off-site-href";

interface FigureProps {
  src: string;
  alt?: string;
  caption?: string;
  attr?: string;
  attrLink?: string;
  width?: number;
  height?: number;
  className?: string;
}

export function Figure({
  src,
  alt = "",
  caption,
  attr,
  attrLink,
  width = 1200,
  height = 800,
  className,
}: FigureProps) {
  const isRemote = /^https?:\/\//.test(src);
  const isAnimated = /\.gif($|\?)/i.test(src);

  return (
    <figure className={cn("content-figure", className)}>
      {isRemote ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="content-figure__image"
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="content-figure__image"
          sizes="(min-width: 768px) 720px, 100vw"
          unoptimized={isAnimated}
        />
      )}
      {(caption || attr) && (
        <figcaption className="content-figure__caption">
          {caption}
          {caption && attr ? " · " : null}
          {attr ? (
            attrLink ? (
              <a
                href={attrLink}
                className="content-figure__caption-link"
                {...offSiteAnchorProps(attrLink)}
              >
                {attr}
                {isOffSiteHref(attrLink) ? <NewTabHint /> : null}
              </a>
            ) : (
              <span>{attr}</span>
            )
          ) : null}
        </figcaption>
      )}
    </figure>
  );
}
