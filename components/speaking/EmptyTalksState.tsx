import { siteConfig } from "@/content/site";

export function EmptyTalksState() {
  return (
    <div className="empty-state empty-state--speaking">
      <p className="empty-state-title">Talk list is being assembled.</p>
      <p className="empty-state-body">
        I&apos;ve given a stack of conference talks, podcasts, and panels — they&apos;ll show up
        here once I finish porting the back catalog.
      </p>
      <p className="empty-state-footer">
        In the meantime,{" "}
        <a href={`mailto:${siteConfig.person.email}`} className="text-link">
          email me about a speaking slot
        </a>
        .
      </p>
    </div>
  );
}
