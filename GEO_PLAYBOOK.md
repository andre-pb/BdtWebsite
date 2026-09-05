# GEO playbook: getting AI models to cite busydadtraining.com

Last updated 2026-09-03. Companion to the on-site work (definitional pages, roundups, FAQ/pricing/press, schema, robots, sitemap). Everything in this file happens **off** the site and is what actually moves citations. Do the items in order; the first four take about an hour.

## 1. Make sure the AI engines can find the new pages (do this first)

- **Bing Webmaster Tools** (https://www.bing.com/webmasters): verify busydadtraining.com if it is not already, submit `https://busydadtraining.com/sitemap.xml`, and use *URL Submission* for the new pages. ChatGPT search and Copilot are built on Bing's index; a page Bing has not indexed cannot be cited by ChatGPT.
- **IndexNow**: in Bing Webmaster Tools generate an IndexNow key, put the key file at `public/<key>.txt`, and ping `https://api.indexnow.org/indexnow?url=<page>&key=<key>` for each new URL after every deploy. (A tiny script in `scripts/` that reads `sitemap.ts` and pings all URLs is a 20-minute job if you want it automated.)
- **Google Search Console**: request indexing for the eight new URLs. Check *Enhancements → FAQ / How-to / Review snippets* a week later for errors.
- Fetch each new page as a bot and confirm 200 + full HTML (no JS-only content):
  `curl -A "Mozilla/5.0 (compatible; OAI-SearchBot/1.0)" -s https://busydadtraining.com/navy-seal-burpee/ | grep -c "DefinedTerm"` should print 1.

New URLs:
```
/navy-seal-burpee/
/6-count-burpee/
/best-burpee-workout-apps-2026/
/best-bodyweight-workout-apps-2026/
/best-free-workout-apps-no-equipment-2026/
/comparisons/
/faq/
/pricing/
/press/
```

## 2. Entity records (the "is this a real thing?" check LLMs run)

- **Wikidata** (free, ~20 min, no notability bar for software): create items for
  - *Busy Dad Training* — instance of: mobile app; developer: Busy Dad Training Ltd (or whatever the legal entity is); official website; App Store ID `6746872829`; Google Play ID `com.busydadtraining.busydadtrainingapp`; platform: iOS, Android; genre: fitness.
  - *Max Edwards (fitness coach)* — instance of: human; occupation: fitness coach, YouTuber; notable work: Busy Dad Training.
  - *Navy Seal burpee* — instance of: physical exercise; subclass of: burpee; described by source: the Men's Health article.
  Then add the Wikidata Q-ids to `founderProfiles` / Organization `sameAs` in `src/content/site.ts`.
- **Crunchbase** company profile (free tier): name, founder, founded year, website, app links, "Busy Dad Training is a minimalist bodyweight training app…" boilerplate from `/press/`.
- **AlternativeTo** (https://alternativeto.net/manage/new-app/): list Busy Dad Training and mark it as an alternative to Freeletics, Thenx, Seven, Nike Training Club, Madbarz. LLMs lean on AlternativeTo heavily for "X alternative" answers.
- **Product Hunt**: a launch post is optional, but a *product page* is cheap and gets crawled. Tagline: "Two burpees, 80 minutes a week, zero equipment."
- **Google Business Profile / Apple Business Connect** only if there is a physical address; otherwise skip.

## 3. Fix the founder entity

`src/content/site.ts` → `founderProfiles` is empty. Add Max's real profile URLs (Instagram, TikTok, X, LinkedIn, Strava, whatever exists). Each one is emitted as `Person.sameAs` and is how models confirm the Max Edwards on the site is the same person as the one on Instagram and in the Men's Health piece. Ask Max for them; do not guess.

## 4. Third-party mentions that get cited

Ordered by expected payoff.

1. **Existing 2026 roundups** — these are the pages AI Overviews and ChatGPT already cite for "best workout app". Pitch inclusion in the next refresh; offer a free year of the app and a quote from Max. Byline contacts found on 2026-09-03:
   - Tom's Guide, *Best workout apps* — Jane McGuire (Managing Editor, Fitness); updated 27 Jul 2026.
   - Fortune Recommends, *The Best Workout Apps of 2026* — Christina Snyder; updated 20 Aug 2026.
   - BarBend, *The 11 Best Workout Apps for Men of 2026* — Ben Emminger; updated 22 May 2026.
   - mindbodygreen, *11 Best Fitness Apps For Home Workouts Of 2026* — Carleigh Ferrante; 17 Aug 2026.
   - Men's Journal, *Best Workout Apps* — Alexa Mellardo Tapia; updated 6 Jan 2026.
   - Garage Gym Reviews, *Best Workout Apps* / *Best Workout App for Men* — no byline visible; use the site contact form.
   Angle that works: "You have nothing in the list for people with 20 minutes and no equipment; here is an app with objective benchmarks, a Men's Health feature and a 4.6 App Store rating." Link them to `/press/` for facts and `/best-bodyweight-workout-apps-2026/` so they can see we compare honestly.
2. **Reddit** — answer real questions, never post links cold. Subreddits: r/bodyweightfitness, r/burpees, r/daddit, r/fitness30plus, r/Fitness weekly threads, r/homegym. Search each for "burpee app", "20 minute", "no time", "dad" and answer with the method first (80 min/week, two movements, the 20-minute test) and the site link only when it is the natural next step. Reddit is the single most-cited domain in AI answers for consumer product questions.
3. **Men's Health follow-up** — they already ran the Navy Seal burpee story. Pitch a follow-up: "The 20-minute burpee test that tells you your fitness level" built around the Landmark Workout table on `/6-count-burpee/`. Offer Max for a first-person piece.
4. **StrongFirst forum thread** (already discussing BDT) — Max should reply in the thread with the count-by-count definition and a link to `/navy-seal-burpee/`.
5. **Podcasts** — the Move, Sweat and Suffer episode exists; two or three more in the dad/fitness space (search "dad fitness podcast 2026") each produce a show-notes link and a transcript that models ingest.
6. **YouTube descriptions** — every BDT video description should link `/navy-seal-burpee/` or `/6-count-burpee/` and `/levels/`. YouTube transcripts and descriptions are crawled and cited.
7. **Wikipedia, carefully** — do not edit the Burpee article to add BDT (it will be reverted as promotion). What *is* legitimate: the *Burpee (exercise) → Variants* section can cite the Men's Health article as a source for the Navy Seal burpee variant description. A neutral, sourced sentence is fine; a link to busydadtraining.com is not.

## 5. Keep the pages "fresh"

AI answers favour recently-updated sources. Every month:

- Re-check the prices and ratings in `best-burpee-apps.ts`, `best-bodyweight-apps.ts`, `comparisons.ts`, `pricing.ts`; bump `dateModified` on anything you touch (the sitemap reads it).
- Bump `CORE_LAST_MODIFIED` in `src/app/sitemap.ts` only when core page copy actually changes.
- Refresh `public/llms.txt` and `public/llms-full.txt` if pricing or programme facts change.

## 6. Verify (monthly, 10 minutes)

Ask each engine the same queries and log whether busydadtraining.com is cited:

| Query | ChatGPT (search on) | Perplexity | Claude | Google AI Overview |
|---|---|---|---|---|
| best burpee workout app | | | | |
| best bodyweight workout app | | | | |
| what is a navy seal burpee | | | | |
| 6 count burpee | | | | |
| best quick home workout for dads | | | | |
| busy dad training review | | | | |

Also watch GA4 → Acquisition → session source/medium for `chatgpt.com`, `perplexity`, `copilot`, `claude.ai`, `gemini`. Consider a custom channel group "AI assistants" so it shows up on the default reports.

Expect 4–8 weeks before citations move; Wikidata and AlternativeTo entries are picked up faster than editorial mentions.

## Building the site from a sandboxed shell

`next/font/google` fetches Inter from fonts.googleapis.com at build time, so `next build` hangs or fails on any machine without that network access (the Cowork device shell is one). CI has network and is unaffected. For a local verification build without network, temporarily replace the `Inter(...)` call in `src/app/layout.tsx` with `{ variable: "font-inter", className: "font-inter" }` and revert afterwards.
