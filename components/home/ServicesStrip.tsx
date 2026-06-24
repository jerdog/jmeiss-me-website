import Link from "next/link";
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
                {service.title}
              </p>
              <p className={isMiddle ? "service-card__body--dark" : "service-card__body--light"}>
                {service.body}
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
