# AGENTS.md — BdtWebsite (Next.js static export, busydadtraining.com)

Rules for every agent, assistant and automated job working in this repository.
Read this before the first edit of each task. `CLAUDE.md` points here.

## Ground rules

- Check `git status` and the current branch before editing. Agent changes go on
  the `agent` branch unless Andre says otherwise. Never force-push, never write to
  `main` yourself; Andre merges, and a push to `main` deploys the live site.
- This is a static export (`output: "export"`): no server code, no `next/image`
  optimisation, no runtime env. Anything dynamic calls the public BDT API from the
  browser. Data-driven behaviour belongs in `src/content/*` and `src/lib/*`.
- Every page must stay crawlable and consistent: `sitemap.ts`, `public/llms.txt`,
  JSON-LD in `src/lib/seo.ts` and the footer links must all agree. When you add or
  materially change a page, update its `dateModified` (or `CORE_LAST_MODIFIED`).
- Facts on the site are marketing claims AI engines quote verbatim. Prices, trial
  length (7 days), review counts and competitor figures must match the source of
  truth in `src/content/site.ts` or a dated, verifiable check. No invented numbers.
- Performance matters on mobile: nothing new loads above the fold unless the hero
  needs it. Heavy libraries load lazily (`src/lib/lazy-motion.ts`); images below
  the fold are lazy, low priority and sized with `srcset`.
- Never commit `.env.local`, `_to_delete/`, or generated snapshots.

## Code standards (apply to every change; confirm each point in your report)

1. **Follow the existing patterns.** Before writing anything, read a neighbouring
   file that does the same kind of thing and match it: file location, naming, data
   shapes, error handling, comment style. Introduce a new pattern only if you
   explain why the existing one does not fit.
2. **Smallest correct change.** Touch only what the task needs. No drive-by
   refactors, reformatting, renames or "improvements" to code you were not asked to
   change. If you spot something worth fixing, list it under "Noticed, not changed".
3. **No dead code.** Remove unused imports, variables, commented-out blocks and any
   debug logging you added. No TODOs without a reference to a task.
4. **Comments explain why, not what.** Add one where the reason is not obvious from
   the code (a workaround, an ordering constraint, a business rule). Do not narrate
   obvious code. Keep the file-header comments this codebase already uses.
5. **It must pass the checks before you say it is done.** Run every command in the
   "Verify before reporting" section below and paste the final lines of each into
   your report. "Should work" is not a status. A failing check is a blocker, not a
   footnote.
6. **Secrets never in code.** Keys, tokens, passwords and connection strings come
   from environment variables, `.env*` files that are git-ignored, GitHub secrets
   or Key Vault. If a value looks like a secret, stop and ask before committing.
7. **Report format.** (a) what changed, as a file list; (b) why; (c) what you ran
   to verify, with output; (d) anything you noticed but did not change; (e) any
   step that needs a human (SQL to run, a deploy, a secret to add), stated
   explicitly with the exact command or text.

## Environments and approvals

- **Agent API + test database** (free to use, no approval needed):
  `https://bdtserverapi-agent-ghd3f8fdhhfqdhb0.eastus2-01.azurewebsites.net/api/`
  This host and the test database behind it exist for agents. You may read and
  write to them freely, with any HTTP method. Several endpoints in this codebase
  write on GET (e.g. `Users/CreateCommunityUsername/{name}`); that is expected and
  needs no exception or approval. Do not ask per request.
- **Production** (`https://api.busydadtraining.com`, the production database,
  RevenueCat, app stores, the live website): read-only. Never write, deploy, grant
  or revoke entitlements, or change configuration without Andre's explicit,
  task-specific approval in that conversation.

## Verify before reporting

```bash
npx tsc --noEmit -p tsconfig.json
npm run lint
npm run build          # must succeed: this is what the deploy runs
git status --porcelain
```

## Cross-repo changes: when a frontend request needs the backend

Most requests come from a frontend developer and are phrased as app or website
changes. Treat the request as the outcome the user wants, not as a boundary:

1. **Work out what the change really needs.** If the app change needs data or
   behaviour the API does not provide, the API change is part of the task. Do it
   in the BusyDadTraining repo (on its `agent` branch) as part of the same piece of
   work, and say so in your report. Do not ship a frontend that calls something
   that does not exist yet.
2. **Exhaust the existing API first.** Before adding an endpoint, read the
   controllers and DTOs and prove the need: which existing endpoint you tried to
   use and exactly why it is insufficient (missing field, wrong shape, missing
   filter). "It was easier to add a new one" is not a reason. Extending an existing
   response with an optional, additive field is preferable to a new endpoint; a new
   endpoint is preferable to changing an existing one.
3. **Older app versions must keep working.** Users do not update immediately, and
   some never do. Every API change must be safe for every app build already in the
   stores: existing routes, verbs, status codes, JSON field names, casing, types,
   nullability and defaults stay exactly as they are. New behaviour goes in a new
   optional field, a new endpoint, or a new controller version (`v2`), never by
   changing what a `v1` response means. Database changes are additive and nullable.
4. **The compatibility tests are the enforcement.** `tests/Bdt.Api.CompatibilityTests`
   in the API repo pins the contracts released app builds depend on. When you add
   or change an endpoint, update or add tests there in the same commit: a
   characterisation test for the old behaviour (prove it still passes) and a test
   for the new one. Run them before you report; CI runs them before deploying the
   agent slot, and a failing run must block the deploy. Never weaken, skip or
   delete a test to get green; if a test blocks you, that is the compatibility
   rule doing its job, so stop and ask.
5. **Order of delivery.** API change (with SQL, if any) is deployable on its own
   before the app change ships; the app change only relies on it once it is live.
   State this ordering in your report so Andre can deploy in the right sequence.
