import Image from "next/image";
import { siteConfig } from "@/content/site";

export function PortraitCard() {
  const { person } = siteConfig;
  return (
    <div className="portrait-card reduced-motion-flat" style={{ transform: "rotate(-1deg)" }}>
      <div className="portrait-card__frame">
        <Image
          src={person.portrait}
          alt={`Portrait of ${person.name}`}
          fill
          sizes="(min-width: 768px) 480px, 100vw"
          className="portrait-card__image"
          priority
        />
      </div>
      <p className="portrait-card__caption">
        {person.portraitCaption} · 2025
      </p>
    </div>
  );
}
