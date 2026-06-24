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
  narrow: "container--narrow",
  default: "container--default",
  wide: "container--wide",
  full: "container--full",
};

const paddings: Record<NonNullable<ContainerProps["padding"]>, string> = {
  default: "container-pad--default",
  tight: "container-pad--tight",
  none: "",
};

export function Container({
  children,
  className,
  width = "default",
  padding = "default",
}: ContainerProps) {
  return (
    <div className={cn("container", widths[width], paddings[padding], className)}>
      {children}
    </div>
  );
}
