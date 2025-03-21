import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    loader: "akamai",
    path: "/portfolio",
  },
};

export default nextConfig;
