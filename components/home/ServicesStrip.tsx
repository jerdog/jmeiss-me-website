import Link from "next/link";
import { Card } from "@/components/surfaces/Card";
import { services } from "@/content/services";

export function ServicesStrip() {
  return (
    <section className="py-8 md:py-10">
      <h2 className="mb-4 font-display text-3xl tracking-tight md:text-4xl">
        what i actually do.
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {services.map((service, i) => {
          const isMiddle = i === 1;
          const Inner = (
            <Card
              variant={isMiddle ? "ink" : "card"}
              shadow="none"
              className="h-full px-5 py-5"
            >
              <p
                className={`font-mono text-[10px] uppercase tracking-[0.16em] ${
                  isMiddle ? "text-highlight" : "text-accent"
                }`}
              >
                {service.number}
              </p>
              <p
                className={`my-2 font-display text-2xl leading-tight ${
                  isMiddle ? "text-paper" : "text-ink"
                }`}
              >
                {service.title}
              </p>
              <p
                className={`text-sm leading-relaxed ${
                  isMiddle ? "text-paper/85" : "text-ink-soft"
                }`}
              >
                {service.body}
              </p>
            </Card>
          );

          return service.href ? (
            <Link key={service.number} href={service.href} className="block">
              {Inner}
            </Link>
          ) : (
            <div key={service.number}>{Inner}</div>
          );
        })}
      </div>
    </section>
  );
}
