import { cn } from "@/lib/cn";

interface PullQuoteProps {
  children: React.ReactNode;
  /** Source attribution line, optional. */
  cite?: string;
  className?: string;
}

/**
 * Magazine-style pull quote: dark card with hand-set serif, slight rotation,
 * warm offset shadow. Usable directly in MDX as <PullQuote>.
 */
export function PullQuote({ children, cite, className }: PullQuoteProps) {
  return (
    <blockquote
      className={cn(
        "reduced-motion-flat hard-shadow-warm relative my-8 bg-ink px-7 py-7 text-highlight",
        className,
      )}
      style={{ transform: "rotate(-0.5deg)" }}
    >
      <span
        aria-hidden
        className="absolute -top-2 left-4 font-display text-7xl leading-none text-warm"
      >
        “
      </span>
      <p className="font-display text-2xl leading-snug">{children}</p>
      {cite ? (
        <cite className="mt-3 block font-hand text-base not-italic text-accent-soft">
          — {cite}
        </cite>
      ) : null}
    </blockquote>
  );
}
