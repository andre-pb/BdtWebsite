export function getBasePath(): string {
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

export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  const [owner, repo] = (process.env.GITHUB_REPOSITORY ?? "").split("/");
  if (process.env.GITHUB_ACTIONS === "true" && owner && repo) {
    const isUserOrgPage = repo.endsWith(".github.io");
    const basePath = isUserOrgPage ? "" : `/${repo}`;
    return `https://${owner}.github.io${basePath}`;
  }

  return "http://localhost:3000";
}

export function assetPath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const base = getBasePath().replace(/\/$/, "");
  return `${base}${normalized}`;
}
