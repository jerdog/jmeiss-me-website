import { coffee } from "@/content/coffee";
import { cn } from "@/lib/cn";

export function CoffeeLog() {
  return (
    <div className="border border-ink bg-card px-6 py-5">
      <div className="mb-3 flex items-baseline gap-2">
        <h2 className="font-display text-2xl md:text-3xl">the coffee log</h2>
        <span className="font-hand text-lg text-muted">— in the cup, lately</span>
      </div>

      {coffee.length === 0 ? (
        <p className="mt-2 text-sm text-ink-soft">
          Brewing notes will appear here. Mostly Kansas City roasters, mostly pour-over.
        </p>
      ) : (
        <ul>
          {coffee.map((entry, i) => (
            <li
              key={`${entry.roaster}-${entry.origin}-${i}`}
              className={cn(
                "py-3",
                i < coffee.length - 1 ? "border-b border-dashed border-paper-deep" : "",
              )}
            >
              <div className="flex items-baseline justify-between gap-2">
                <p className="font-display text-base leading-tight">
                  {entry.roaster}{" "}
                  <span className="italic text-warm">· {entry.origin}</span>
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                  {entry.method}
                </p>
              </div>
              <p className="mt-1 font-hand text-base text-accent">“{entry.note}”</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
