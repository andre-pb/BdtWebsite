import { assetPath, getSiteUrl } from "@/lib/base-path";
import { generatedStoreRatings } from "@/content/store-ratings.generated";

export const analytics = {
  googleAnalyticsId: "G-LLVGVMFPHH",
  metaPixelId: "1744352980037941",
} as const;

export const site = {
  name: "Busy Dad Training",
  shortName: "BusyDad",
  url: getSiteUrl(),
  copyright: "Busy Dad Training. Do the work.",
  logo: {
    src: assetPath("/busy_dad_white_logo_small.png"),
    width: 172,
    height: 87,
    alt: "Busy Dad Training logo, minimalist fitness for fathers",
  },
  favicon: {
    ico: assetPath("/favicon.ico"),
    png16: assetPath("/favicon-16x16.png"),
    png32: assetPath("/favicon-32x32.png"),
    apple: assetPath("/apple-touch-icon.png"),
    png192: assetPath("/icon-192.png"),
    png512: assetPath("/icon-512.png"),
  },
} as const;

export const seo = {
  title: "Busy Dad Training: 20-Minute Home Workout App for Men",
  description:
    "Busy Dad Training: a 20-minute home workout app for men from £9.99/month or £99.99/year. Two bodyweight burpee movements, four 20-minute sessions, 80 minutes a week. No equipment, no gym. 14-day free trial.",
  keywords: [
    "busy dad workout app",
    "short home workout app for men",
    "bodyweight training",
    "home workout for dads",
    "20 minute workout for men",
    "burpee workout app",
    "fitness app for men",
    "no equipment workout app",
    "20 minute workout app for men",
    "workout app for busy dads",
    "home exercise app for men",
    "no gym workout app",
  ],
  ogImage: assetPath("/photos/burpee-photo-1.jpg"),
} as const;

export const navLinks = [
  { label: "About Max", href: "/about/" },
  { label: "Principles", href: "/principles/" },
  { label: "Movements", href: "/movements/" },
  { label: "Levels", href: "/levels/" },
  { label: "Community", href: "/community/" },
] as const;

export const footerGuideLink = {
  label: "All comparisons",
  href: "/comparisons/",
} as const;

export const footerComparisonLinks = [
  { label: "Best burpee apps (2026)", href: "/best-burpee-workout-apps-2026/" },
  { label: "Best bodyweight apps (2026)", href: "/best-bodyweight-workout-apps-2026/" },
  { label: "Best free no-equipment apps (2026)", href: "/best-free-workout-apps-no-equipment-2026/" },
  { label: "Best home workout apps (2026)", href: "/best-short-home-workout-apps-for-men-2026/" },
  { label: "20-minute workout for busy dads", href: "/20-minute-home-workout-for-busy-dads/" },
  { label: "Freeletics vs BDT", href: "/comparisons/freeletics-vs-busy-dad-training/" },
  { label: "Boostcamp vs BDT", href: "/comparisons/boostcamp-vs-busy-dad-training/" },
  { label: "Thenx vs BDT", href: "/comparisons/thenx-vs-busy-dad-training/" },
] as const;

// Second footer row: the pages that answer "what is / how much / who".
export const footerResourceLinks = [
  { label: "Navy Seal burpee", href: "/navy-seal-burpee/" },
  { label: "6-count burpee", href: "/6-count-burpee/" },
  { label: "Pricing", href: "/pricing/" },
  { label: "FAQ", href: "/faq/" },
  { label: "Press", href: "/press/" },
  { label: "llms.txt", href: "/llms.txt" },
] as const;

export const appStores = {
  appStoreUrl: "https://apps.apple.com/us/app/busy-dad-training/id6746872829",
  googlePlayUrl:
    "https://play.google.com/store/apps/details?id=com.busydadtraining.busydadtrainingapp&hl=en_GB",
} as const;

