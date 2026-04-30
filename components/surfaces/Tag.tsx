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
  sm: "text-xs px-3 py-1",
  md: "text-sm px-4 py-1.5",
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
    "inline-flex items-center font-body rounded-full border border-ink transition-colors",
    sizeClass[size],
    selected ? "bg-accent text-paper" : "bg-card text-ink hover:bg-highlight",
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
