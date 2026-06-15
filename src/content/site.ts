import { assetPath, getSiteUrl } from "@/lib/base-path";

export const analytics = {
  googleAnalyticsId: "G-LLVGVMFPHH",
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
    alt: "Busy Dad Training logo — minimalist fitness for fathers",
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
  title: "Busy Dad Training: Short Home Workout App for Men",
  description:
    "Busy Dad Training: a short home workout app for men from £9.99/month or £99.99/year — two bodyweight movements, 20-minute sessions, 80 minutes a week. No gym required.",
  keywords: [
    "busy dad workout app",
    "short home workout app for men",
    "bodyweight training",
    "home workout for dads",
    "20 minute workout for men",
    "burpee workout app",
    "fitness app for men",
    "no equipment workout app",
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
  label: "Best home workout apps (2026)",
  href: "/best-short-home-workout-apps-for-men-2026/",
} as const;

export const footerComparisonLinks = [
  { label: "Freeletics vs BDT", href: "/comparisons/freeletics-vs-busy-dad-training/" },
  { label: "Boostcamp vs BDT", href: "/comparisons/boostcamp-vs-busy-dad-training/" },
  { label: "Thenx vs BDT", href: "/comparisons/thenx-vs-busy-dad-training/" },
] as const;

export const appStores = {
  appStoreUrl: "https://apps.apple.com/us/app/busy-dad-training/id6746872829",
  googlePlayUrl:
    "https://play.google.com/store/apps/details?id=com.busydadtraining.busydadtrainingapp&hl=en_GB",
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
  headline: "Busy Dad",
  headlineAccent: "Training",
  description:
    "Build strength, fitness and consistency with a short home workout app designed for busy dads. A progressive bodyweight programme — no gym, no commute, no excuses.",
  backgroundImage: assetPath("/photos/burpee-photo-1.jpg"),
  backgroundImageAlt:
    "Busy dad performing a bodyweight burpee during a minimalist home workout",
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
  value: 2_784_095,
  valueSuffix: "+",
  label: "burpees logged on the app",
  caption: "And counting. Every single rep, by dads who showed up.",
} as const;

export const philosophy = {
  eyebrow: "Core Philosophy",
  title: "Zero friction fitness.",
  description:
    "We removed everything that gets in the way of working out. What remains is a brutally effective, incredibly simple system. Forget complex programming. We focus purely on mastering the Burpee. High volume, simple execution.",
  guideLink: {
    label: "Compare the best short home workout apps for men (2026)",
    href: "/best-short-home-workout-apps-for-men-2026/",
  },
  image: assetPath("/images/Busy_Dad%20Large.webp"),
  imageAlt:
    "Busy dad training coach demonstrating bodyweight squat form during a home workout",
} as const;

export const appScreenshots = {
  timer: {
    src: assetPath("/photos/Timer_Screenshot.jpeg"),
    width: 1206,
    height: 2483,
    alt: "Busy Dad Training app 20-minute AMRAP timer for bodyweight burpee workouts",
  },
  levels: {
    src: assetPath("/photos/levels_Screenshot.jpeg"),
    width: 1206,
    height: 2498,
    alt: "Busy Dad Training app level screen showing Landmark Workout progression",
  },
  community: {
    src: assetPath("/photos/Community_Screenshot.PNG"),
    width: 1206,
    height: 2622,
    alt: "Busy Dad Training app community feed where busy dads share workout wins",
  },
} as const;

export const program = {
  eyebrow: "The Program",
  title: "Structured for consistency.",
  description:
    "Set a timer, do the work, get back to your family. The app tracks your volume in strict 20-minute windows. Start where you are. The system automatically steps you up from Level 1 to Level 4 as your conditioning improves.",
  movements: [
    { label: "Movement A", value: "6-Count Burpee" },
    { label: "Movement B", value: "Bodyweight Squat" },
  ],
  protocol: "20 Min AMRAP",
} as const;

export const levels = {
  eyebrow: "Clear Path Forward",
  title: "Know exactly where you stand.",
  description:
    "No guesswork. You pass a benchmark, you move to the next level. The app tells you what to do every single day based on your current tier. Start at Level 1 and progress all the way to mastery.",
  cards: [
    { num: "1", title: "Foundation", status: "Completed", variant: "active" as const },
    { num: "2", title: "Conditioning", status: "In Progress", variant: "inProgress" as const },
    { num: "3", title: "Advanced", status: "Locked", variant: "locked" as const },
  ],
} as const;

export const community = {
  eyebrow: "The Busy Dad Army",
  title: "You're not doing this alone.",
  description:
    "See what the army is up to, share your wins, and stay accountable with dads who get it. The app connects you to a global community built on showing up.",
} as const;

export const appShowcaseSteps = [
  {
    id: "program",
    sectionId: "program",
    headingId: "program-heading",
    eyebrow: program.eyebrow,
    title: program.title,
    description: program.description,
    screenshot: appScreenshots.timer,
    icon: "clock" as const,
    background: "#FFFFFF",
    mockupFirst: true,
  },
  {
    id: "levels",
    sectionId: "levels-preview",
    headingId: "levels-heading",
    eyebrow: levels.eyebrow,
    title: levels.title,
    description: levels.description,
    screenshot: appScreenshots.levels,
    icon: "chart" as const,
    background: "#F8FAFC",
    mockupFirst: false,
  },
  {
    id: "community",
    sectionId: "community-preview",
    headingId: "community-heading",
    eyebrow: community.eyebrow,
    title: community.title,
    description: community.description,
    screenshot: appScreenshots.community,
    icon: "users" as const,
    background: "#FFFFFF",
    mockupFirst: true,
  },
] as const;

export const youtube = {
  channelName: "BusyDad Training",
  channelHandle: "@BusyDadTraining",
  url: "https://www.youtube.com/@BusyDadTraining",
} as const;

export const testimonials = {
  eyebrow: "From the Busy Dad Army",
  title: "In Their Own Words.",
  description:
    "Real practitioners on what 80 minutes a week has done for them.",
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
  title: "Ready to put in the work?",
  description:
    "Join thousands of busy dads who stopped overcomplicating fitness and started getting results with 80 minutes a week.",
} as const;

export const newsletter = {
  label: "Get training tips in your inbox",
  placeholder: "you@email.com",
  button: "Subscribe",
  buttonSubmitting: "Subscribing…",
  disclaimer: "No spam. Unsubscribe anytime.",
  success: "You're in. Check your inbox soon.",
  successConfirm: "Almost there — check your inbox to confirm your subscription.",
  error: "Something went wrong. Please try again.",
} as const;

export const cta = {
  getApp: "Get the App",
} as const;
