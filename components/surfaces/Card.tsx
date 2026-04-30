import { cn } from "@/lib/cn";
import type { ElementType } from "react";

interface CardProps<T extends ElementType = "div"> {
  as?: T;
  children: React.ReactNode;
  /** Border + hard shadow style; matches the various card types in the prototype. */
  variant?: "paper" | "ink" | "highlight" | "card";
  shadow?: "none" | "ink" | "ink-sm" | "ink-md" | "warm" | "accent";
  rotation?: number;
  className?: string;
  href?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const variantClass: Record<NonNullable<CardProps["variant"]>, string> = {
  paper: "bg-paper text-ink border border-ink",
  ink: "bg-ink text-paper border border-ink",
  highlight: "bg-highlight text-ink border border-ink",
  card: "bg-card text-ink border border-ink",
};

const shadowClass: Record<NonNullable<CardProps["shadow"]>, string> = {
  none: "",
  ink: "hard-shadow-ink",
  "ink-sm": "hard-shadow-ink-sm",
  "ink-md": "hard-shadow-ink-md",
  warm: "hard-shadow-warm",
  accent: "hard-shadow-accent",
};

/** Boxy card with hard offset shadow — the main surface in Direction B v2. */
export function Card<T extends ElementType = "div">({
  as,
  children,
  variant = "card",
  shadow = "ink",
  rotation,
  className,
  style,
  ...rest
}: CardProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof CardProps>) {
  const Component = (as ?? "div") as ElementType;
  return (
    <Component
      className={cn(
        "reduced-motion-flat relative",
        variantClass[variant],
        shadowClass[shadow],
        className,
      )}
      style={rotation ? { transform: `rotate(${rotation}deg)`, ...style } : style}
      {...rest}
    >
      {children}
    </Component>
  );
}