export const promo = {
  code: "BUSYDAD30",
  headline: "1 month free trial",
  description:
    "Follow this link, or copy the code and use it when you sign up in the app.",
  // Last day the promo is shown (inclusive). Hidden from the day after.
  lastDay: "2026-07-17",
  appleRedeemUrl:
    "https://apps.apple.com/redeem?ctx=offercodes&id=6746872829&code=BUSYDAD30",
} as const;

export const appPricing = {
  monthly: {
    amount: 9.99,
    currency: "GBP",
    display: "£9.99/month",
  },
  annual: {
    amount: 99.99,
    currency: "GBP",
    display: "£99.99/year",
    effectiveMonthly: "~£8.33/month when billed annually",
  },
  summary: "from £9.99/month or £99.99/year (~£8.33/month billed annually)",
  tableLabel: "From £9.99/mo or £99.99/yr",
} as const;

export const hero = {
  headline: "Short Home Workouts for Busy Dads",
  headlineAccent: "in 20 Minutes",
  description:
    "Get strong and stay fit with a short home workout app built for busy dads. Just your bodyweight. No gym, no commute, no excuses.",
  backgroundImage: assetPath("/photos/burpee-photo-1.webp"),
  backgroundImageAlt:
    "Busy dad performing a bodyweight burpee during a minimalist home workout",
  // One subtle line instead of stacked pills. Keep the literal "Best for:"
  // phrase in the rendered HTML: AI/GEO tools extract it and the weekly SEO
  // auditor checks for it.
  useCaseLine:
    "Best for: dads who want elite fitness that fits around family life. 2 movements, 4 × 20 minutes a week.",
} as const;

export const featuredIn = {
  label: "As featured in",
  logos: [
    {
      name: "Men's Health",
      href: "https://www.menshealth.com/uk/fitness/a70766848/busy-dad-navy-seal-burpee-workout/",
      src: assetPath("/Logos/mens_health.svg"),
      alt: "Men's Health logo featuring Busy Dad Training burpee workout",
      width: 608,
      height: 125,
      maxHeight: 24,
    },
    {
      name: "Yahoo",
      href: "https://uk.style.yahoo.com/busy-dad-shares-navy-seal-000000961.html",
      src: assetPath("/Logos/Yahoo_Logo_0.svg"),
      alt: "Yahoo logo featuring Busy Dad Training Navy Seal workout",
      width: 1000,
      height: 277,
      maxHeight: 30,
    },
  ],
} as const;

export const burpeeStat = {
  eyebrow: "The Busy Dad Army",
  value: 3_600_000,
  valueSuffix: "+",
  label: "burpees logged on the app",
  caption: "And counting. Every single rep, by dads who showed up.",
} as const;

// Static fallback for the live country count (GET /api/v1/CountryStats).
// Shown only if the API call fails, so keep it a safe undercount.
export const countryStat = {
  value: 20,
  valueSuffix: "+",
  label: "countries with dads putting in the work",
} as const;

// Live star ratings from both stores (GET /api/v1/StoreRatings).
//
// The numbers below come from store-ratings.generated.ts, which the prebuild
// script refreshes from the API on every build. <StoreRatings /> shows them
// on first paint and then swaps in the live API values, so they only drift
// when the API is unreachable.
export const storeRatings = {
  apple: {
    label: "App Store",
    rating: generatedStoreRatings.apple.rating,
    ratingCount: generatedStoreRatings.apple.ratingCount,
    storeUrl: appStores.appStoreUrl,
  },
  google: {
    label: "Google Play",
    rating: generatedStoreRatings.google.rating,
    ratingCount: generatedStoreRatings.google.ratingCount,
    storeUrl: appStores.googlePlayUrl,
  },
  combined: generatedStoreRatings.combined,
  // Live App Store version and release date, shown as an
  // actively-maintained signal. Same refresh path as the ratings.
  app: generatedStoreRatings.app,
} as const;

