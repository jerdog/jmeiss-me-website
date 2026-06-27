import { cn } from "@/lib/cn";

interface PullQuoteProps {
  children: React.ReactNode;
  attribution?: string;
  className?: string;
}

export function PullQuote({ children, attribution, className }: PullQuoteProps) {
  return (
    <blockquote className={cn("content-pullquote reduced-motion-flat", className)} style={{ transform: "rotate(-0.5deg)" }}>
      <span aria-hidden className="content-pullquote__mark">
        “
      </span>
      <p className="content-pullquote__text">{children}</p>
      {attribution ? <cite className="content-pullquote__cite">— {attribution}</cite> : null}
    </blockquote>
  );
}
