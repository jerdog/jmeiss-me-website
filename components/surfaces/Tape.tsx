import { cn } from "@/lib/cn";

interface TapeProps {
  children: React.ReactNode;
  rotation?: number;
  /** Tape color. Use one of the design tokens for AA contrast. */
  color?: "highlight" | "warm" | "accent-soft" | "card";
  /** Color of the text on the tape. */
  textColor?: "ink" | "paper";
  className?: string;
  style?: React.CSSProperties;
}

const colorMap: Record<NonNullable<TapeProps["color"]>, string> = {
  highlight: "tape--highlight",
  warm: "tape--warm",
  "accent-soft": "tape--accent-soft",
  card: "tape--card",
};

const textColorMap: Record<NonNullable<TapeProps["textColor"]>, string> = {
  ink: "",
  paper: "tape--text-paper",
};

/**
 * A washi-tape-style sticker label. Inline-block, rotated, with a subtle
 * drop shadow. Rotation is honored when `prefers-reduced-motion` is "no-preference"
 * — it will be flattened automatically by the global CSS rule.
 */
export function Tape({
  children,
  rotation = -2,
  color = "highlight",
  textColor = "ink",
  className,
  style,
}: TapeProps) {
  return (
    <span
      className={cn("tape reduced-motion-flat", colorMap[color], textColorMap[textColor], className)}
      style={{ transform: `rotate(${rotation}deg)`, ...style }}
    >
      {children}
    </span>
  );
}
