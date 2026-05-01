import Link from "next/link";
import { cn } from "@/lib/cn";
import { offSiteAnchorProps } from "@/lib/off-site-href";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

/**
 * In-content call-to-action button. Replaces Hugo's `{{< button >}}` shortcode.
 * Uses a real anchor so it remains keyboard-navigable and indexable.
 */
export function Button({ href, children, variant = "primary", className }: ButtonProps) {
  const cls = cn(
    "inline-flex items-center gap-2 rounded-full px-5 py-2 font-body text-sm font-medium transition-colors",
    variant === "primary"
      ? "bg-ink text-paper hover:bg-accent-deep"
      : "border border-ink bg-paper text-ink hover:bg-card",
    className,
  );

  if (href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }

  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} className={cls} {...offSiteAnchorProps(href)}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
