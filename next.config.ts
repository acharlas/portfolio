import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/portfolio",
  assetPrefix: "/portfolio/",
  reactStrictMode: true,
  images: {
    loader: "akamai",
    path: "/portfolio",
    unoptimized: true,
  },
};

export default nextConfig;