// schema.org AggregateRating for the app, across both stores. These have to
// be build-time values because Google does not reliably index JSON-LD
// injected by client-side JavaScript. That is why the prebuild script exists.
export const appStoreRating = {
  ratingValue: String(generatedStoreRatings.combined.rating),
  reviewCount: generatedStoreRatings.combined.ratingCount,
  bestRating: "5",
  worstRating: "1",
  storeUrl: "https://apps.apple.com/gb/app/busy-dad-training/id6746872829",
} as const;

export const philosophy = {
  eyebrow: "Core Philosophy",
  title: "What makes Busy Dad Training different?",
  description:
    "We stripped out everything that gets in the way of your workout. What's left is a simple system that works. No complex plans. You master the burpee. High reps, simple form.",
  guideLink: {
    label: "Compare the best short home workout apps for men (2026)",
    href: "/best-short-home-workout-apps-for-men-2026/",
  },
  // Rendered as a small "Read next" row under the guide link. Linking the
  // deep guides from the home page is what gets them crawled and ranked.
  moreGuides: [
    { label: "Best burpee workout apps", href: "/best-burpee-workout-apps-2026/" },
    { label: "Best bodyweight workout apps", href: "/best-bodyweight-workout-apps-2026/" },
    { label: "Best free no-equipment apps", href: "/best-free-workout-apps-no-equipment-2026/" },
    { label: "What is a Navy Seal burpee?", href: "/navy-seal-burpee/" },
    { label: "What is a 6-count burpee?", href: "/6-count-burpee/" },
    { label: "The 20-minute workout for dads", href: "/20-minute-home-workout-for-busy-dads/" },
  ],
  image: assetPath("/images/Busy_Dad%20Large.webp"),
  imageAlt:
    "Busy dad training coach demonstrating bodyweight squat form during a home workout",
} as const;

export const appScreenshots = {
  home: {
    src: assetPath("/photos/home-dark.jpg"),
    width: 578,
    height: 1280,
    alt: "Busy Dad Training app home screen with the weekly plan, rep targets and 80-minute weekly goal",
  },
  train: {
    src: assetPath("/photos/train-dark.jpg"),
    width: 578,
    height: 1280,
    alt: "Busy Dad Training app train screen with a guided 20-minute 6-count workout ready to start",
  },
  levels: {
    src: assetPath("/photos/levels-dark.jpg"),
    width: 578,
    height: 1280,
    alt: "Busy Dad Training app levels screen showing the program roadmap from Level 1A to Graduation",
  },
  stats: {
    src: assetPath("/photos/stats-dark.jpg"),
    width: 578,
    height: 1280,
    alt: "Busy Dad Training app stats screen with personal records, total burpees and weekly progress charts",
  },
  community: {
    src: assetPath("/photos/community-dark.jpg"),
    width: 578,
    height: 1280,
    alt: "Busy Dad Training app community screen with leaderboard rank and the Busy Dad Army feed",
  },
} as const;

// The app tour: one step per tab of the app. Shown as a pinned scroll
// showcase on desktop and a swipeable carousel on phones. Question-style
// titles on purpose: they double as headings AI/search tools latch onto.
export const appShowcaseSteps = [
  {
    id: "program",
    sectionId: "program",
    headingId: "program-heading",
    eyebrow: "The Program",
    title: "How does the 20-minute workout system work?",
    description:
      "Plan your own week: four 20-minute sessions, rep targets for each movement, and an 80-minute weekly goal. Targets update each week based on your results and effort.",
    screenshot: appScreenshots.home,
    icon: "calendar" as const,
    background: "#FFFFFF",
  },
  {
    id: "train",
    sectionId: "train-preview",
    headingId: "train-heading",
    eyebrow: "The Work",
    title: "How do I start a workout?",
    description:
      "One tap starts today's guided workout with the target set from your plan. The timer and rep counting are handled for you, and a custom timer covers extra sessions.",
    screenshot: appScreenshots.train,
    icon: "clock" as const,
    background: "#F8FAFC",
  },
  {
    id: "levels",
    sectionId: "levels-preview",
    headingId: "levels-heading",
    eyebrow: "Clear Path Forward",
    title: "How do you progress through the levels?",
    description:
      "Pass both landmark workouts to level up. The roadmap runs from Level 1A to Graduation, so you always know where you stand and what comes next.",
    screenshot: appScreenshots.levels,
    icon: "map" as const,
    background: "#FFFFFF",
  },
  {
    id: "stats",
    sectionId: "stats-preview",
    headingId: "stats-heading",
    eyebrow: "Proof It Works",
    title: "How do I know it's working?",
    description:
      "Personal records, total burpees, streaks and weekly charts. No guessing: the numbers show the work adding up.",
    screenshot: appScreenshots.stats,
    icon: "chart" as const,
    background: "#F8FAFC",
  },
  {
    id: "community",
    sectionId: "community-preview",
    headingId: "community-heading",
    eyebrow: "The Busy Dad Army",
    title: "Who else is doing this programme?",
    description:
      "Your rank for the week, month and year, a live leaderboard, and a feed of dads sharing wins and keeping each other honest.",
    screenshot: appScreenshots.community,
    icon: "users" as const,
    background: "#FFFFFF",
  },
] as const;

