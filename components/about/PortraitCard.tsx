import Image from "next/image";
import { siteConfig } from "@/content/site";

export function PortraitCard() {
  const { person } = siteConfig;
  return (
    <div
      className="reduced-motion-flat hard-shadow-ink border border-ink bg-card p-3"
      style={{ transform: "rotate(-1deg)" }}
    >
      <div className="relative aspect-[4/5] bg-paper-deep">
        <Image
          src={person.portrait}
          alt={`Portrait of ${person.name}`}
          fill
          sizes="(min-width: 768px) 480px, 100vw"
          className="object-cover"
          priority
        />
      </div>
      <p className="mt-3 text-center font-hand text-xl text-warm">
        {person.portraitCaption} · 2025
      </p>
    </div>
  );
}
