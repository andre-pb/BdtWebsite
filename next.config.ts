import type { NextConfig } from "next";
import { getBasePath, getSiteUrl } from "./base-path.config";

const basePath = getBasePath();
const siteUrl = getSiteUrl();

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_SITE_URL: siteUrl,
  },
  outputFileTracingRoot: process.cwd(),
  experimental: {
    optimizeCss: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
