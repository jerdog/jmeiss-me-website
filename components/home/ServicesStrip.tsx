import Link from "next/link";
import { NewTabHint } from "@/components/a11y/NewTabHint";
import { InlineMarkdown } from "@/components/content/InlineMarkdown";
import { Card } from "@/components/surfaces/Card";
import { services } from "@/content/services";
import { isOffSiteHref, offSiteAnchorProps } from "@/lib/off-site-href";

export function ServicesStrip() {
  return (
    <section className="services-strip">
      <h2 className="section-heading-spaced">what i actually do.</h2>
      <div className="services-strip__grid">
        {services.map((service, i) => {
          const isMiddle = i === 1;
          const Inner = (
            <Card variant={isMiddle ? "ink" : "card"} shadow="none" className="service-card">
              <p className={isMiddle ? "service-card__number--dark" : "service-card__number--light"}>
                {service.number}
              </p>
              <p className={isMiddle ? "service-card__title--dark" : "service-card__title--light"}>
                <InlineMarkdown>{service.title}</InlineMarkdown>
              </p>
              <p className={isMiddle ? "service-card__body--dark" : "service-card__body--light"}>
                <InlineMarkdown>{service.body}</InlineMarkdown>
              </p>
            </Card>
          );

          return service.href ? (
            isOffSiteHref(service.href) ? (
              <a
                key={service.number}
                href={service.href}
                className="block"
                {...offSiteAnchorProps(service.href)}
              >
                {Inner}
                <NewTabHint />
              </a>
            ) : (
              <Link key={service.number} href={service.href} className="block">
                {Inner}
              </Link>
            )
          ) : (
            <div key={service.number}>{Inner}</div>
          );
        })}
      </div>
    </section>
  );
}
