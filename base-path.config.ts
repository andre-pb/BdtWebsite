import fs from "node:fs";
import path from "node:path";

function readCustomDomain(): string | null {
  const candidates = ["public/CNAME", "CNAME"];

  for (const candidate of candidates) {
    try {
      const domain = fs.readFileSync(path.join(process.cwd(), candidate), "utf8").trim();
      if (domain && !domain.endsWith(".github.io")) {
        return domain;
      }
    } catch {
      // file doesn't exist
    }
  }

  return null;
}

export function getBasePath(): string {
  if (process.env.NEXT_PUBLIC_BASE_PATH !== undefined) {
    return process.env.NEXT_PUBLIC_BASE_PATH;
  }

  if (readCustomDomain()) {
    return "";
  }

  const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
  const isGithubActions = process.env.GITHUB_ACTIONS === "true";
  const isUserOrgPage = repo.endsWith(".github.io");

  if (isGithubActions && repo && !isUserOrgPage) {
    return `/${repo}`;
  }

  return "";
}

export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  const customDomain = readCustomDomain();
  if (customDomain) {
    return `https://${customDomain}`;
  }

  const [owner, repo] = (process.env.GITHUB_REPOSITORY ?? "").split("/");
  if (process.env.GITHUB_ACTIONS === "true" && owner && repo) {
    const isUserOrgPage = repo.endsWith(".github.io");
    const basePath = isUserOrgPage ? "" : `/${repo}`;
    return `https://${owner}.github.io${basePath}`;
  }

  return "http://localhost:3000";
}
