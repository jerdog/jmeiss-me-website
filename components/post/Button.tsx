import Link from "next/link";
import { cn } from "@/lib/cn";
import { offSiteAnchorProps } from "@/lib/off-site-href";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export function Button({ href, children, variant = "primary", className }: ButtonProps) {
  const cls = cn(
    variant === "primary" ? "btn-primary-lg" : "btn-secondary-lg",
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
