import { coffee } from "@/content/coffee";
import { cn } from "@/lib/cn";

export function CoffeeLog() {
  return (
    <div className="panel-box">
      <div className="panel-heading">
        <h2 className="panel-title">the coffee log</h2>
        <span className="hand-note">— in the cup, lately</span>
      </div>

      {coffee.length === 0 ? (
        <p className="empty-state-body-spaced">
          Brewing notes will appear here. Mostly Kansas City roasters, mostly pour-over.
        </p>
      ) : (
        <ul>
          {coffee.map((entry, i) => (
            <li
              key={`${entry.roaster}-${entry.origin}-${i}`}
              className={cn(
                "coffee-log__item",
                i < coffee.length - 1 && "coffee-log__item--bordered",
              )}
            >
              <div className="coffee-log__row">
                <p className="coffee-log__title">
                  {entry.roaster} <span className="coffee-log__origin">· {entry.origin}</span>
                </p>
                <p className="coffee-log__method">{entry.method}</p>
              </div>
              <p className="coffee-log__note">“{entry.note}”</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
