import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://busydadtraining.com";

const validDestinations = ["/", "/principles/", "/movements/", "/levels/"];

/** Keep in sync with src/content/redirects.ts */
const legacyRedirects = [
  {
    from: "/the-two-sacred-movements/",
    to: "/movements/",
    title: "The Two Sacred Movements",
  },
  {
    from: "/the-two-movements/",
    to: "/movements/",
    title: "The Two Movements",
  },
  {
    from: "/principles-of-the-busy-dad-program/",
    to: "/principles/",
    title: "Principles of the Busy Dad Program",
  },
  {
    from: "/program-levels/",
    to: "/levels/",
    title: "Program Levels",
  },
  {
    from: "/the-four-levels-of-the-busy-dad-program/",
    to: "/levels/",
    title: "The Four Levels of the Busy Dad Program",
  },
  {
    from: "/home/",
    to: "/",
    title: "Home",
  },
  {
    from: "/coming-soon/",
    to: "/",
    title: "Coming Soon",
  },
];

function normalizePath(value) {
  if (!value.startsWith("/")) {
    throw new Error(`Path must start with /: ${value}`);
  }
  return value.endsWith("/") ? value : `${value}/`;
}

function resolveDestination(pathValue, redirectMap) {
  let current = pathValue;
  const visited = new Set();

  while (redirectMap.has(current)) {
    if (visited.has(current)) {
      throw new Error(`Redirect loop detected at ${current}`);
    }
    visited.add(current);
    current = redirectMap.get(current);
  }

  return current;
}

function validateRedirects(redirects) {
  const redirectMap = new Map();

  for (const redirect of redirects) {
    const from = normalizePath(redirect.from);
    const to = normalizePath(redirect.to);

    if (from === to) {
      throw new Error(`Redirect source and destination are the same: ${from}`);
    }

    if (redirectMap.has(from)) {
      throw new Error(`Duplicate redirect source: ${from}`);
    }

    redirectMap.set(from, to);
  }

  for (const redirect of redirects) {
    const from = normalizePath(redirect.from);
    const finalDestination = resolveDestination(from, redirectMap);

    if (!validDestinations.includes(finalDestination)) {
      throw new Error(
        `Redirect ${from} resolves to invalid destination: ${finalDestination}`,
      );
    }
  }

  for (const destination of redirectMap.values()) {
    if (redirectMap.has(destination)) {
      throw new Error(`Redirect chain detected: ${destination} is also a redirect source`);
    }
  }

  return redirectMap;
}

function renderRedirectHtml({ title, to }) {
  const canonicalUrl = `${siteUrl}${to}`;

  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="utf-8" />
  <title>${title} — Busy Dad Training</title>
  <link rel="canonical" href="${canonicalUrl}" />
  <meta http-equiv="refresh" content="0; url=${to}" />
  <meta name="robots" content="noindex" />
  <script>window.location.replace("${to}");</script>
</head>
<body>
  <p>This page has moved. <a href="${to}">Click here if you are not redirected.</a></p>
</body>
</html>
`;
}

function slugFromPath(pathValue) {
  return pathValue.replace(/^\/|\/$/g, "");
}

async function main() {
  validateRedirects(legacyRedirects);

  for (const redirect of legacyRedirects) {
    const slug = slugFromPath(redirect.from);
    const outputDir = path.join(publicDir, slug);
    const outputFile = path.join(outputDir, "index.html");

    await mkdir(outputDir, { recursive: true });
    await writeFile(outputFile, renderRedirectHtml(redirect), "utf8");
    console.log(`Wrote redirect stub: ${redirect.from} -> ${redirect.to}`);
  }

  console.log(`Generated ${legacyRedirects.length} redirect stubs in public/`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
