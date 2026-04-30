"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { SearchDialog } from "@/components/layout/SearchDialog";

const items = [
  { href: "/", label: "home" },
  { href: "/posts", label: "writing" },
  { href: "/speaking", label: "speaking" },
  { href: "/about", label: "about + now" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-ink text-paper">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-4 px-5 py-4 sm:px-8 md:px-10">
        <Link
          href="/"
          aria-label="Jeremy Meiss — home"
          className="flex items-center gap-3 rounded-full"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-soft font-display text-base font-bold text-ink">
            jm
          </span>
          <span className="font-display text-xl tracking-tight">jeremy meiss</span>
          <span
            className="reduced-motion-flat hidden font-hand text-lg text-highlight sm:inline-block"
            style={{ transform: "rotate(-3deg)" }}
          >
            (jerdog)
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <nav aria-label="Primary" className="flex items-center gap-1">
            {items.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3 py-2 text-sm transition-colors sm:px-4",
                    active
                      ? "bg-accent-soft text-ink font-medium"
                      : "text-paper hover:bg-paper/10",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <SearchDialog />
        </div>
      </div>
    </header>
  );
}
