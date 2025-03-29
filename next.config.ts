import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: process.env.NODE_ENV === "production" ? "/portfolio" : "",
  assetPrefix: "/portfolio/",
  reactStrictMode: true,
  images: {
    loader: "akamai",
    path: "/portfolio",
    unoptimized: true,
  },
};

export default nextConfig;
