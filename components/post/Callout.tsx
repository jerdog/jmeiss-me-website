import { cn } from "@/lib/cn";

interface CalloutProps {
  children: React.ReactNode;
  variant?: "note" | "warn" | "tip";
  title?: string;
  className?: string;
}

const variantClass: Record<NonNullable<CalloutProps["variant"]>, { box: string; label: string }> = {
  note: { box: "content-callout--note", label: "content-callout__label--note" },
  warn: { box: "content-callout--warn", label: "content-callout__label--warn" },
  tip: { box: "content-callout--tip", label: "content-callout__label--tip" },
};

export function Callout({ children, variant = "note", title, className }: CalloutProps) {
  const cls = variantClass[variant];
  const label = title ?? variant;
  return (
    <aside aria-label={label} className={cn("content-callout", cls.box, className)}>
      <p className={cn("content-callout__label", cls.label)}>{title ?? variant}</p>
      <div>{children}</div>
    </aside>
  );
}
