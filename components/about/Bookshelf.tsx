import { reading, type Book } from "@/content/reading";
import { cn } from "@/lib/cn";

const colors = [
  "bg-accent",
  "bg-accent-deep",
  "bg-ink",
  "bg-accent-soft",
  "bg-highlight",
  "bg-ink-soft",
];

const stateClass: Record<Book["state"], string> = {
  Reading: "text-warm",
  "Re-reading": "text-warm",
  Finished: "text-accent",
  "Up next": "text-muted",
};

export function Bookshelf() {
  return (
    <div className="border border-ink bg-card px-6 py-5">
      <div className="mb-3 flex items-baseline gap-2">
        <h2 className="font-display text-2xl md:text-3xl">the shelf</h2>
        <span className="font-hand text-lg text-muted">— what i&apos;m reading</span>
      </div>

      {reading.length === 0 ? (
        <p className="mt-2 text-sm text-ink-soft">
          Bookshelf currently empty — Jeremy will post titles here as the reading list fills out.
        </p>
      ) : (
        <ul>
          {reading.map((book, i) => (
            <li
              key={book.title}
              className={cn(
                "grid grid-cols-[2rem_1fr_5.5rem] items-baseline gap-3 py-2.5",
                i < reading.length - 1 ? "border-b border-dashed border-paper-deep" : "",
              )}
            >
              <span className={cn("h-8 w-6", colors[i % colors.length])} aria-hidden />
              <span>
                <span className="block font-display text-base leading-tight">{book.title}</span>
                <span className="mt-0.5 block text-xs text-muted">{book.author}</span>
              </span>
              <span
                className={cn(
                  "text-right font-mono text-[10px] uppercase tracking-[0.12em]",
                  stateClass[book.state],
                )}
              >
                {book.state}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
