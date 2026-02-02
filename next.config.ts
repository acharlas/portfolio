import type { NextConfig } from "next";
import { ASSET_PREFIX, BASE_PATH } from "./lib/base-path";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: BASE_PATH,
  assetPrefix: ASSET_PREFIX,
  reactStrictMode: true,
  images: {
    unoptimized: true, // Required for static export
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
