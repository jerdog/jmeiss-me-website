import Link from "next/link";
import { NewTabHint } from "@/components/a11y/NewTabHint";
import { siteConfig } from "@/content/site";
import { Icon } from "@/components/icons/Icon";
import { iconForSocial } from "@/components/icons/social";
import { isOffSiteHref, offSiteAnchorProps } from "@/lib/off-site-href";

export function Footer() {
  const elsewhere = siteConfig.socials.filter((s) => s.label !== "Email");
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div>
          <div className="footer__thanks">thanks for reading.</div>
          <p className="footer__copyright">&copy;{siteConfig.copyright}</p>
        </div>

        <nav aria-label="Side projects" className="footer__column">
          <p className="footer__heading">side projects</p>
          <ul className="footer__list">
            {siteConfig.sideProjects.map((p) => (
              <li key={p.name}>
                {isOffSiteHref(p.href) ? (
                  <a
                    href={p.href}
                    className="footer__link"
                    {...offSiteAnchorProps(p.href)}
                  >
                    {p.name}
                    <NewTabHint />
                  </a>
                ) : (
                  <Link href={p.href} className="footer__link">
                    {p.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Social links" className="footer__column">
          <p className="footer__heading">elsewhere</p>
          <ul className="footer__list">
            {elsewhere.map((social) => {
              const icon = iconForSocial(social.label);
              return (
                <li key={social.label}>
                  {isOffSiteHref(social.href) ? (
                    <a
                      href={social.href}
                      className="footer__link--social"
                      {...offSiteAnchorProps(social.href, { existingRel: social.rel })}
                    >
                      {icon ? (
                        <Icon icon={icon} size="1em" className="footer__icon" />
                      ) : null}
                      <span className="footer__label">{social.label.toLowerCase()}</span>
                      <span className="footer__handle">{social.handle}</span>
                      <NewTabHint />
                    </a>
                  ) : (
                    <Link
                      href={social.href}
                      rel={social.rel ?? undefined}
                      className="footer__link--social"
                    >
                      {icon ? (
                        <Icon icon={icon} size="1em" className="footer__icon" />
                      ) : null}
                      <span className="footer__label">{social.label.toLowerCase()}</span>
                      <span className="footer__handle">{social.handle}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
