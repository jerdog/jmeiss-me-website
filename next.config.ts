import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Security headers applied to every Next.js-rendered route.
  //
  // We also set these in `netlify.toml`, but Netlify's [[headers]] block only
  // covers static assets — the @netlify/plugin-nextjs runtime that serves
  // /, /posts/<slug>, /index.xml, etc. ignores them. Setting headers here
  // routes them through Next.js itself so dynamic pages get the full set.
  async headers() {
    const securityHeaders = [
      {
        key: "X-Content-Type-Options",
        value: "nosniff",
      },
      {
        key: "X-Frame-Options",
        value: "SAMEORIGIN",
      },
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
      },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
      },
      {
        key: "Cross-Origin-Opener-Policy",
        value: "same-origin",
      },
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
    ];
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      // Some inbound links use the singular /post/:slug
      {
        source: "/post/:slug",
        destination: "/posts/:slug",
        permanent: true,
      },
      // Hugo's empty /categories archive — defensive map to /tags
      {
        source: "/categories/:tag",
        destination: "/tags/:tag",
        permanent: true,
      },
      {
        source: "/posts/developer-experience-essential-devops-success",
        destination: "/posts/devex-essential-devops-success",
        permanent: true,
      },
    ];
  },
};

export default withMDX(nextConfig);
