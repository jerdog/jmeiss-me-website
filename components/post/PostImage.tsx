import Image from "next/image";
import { cn } from "@/lib/cn";

interface PostImageProps {
  src: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Default image rendering inside MDX posts. Uses `next/image` for optimization.
 * Falls back to a plain <img> for remote URLs that aren't pre-configured.
 *
 * Width and height are required to avoid CLS. The shortcode normalizer or
 * a build-time `image-size` probe should populate them for legacy posts.
 */
export function PostImage({
  src,
  alt = "",
  caption,
  width,
  height,
  className,
}: PostImageProps) {
  const isRemote = /^https?:\/\//.test(src);
  const w = width ?? 1200;
  const h = height ?? 800;

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
          width={w}
          height={h}
          className="h-auto max-w-full border border-rule"
          sizes="(min-width: 768px) 720px, 100vw"
        />
      )}
      {caption ? (
        <figcaption className="mt-2 text-center font-hand text-base text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
