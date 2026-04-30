import Image from "next/image";
import { cn } from "@/lib/cn";

interface FigureProps {
  src: string;
  alt?: string;
  /** Caption text below the image. */
  caption?: string;
  /** Attribution credit (e.g. photographer + link). */
  attr?: string;
  attrLink?: string;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Replaces Hugo's `{{< figure ... >}}` shortcode.
 * Combines image + caption + attribution credit.
 */
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
    <figure className={cn("my-6", className)}>
      {isRemote ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="h-auto max-w-full border border-rule"
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto max-w-full border border-rule"
          sizes="(min-width: 768px) 720px, 100vw"
          unoptimized={isAnimated}
        />
      )}
      {(caption || attr) && (
        <figcaption className="mt-2 text-center font-hand text-base text-muted">
          {caption}
          {caption && attr ? " · " : null}
          {attr ? (
            attrLink ? (
              <a href={attrLink} className="text-accent hover:underline" rel="noopener noreferrer">
                {attr}
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
