# Busy Dad Training Website

Marketing landing page for the Busy Dad Training app. Built with **Next.js 15**, **React 19**, and **TypeScript**. Statically exported for **GitHub Pages**.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # outputs static site to out/
npm run start    # serve production build locally
```

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to your live URL for correct SEO metadata.

## Editing content

| What to change | File |
|----------------|------|
| Headlines, copy, links | `src/content/site.ts` |
| Brand colors | `src/constants/colors.ts` |
| Section layout | `src/components/home/` |
| SEO title & description | `src/content/site.ts` → `seo` |

## GitHub Pages deployment

1. Push this repo to GitHub
2. In **Settings → Pages**, set source to **GitHub Actions**
3. Push to `main` — the workflow in `.github/workflows/deploy.yml` builds and deploys automatically

For project sites (`username.github.io/RepoName`), the base path is detected automatically in CI from `GITHUB_REPOSITORY`.

For a custom domain or `username.github.io` root repo, set `NEXT_PUBLIC_BASE_PATH=` (empty) in your workflow or `.env.local`.

## Project structure

```
src/
├── app/           # Next.js routes, layout, SEO (sitemap, robots)
├── components/    # UI split by layout, home sections, shared ui
├── constants/     # Colors and shared styles
├── content/       # Editable site copy
└── lib/           # Utilities and SEO helpers
```
