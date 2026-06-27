import { InlineMarkdown } from "@/components/content/InlineMarkdown";

interface BookshelfProps {
  text?: string;
}

export function Bookshelf({ text }: BookshelfProps) {
  return (
    <div className="panel-box">
      <div className="panel-heading">
        <h2 className="panel-title">the shelf</h2>
        <span className="hand-note">— what i&apos;m reading</span>
      </div>

      {text ? (
        <p className="about-panel__body">
          <InlineMarkdown>{text}</InlineMarkdown>
        </p>
      ) : (
        <p className="empty-state-body-spaced">
          Bookshelf currently empty — Jeremy will post titles here as the reading list fills out.
        </p>
      )}
    </div>
  );
}
