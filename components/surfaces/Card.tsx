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
  paper: "card--paper",
  ink: "card--ink",
  highlight: "card--highlight",
  card: "card--card",
};

const shadowClass: Record<NonNullable<CardProps["shadow"]>, string> = {
  none: "",
  ink: "card-shadow--ink",
  "ink-sm": "card-shadow--ink-sm",
  "ink-md": "card-shadow--ink-md",
  warm: "card-shadow--warm",
  accent: "card-shadow--accent",
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
      className={cn("card reduced-motion-flat", variantClass[variant], shadowClass[shadow], className)}
      style={rotation ? { transform: `rotate(${rotation}deg)`, ...style } : style}
      {...rest}
    >
      {children}
    </Component>
  );
}
