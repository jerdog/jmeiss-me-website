import { InlineMarkdown } from "@/components/content/InlineMarkdown";

interface CoffeeLogProps {
  text?: string;
}

export function CoffeeLog({ text }: CoffeeLogProps) {
  return (
    <div className="panel-box">
      <div className="panel-heading">
        <h2 className="panel-title">the coffee log</h2>
        <span className="hand-note">— in the cup, lately</span>
      </div>

      {text ? (
        <p className="about-panel__body">
          <InlineMarkdown>{text}</InlineMarkdown>
        </p>
      ) : (
        <p className="empty-state-body-spaced">
          Brewing notes will appear here. Mostly Kansas City roasters, mostly pour-over.
        </p>
      )}
    </div>
  );
}
