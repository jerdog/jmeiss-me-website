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

export function PostImage({
  src,
  alt = "",
  caption,
  width,
  height,
  className,
}: PostImageProps) {
  const isRemote = /^https?:\/\//.test(src);
  const isAnimated = /\.gif($|\?)/i.test(src);
  const w = width ?? 1200;
  const h = height ?? 800;

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
          width={w}
          height={h}
          className="content-figure__image"
          sizes="(min-width: 768px) 720px, 100vw"
          unoptimized={isAnimated}
        />
      )}
      {caption ? <figcaption className="content-figure__caption">{caption}</figcaption> : null}
    </figure>
  );
}
