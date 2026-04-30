import { cn } from "@/lib/cn";

interface BPaperProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * The "paper" background that every page sits on.
 * Renders a subtle SVG grain pattern at low opacity for the zine/notebook feel
 * from the Direction B v2 prototype.
 */
export function BPaper({ children, className }: BPaperProps) {
  return (
    <div className={cn("relative bg-paper", className)}>
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06] mix-blend-multiply"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern id="bgrain" width="120" height="120" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="0.5" fill="#000" />
            <circle cx="40" cy="60" r="0.4" fill="#000" />
            <circle cx="80" cy="20" r="0.6" fill="#000" />
            <circle cx="100" cy="90" r="0.4" fill="#000" />
            <circle cx="20" cy="100" r="0.5" fill="#000" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bgrain)" />
      </svg>
      <div className="relative">{children}</div>
    </div>
  );
}
