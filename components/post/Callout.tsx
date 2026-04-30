import { cn } from "@/lib/cn";

interface CalloutProps {
  children: React.ReactNode;
  variant?: "note" | "warn" | "tip";
  title?: string;
  className?: string;
}

const variantClass: Record<NonNullable<CalloutProps["variant"]>, { box: string; label: string }> = {
  note: { box: "border-accent bg-card", label: "text-accent" },
  warn: { box: "border-warm bg-card", label: "text-warm" },
  tip: { box: "border-ink bg-highlight", label: "text-ink" },
};

export function Callout({ children, variant = "note", title, className }: CalloutProps) {
  const cls = variantClass[variant];
  return (
    <aside
      className={cn(
        "my-6 border-l-4 px-5 py-4 font-body text-base leading-relaxed text-ink-soft",
        cls.box,
        className,
      )}
    >
      <p
        className={cn(
          "mb-1 font-mono text-[10px] uppercase tracking-[0.14em]",
          cls.label,
        )}
      >
        {title ?? variant}
      </p>
      <div>{children}</div>
    </aside>
  );
}
