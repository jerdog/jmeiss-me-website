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
  Reading: "bookshelf__state--reading",
  "Re-reading": "bookshelf__state--reading",
  Finished: "bookshelf__state--finished",
  "Up next": "bookshelf__state--next",
};

export function Bookshelf() {
  return (
    <div className="panel-box">
      <div className="panel-heading">
        <h2 className="panel-title">the shelf</h2>
        <span className="hand-note">— what i&apos;m reading</span>
      </div>

      {reading.length === 0 ? (
        <p className="empty-state-body-spaced">
          Bookshelf currently empty — Jeremy will post titles here as the reading list fills out.
        </p>
      ) : (
        <ul>
          {reading.map((book, i) => (
            <li
              key={book.title}
              className={cn(
                "bookshelf__row",
                i < reading.length - 1 && "bookshelf__row--bordered",
              )}
            >
              <span className={cn("bookshelf__spine", colors[i % colors.length])} aria-hidden />
              <span>
                <span className="bookshelf__title">{book.title}</span>
                <span className="bookshelf__author">{book.author}</span>
              </span>
              <span className={stateClass[book.state]}>{book.state}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
