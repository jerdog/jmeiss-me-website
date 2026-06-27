import { InlineMarkdown } from "@/components/content/InlineMarkdown";
import type { Drink } from "@/content/drinking";
import { cn } from "@/lib/cn";

interface DrinkingPanelProps {
  /** Quick snapshot from the /now “Drinking” item. */
  snapshot?: string;
  drinks: Drink[];
}

function DrinkEntry({ drink }: { drink: Drink }) {
  if (drink.kind === "coffee") {
    return (
      <>
        <div className="drinking-log__row">
          <p className="drinking-log__title">
            {drink.roaster}{" "}
            <span className="drinking-log__detail">· {drink.origin}</span>
          </p>
          <p className="drinking-log__meta">{drink.method}</p>
        </div>
        <p className="drinking-log__note">
          “
          <InlineMarkdown>{drink.note}</InlineMarkdown>
          ”
        </p>
      </>
    );
  }

  return (
    <>
      <div className="drinking-log__row">
        <p className="drinking-log__title">
          {drink.producer}{" "}
          <span className="drinking-log__detail">· {drink.name}</span>
        </p>
        <p className="drinking-log__meta">
          {drink.style}
          {drink.serving ? ` · ${drink.serving}` : null}
        </p>
      </div>
      <p className="drinking-log__note">
        “
        <InlineMarkdown>{drink.note}</InlineMarkdown>
        ”
      </p>
    </>
  );
}

export function DrinkingPanel({ snapshot, drinks }: DrinkingPanelProps) {
  const hasSnapshot = Boolean(snapshot);
  const hasDrinks = drinks.length > 0;

  return (
    <div className="panel-box">
      <div className="panel-heading">
        <h2 className="panel-title">what i&apos;m drinking</h2>
        <span className="hand-note">— coffee, whiskey, and whatever else</span>
      </div>

      {hasSnapshot ? (
        <p className={cn("about-panel__body", hasDrinks && "about-panel__body--spaced")}>
          <InlineMarkdown>{snapshot!}</InlineMarkdown>
        </p>
      ) : null}

      {hasDrinks ? (
        <ul className={hasSnapshot ? "drinking-log__list" : undefined}>
          {drinks.map((drink, i) => (
            <li
              key={
                drink.kind === "coffee"
                  ? `${drink.roaster}-${drink.origin}-${i}`
                  : `${drink.producer}-${drink.name}-${i}`
              }
              className={cn(
                "drinking-log__item",
                i < drinks.length - 1 && "drinking-log__item--bordered",
              )}
            >
              <DrinkEntry drink={drink} />
            </li>
          ))}
        </ul>
      ) : null}

      {!hasSnapshot && !hasDrinks ? (
        <p className="empty-state-body-spaced">
          Drinking notes will appear here — whatever&apos;s in the cup or the glass lately.
        </p>
      ) : null}
    </div>
  );
}
