import Link from "next/link";
import { siteConfig } from "@/content/site";
import { Icon } from "@/components/icons/Icon";
import { iconForSocial } from "@/components/icons/social";
import { isOffSiteHref, offSiteAnchorProps } from "@/lib/off-site-href";

export function Footer() {
  const elsewhere = siteConfig.socials.filter((s) => s.label !== "Email");
  return (
    <footer className="mt-16 bg-ink text-paper">
      <div className="mx-auto grid w-full max-w-[1400px] gap-8 px-5 py-10 sm:px-8 md:grid-cols-3 md:px-10">
        <div>
          <div className="font-hand text-2xl text-highlight">thanks for reading.</div>
          {/* <p className="mt-2 max-w-xs text-xs leading-relaxed text-paper/75">
            this whole thing is hand-built in next.js + plain mdx, deployed on whatever cloud is
            least annoying this week.
          </p> */}
          <p className="mt-4 text-[10px] uppercase tracking-[0.14em] text-accent-soft">
            &copy;{siteConfig.copyright}
          </p>
        </div>

        <div className="text-xs leading-relaxed text-paper/85">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-accent-soft">
            side projects
          </p>
          <ul className="-my-2">
            {siteConfig.sideProjects.map((p) => (
              <li key={p.name}>
                {isOffSiteHref(p.href) ? (
                  <a
                    href={p.href}
                    className="-mx-2 flex rounded-md px-2 py-2 hover:bg-paper/5 hover:text-highlight"
                    {...offSiteAnchorProps(p.href)}
                  >
                    {p.name}
                  </a>
                ) : (
                  <Link
                    href={p.href}
                    className="-mx-2 flex rounded-md px-2 py-2 hover:bg-paper/5 hover:text-highlight"
                  >
                    {p.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          {/* <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-accent-soft">
            built with
          </p>
          <p className="mt-1 text-paper/65">next.js · mdx · tailwind v4</p> */}
        </div>

        <div className="text-xs leading-relaxed text-paper/85">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-accent-soft">
            elsewhere
          </p>
          {/* py-2 + leading-relaxed gives ~48px tap height while keeping the
              tight visual rhythm. Lighthouse flagged the 15–20px links here
              for overlapping tap targets on mobile. */}
          <ul className="-my-2">
            {elsewhere.map((social) => {
              const icon = iconForSocial(social.label);
              return (
                <li key={social.label}>
                  {isOffSiteHref(social.href) ? (
                    <a
                      href={social.href}
                      className="-mx-2 flex items-center gap-2 rounded-md px-2 py-2 hover:bg-paper/5 hover:text-highlight"
                      {...offSiteAnchorProps(social.href, { existingRel: social.rel })}
                    >
                      {icon ? (
                        <Icon
                          icon={icon}
                          size="1em"
                          className="shrink-0 text-accent-soft"
                        />
                      ) : null}
                      <span className="text-paper">{social.label.toLowerCase()}</span>
                      <span className="text-paper/65">{social.handle}</span>
                    </a>
                  ) : (
                    <Link
                      href={social.href}
                      rel={social.rel ?? undefined}
                      className="-mx-2 flex items-center gap-2 rounded-md px-2 py-2 hover:bg-paper/5 hover:text-highlight"
                    >
                      {icon ? (
                        <Icon
                          icon={icon}
                          size="1em"
                          className="shrink-0 text-accent-soft"
                        />
                      ) : null}
                      <span className="text-paper">{social.label.toLowerCase()}</span>
                      <span className="text-paper/65">{social.handle}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
}
