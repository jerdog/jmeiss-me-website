import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Inter, Caveat, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { siteConfig } from "@/content/site";

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-hand",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.title}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.person.name, url: siteConfig.url }],
  creator: siteConfig.person.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.title,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.person.twitter,
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/index.xml",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.webmanifest",
};

// themeColor / viewport must live in the dedicated viewport export in Next 15.
// Using the dark ink color matches the sticky Nav bar so the address bar
// blends into the chrome on mobile, and gives Lighthouse a passing
// themed-omnibox audit.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0b0d10" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0d10" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${dmSerifDisplay.variable} ${inter.variable} ${caveat.variable} ${jetbrainsMono.variable}`}
    >
      <body
        className="body-shell"
        // Netlify deploy previews inject a `<div data-netlify-deploy-id>`
        // outside `</html>` which the browser hoists into <body>. React then
        // sees an unexpected child during hydration and throws #418. The drawer
        // is preview-only and harmless, so suppressing on the body is correct.
        // Production won't have anything injected.
        suppressHydrationWarning
      >
        <a
          href="#main"
          className="skip-link"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" data-pagefind-body>
          {children}
        </main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
