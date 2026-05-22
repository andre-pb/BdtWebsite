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
  title: "Busy Dad Training | Simple Bodyweight Training for Busy Dads",
  description:
    "Build strength, fitness and consistency with a progressive bodyweight programme designed around real life. 20-minute workouts. No gym, no commute, no excuses.",
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
  eyebrow: "The Method",
  headline: "Simple training for",
  headlineAccent: "busy dads.",
  description:
    "Build strength, fitness and consistency with a progressive bodyweight programme designed around real life. No gym, no commute, no excuses.",
  backgroundImage: assetPath("/photos/burpee-photo-1.jpg"),
} as const;

export const philosophy = {
  eyebrow: "Core Philosophy",
  title: "Zero friction fitness.",
  description:
    "We removed everything that gets in the way of working out. What remains is a brutally effective, incredibly simple system. Forget complex programming. We focus purely on mastering the Burpee and the Squat. High volume, simple execution.",
  image: assetPath("/photos/burpee-photo-2.jpg"),
  imageAlt: "Busy Dad Training coach demonstrating bodyweight exercise form",
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
  eyebrow: "Video Content",
  title: "Watch the Method in Action.",
  description:
    "Daily workout demonstrations, form breakdowns, and real training sessions. No fluff, just effective training content you can follow along with.",
  channelName: "BusyDad Training",
  channelHandle: "@BusyDadTraining",
  featuredTitle: "20-Minute Full Body Workout",
  featuredDescription:
    "Follow-along session • Burpee & Squat protocol • No equipment needed",
  featuredVideoId: "ftJ7kR04HvU",
  featuredVideoUrl: "https://www.youtube.com/watch?v=ftJ7kR04HvU",
  youtubeUrl: "https://www.youtube.com/@BusyDadTraining",
} as const;

export const download = {
  eyebrow: "Start Today",
  title: "Ready to put in the work?",
  description:
    "Join thousands of busy dads who stopped overcomplicating fitness and started getting results with 20 minutes a day.",
} as const;

export const cta = {
  getApp: "Get the App",
  subscribeYoutube: "Subscribe on YouTube",
} as const;
