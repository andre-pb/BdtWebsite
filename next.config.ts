import type { NextConfig } from "next";

function getBasePath(): string {
  if (process.env.NEXT_PUBLIC_BASE_PATH !== undefined) {
    return process.env.NEXT_PUBLIC_BASE_PATH;
  }

  const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
  const isGithubActions = process.env.GITHUB_ACTIONS === "true";
  const isUserOrgPage = repo.endsWith(".github.io");

  if (isGithubActions && repo && !isUserOrgPage) {
    return `/${repo}`;
  }

  return "";
}

const basePath = getBasePath();

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  outputFileTracingRoot: process.cwd(),
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
