import { assetPath, getSiteUrl } from "@/lib/base-path";

export const analytics = {
  googleAnalyticsId: "G-LLVGVMFPHH",
} as const;

export const site = {
  name: "Busy Dad Training",
  shortName: "BusyDad",
  url: getSiteUrl(),
  copyright: "© 2023 Busy Dad Training. Do the work.",
  logo: {
    src: assetPath("/busy_dad_white_logo_small.png"),
    width: 172,
    height: 87,
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
  title: "Busy Dad Training | Simplicity. Efficiency. Intentionality.",
  description:
    "Busy Dad Training: a minimalist program built around two compound movements and 80 minutes a week. Simplicity, efficiency, intentionality.",
  keywords: [
    "busy dad workout",
    "bodyweight training",
    "home workout for dads",
    "20 minute workout",
    "burpee workout",
    "fitness app",
    "no gym workout",
  ],
  ogImage: assetPath("/photos/burpee-photo-1.jpg"),
} as const;

export const navLinks = [
  { label: "Principles", href: "/principles/" },
  { label: "Movements", href: "/movements/" },
  { label: "Levels", href: "/levels/" },
] as const;

export const appStores = {
  appStoreUrl: "https://apps.apple.com/us/app/busy-dad-training/id6746872829",
  googlePlayUrl:
    "https://play.google.com/store/apps/details?id=com.busydadtraining.busydadtrainingapp&hl=en_GB",
} as const;

export const hero = {
  eyebrow: "The Program",
  headline: "Busy Dad",
  headlineAccent: "Training",
  description:
    "Simplicity. Efficiency. Intentionality. A minimalist program built around two compound movements and a strict 80-minute weekly budget.",
  backgroundImage: assetPath("/photos/burpee-photo-1.jpg"),
} as const;

export const philosophy = {
  eyebrow: "An Introduction",
  title: "The Busy Dad Program.",
  description:
    "The unbelievably simple, effective, and time-efficient training protocol I've been following ever since my daughter was born. It's gotten me into the best shape of my life, and it can do the same for you. No matter your fitness level, if you can find just 80 minutes per week and pledge to fill those minutes with intentional physical training, BDP can work its magic on you the same way it has on me.",
  image: assetPath("/photos/burpee-photo-2.jpg"),
  imageAlt: "Max Edwards, creator of the Busy Dad Program",
} as const;

export const appScreenshots = {
  timer: {
    src: assetPath("/photos/Timer_Screenshot.jpeg"),
    width: 1206,
    height: 2483,
    alt: "Busy Dad Training app timer screen",
  },
  levels: {
    src: assetPath("/photos/levels_Screenshot.jpeg"),
    width: 1206,
    height: 2498,
    alt: "Busy Dad Training app levels screen",
  },
} as const;

export const program = {
  eyebrow: "Four Sessions A Week",
  title: "20 minutes. Two movements.",
  description:
    "Set the timer, do the work, get back to your family. The app tracks your volume in strict 20-minute windows. Four sessions a week — 80 minutes total — and not a single wasted minute.",
  movements: [
    { label: "Movement A", value: "6-Count Burpee" },
    { label: "Movement B", value: "Navy Seal Burpee" },
  ],
  protocol: "20 Min AMRAP",
} as const;

export const levels = {
  eyebrow: "Four Levels & Graduation",
  title: "Know exactly where you stand.",
  description:
    "Every level is unlocked by two Landmark Workouts: one 20-minute 6-count workout, and one 20-minute Navy Seal workout. From Level 1A all the way to Graduation — your training is never aimless.",
  cards: [
    { num: "1", title: "Foundation", status: "Completed", variant: "active" as const },
    { num: "2", title: "Conditioning", status: "In Progress", variant: "inProgress" as const },
    { num: "3", title: "Advanced", status: "Locked", variant: "locked" as const },
  ],
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
] as const;

export const video = {
  eyebrow: "Watch & Train",
  title: "Landmark Workouts in Action.",
  description:
    "Follow-along Landmark Workouts, form breakdowns of the Sacred Movements, and real 20-minute sessions. No fluff, no gimmicks — just the work.",
  channelName: "Busy Dad Training",
  channelHandle: "@BusyDadTraining",
  featuredTitle: "20-Minute Follow-Along Workout",
  featuredDescription:
    "Follow-along session • 6-Count & Navy Seal protocol • No equipment needed",
  featuredVideoId: "ftJ7kR04HvU",
  featuredVideoUrl: "https://www.youtube.com/watch?v=ftJ7kR04HvU",
  youtubeUrl: "https://www.youtube.com/@BusyDadTraining",
} as const;

export const testimonials = {
  eyebrow: "From the Busy Dad Army",
  title: "In Their Own Words.",
  description:
    "Real practitioners on what 80 minutes a week has done for them.",
  quotes: [
    {
      quote:
        "I started exercising more seriously during the first lockdown in 2020 and tried various app-based programs from YouTube — none of them stuck. Ten weeks into the Busy Dad Programme, I've doubled my 6-counts and nearly tripled my Navy Seals. The philosophy fits my life as a busy dad and I'm seeing real physical and emotional improvements.",
      name: "Mike",
      role: "Busy Dad · Wales",
    },
    {
      quote:
        "In January 2021 I quit a 20+ year smoking habit cold turkey and decided I needed to start training. I floundered for months writing my own routines. Then I found the Busy Dad Program — structure and simplicity, presented in a way that's easy to digest. I dove straight in and started seeing palpable results almost immediately.",
      name: "Paul",
      role: "Busy Dad · Oregon",
    },
    {
      quote:
        "Eighty minutes is all I needed to find. The Busy Dad Program is the most honest, no-nonsense protocol I've come across. Two movements. That's it. And that's everything.",
      name: "Daniel",
      role: "Busy Dad · São Paulo",
    },
    {
      quote:
        "The Busy Dad Program cuts through every gimmick. It's a serious training philosophy delivered with humour, conviction, and a deep respect for whoever's doing the work.",
      name: "Burpees Bandit",
      role: "Fitness YouTuber",
    },
  ],
} as const;

export const download = {
  eyebrow: "Start Today",
  title: "Eighty minutes. Two movements.",
  description:
    "That's all the program asks of you. Open the app and pick up where the reading leaves off.",
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
  subscribeYoutube: "Subscribe on YouTube",
} as const;
