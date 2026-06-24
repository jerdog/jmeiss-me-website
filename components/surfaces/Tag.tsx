import Link from "next/link";
import { cn } from "@/lib/cn";
import { tagToSlug } from "@/lib/posts";

interface TagProps {
  /** Tag slug — used both for display and the href. */
  tag: string;
  /** When true, render as a non-link span (filter chip). */
  as?: "link" | "span";
  selected?: boolean;
  onClick?: () => void;
  size?: "sm" | "md";
  className?: string;
}

const sizeClass: Record<NonNullable<TagProps["size"]>, string> = {
  sm: "tag-chip--sm",
  md: "tag-chip--md",
};

/** A pill chip used for tag filters and inline tag references. */
export function Tag({
  tag,
  as = "link",
  selected = false,
  onClick,
  size = "sm",
  className,
}: TagProps) {
  const cls = cn(
    "tag-chip",
    sizeClass[size],
    selected ? "tag-chip--selected" : "tag-chip--default",
    className,
  );

  if (as === "span" || onClick) {
    return (
      <button type="button" onClick={onClick} className={cls}>
        #{tag}
      </button>
    );
  }

  return (
    <Link href={`/tags/${tagToSlug(tag)}`} className={cls}>
      #{tag}
    </Link>
  );
}
