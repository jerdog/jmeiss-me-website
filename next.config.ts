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
        source: "/categories",
        destination: "/tags",
        permanent: true,
      },
    ];
  },
};

export default withMDX(nextConfig);
