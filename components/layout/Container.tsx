import { cn } from "@/lib/cn";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Max horizontal width. Default: 1200px (matches the prototype). */
  width?: "narrow" | "default" | "wide" | "full";
  /** Inner padding shorthand. Default page padding is 40px horizontal. */
  padding?: "default" | "tight" | "none";
}

const widths: Record<NonNullable<ContainerProps["width"]>, string> = {
  narrow: "max-w-3xl",
  default: "max-w-[1200px]",
  wide: "max-w-[1400px]",
  full: "max-w-none",
};

const paddings: Record<NonNullable<ContainerProps["padding"]>, string> = {
  default: "px-5 sm:px-8 md:px-10",
  tight: "px-4 md:px-6",
  none: "",
};

export function Container({
  children,
  className,
  width = "default",
  padding = "default",
}: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full", widths[width], paddings[padding], className)}>
      {children}
    </div>
  );
}