export const youtube = {
  channelName: "BusyDad Training",
  channelHandle: "@BusyDadTraining",
  url: "https://www.youtube.com/@BusyDadTraining",
} as const;

// Max's personal profiles. Each URL added here is emitted as schema.org
// Person.sameAs, which is how search engines and LLMs confirm that the
// "Max Edwards" on this site is the same person as the one on Instagram,
// X, TikTok, LinkedIn, etc. Add the full profile URLs, e.g.
// "https://www.instagram.com/busydadtraining/".
export const founderProfiles: readonly string[] = [];

export const testimonials = {
  eyebrow: "From the Busy Dad Army",
  title: "What do real users say about Busy Dad Training?",
  description:
    "Real dads on what 80 minutes a week has done for them.",
  quotes: [
    {
      quote:
        "In January 2021 I quit a 20+ year smoking habit cold turkey and decided I needed to start training. I floundered for months writing my own routines. Then I found the Busy Dad Program — structure and simplicity, presented in a way that's easy to digest. I dove straight in and started seeing palpable results almost immediately.",
      name: "Paul",
      role: "Busy Dad · Oregon",
    },
    {
      quote:
        "The Busy Dad program brought discipline, structure, resilience, and a stronger sense of body awareness into my life. It also dramatically improved my push-up capacity and overall work capacity.",
      name: "Ossi",
      role: "Practitioner",
    },
    {
      quote:
        "Starting the Busy Dad Training Programme and then working directly with Max has been one of, if not the best positive step I've made for myself. It's the antidote to a 'fitness' industry that's so full of noise. The system is time efficient, simple (but not easy) and dare I say enjoyable. If you learn the movements correctly, commit to the plan and put in the work, you will see significant and timely results. Very highly recommended.",
      name: "Lyndon",
      role: "Practitioner",
    },
  ],
} as const;

export const download = {
  eyebrow: "Start Today",
  title: "How do I get started with Busy Dad Training?",
  description:
    "Join thousands of busy dads who keep fitness simple and get results with 80 minutes a week.",
} as const;

export const newsletter = {
  label: "Get training tips in your inbox",
  placeholder: "you@email.com",
  button: "Subscribe",
  buttonSubmitting: "Subscribing…",
  disclaimer: "No spam. Unsubscribe anytime.",
  success: "You're in. Check your inbox soon.",
  successConfirm: "Almost there. Check your inbox to confirm your subscription.",
  error: "Something went wrong. Please try again.",
} as const;

export const newsletterPopup = {
  eyebrow: "From Max",
  title: "Training tips for busy dads",
  description: "Short, practical advice, no fluff. Join the list.",
  dismissLabel: "No thanks",
  image: {
    src: assetPath("/levels-images/Level%202.webp"),
    alt: "Busy Dad Training practitioner progressing through a workout",
  },
} as const;

export const cta = {
  getApp: "Get the App",
} as const;
