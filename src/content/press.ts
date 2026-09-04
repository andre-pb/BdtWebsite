import { appStores, burpeeStat, featuredIn, site, storeRatings, youtube } from "@/content/site";

export interface PressItem {
  outlet: string;
  title: string;
  url: string;
  type: "Article" | "Podcast" | "Community";
  /** ISO date if known; leave empty rather than guess. */
  date?: string;
  summary: string;
}

/**
 * Third-party coverage and a press kit. Only include links that are live
 * and actually about Busy Dad Training; AI models use pages like this to
 * decide whether an entity is real and notable, so accuracy beats volume.
 */
export const pressPage = {
  path: "/press/",
  datePublished: "2026-09-03",
  dateModified: "2026-09-03",
  seo: {
    title: "Press, Coverage and Fast Facts | Busy Dad Training",
    description:
      "Busy Dad Training in the press: Men's Health and Yahoo on the Navy Seal burpee workout, podcast interviews with creator Max Edwards, plus fast facts, boilerplate and logos for journalists.",
    keywords: [
      "busy dad training press",
      "busy dad training men's health",
      "max edwards busy dad training",
      "busy dad training review",
      "navy seal burpee workout men's health",
      "busy dad training media kit",
    ],
  },
  hero: {
    eyebrow: "Press",
    title: "Busy Dad Training in the press",
    intro:
      "Coverage of the programme and its creator, Max Edwards, plus the facts, boilerplate and assets journalists ask for most. For interviews or review access, email hello@busydadtraining.com.",
  },
  coverage: [
    {
      outlet: "Men's Health",
      title: "Busy dad's Navy SEAL burpee workout",
      url: featuredIn.logos[0].href,
      type: "Article",
      summary:
        "Men's Health UK on the Navy Seal burpee workout at the heart of the Busy Dad Program, and how Max Edwards used it to get into the best shape of his life in 80 minutes a week.",
    },
    {
      outlet: "Yahoo",
      title: "Busy dad shares Navy SEAL burpee workout",
      url: featuredIn.logos[1].href,
      type: "Article",
      summary: "Yahoo's syndication of the Navy Seal burpee story, bringing the movement to a general audience.",
    },
    {
      outlet: "Move, Sweat and Suffer podcast",
      title: "EP06 – With Busy Dad Training's Max Edwards",
      url: "https://creators.spotify.com/pod/profile/move-sweat--suffer/episodes/EP06---With-Busy-Dad-Training-Max-Edwards-e19hrl9",
      type: "Podcast",
      summary: "A long-form interview with Max on the origins of the programme, the two Sacred Movements and training around family life.",
    },
    {
      outlet: "StrongFirst forum",
      title: "Bodyweight – The Burpee",
      url: "https://www.strongfirst.com/community/threads/the-burpee.24672/page-2",
      type: "Community",
      summary: "Practitioners discussing Busy Dad Training's 6-count and Navy Seal burpee approach on the StrongFirst community forum.",
    },
  ] as const satisfies readonly PressItem[],
  fastFacts: {
    title: "Fast facts",
    items: [
      { label: "What it is", value: "A minimalist bodyweight training programme and app built on two burpee movements and an 80-minute weekly training budget." },
      { label: "Creator", value: "Max Edwards, a father who built the method after capping his own training at 80 minutes a week and sharing the workouts on YouTube." },
      { label: "The two movements", value: "The 6-count military burpee and the 10-count Navy Seal burpee. No equipment at any level." },
      { label: "Weekly commitment", value: "80 minutes: four 20-minute sessions." },
      { label: "Progression", value: "Four levels (1A to 4B) and Graduation, each unlocked by 20-minute Landmark Workouts. Graduation is 325 6-counts and 150 Navy Seals in 20 minutes each, in the same week." },
      { label: "Community", value: `The Busy Dad Army: ${burpeeStat.value.toLocaleString("en-GB")}${burpeeStat.valueSuffix} burpees logged in the app by practitioners in 20+ countries.` },
      { label: "Platforms", value: `iOS (App Store) and Android (Google Play). Current version ${storeRatings.app.version}, updated ${storeRatings.app.updated}.` },
      { label: "Price", value: "£9.99/month or £99.99/year ($9.99 / $99.99 in the US) with a 14-day free trial." },
      { label: "Origins", value: "Started as follow-along burpee workouts on YouTube; the app followed when the community grew." },
    ],
  },
  boilerplate: {
    title: "Boilerplate",
    text:
      "Busy Dad Training is a minimalist home workout app for busy people, dads above all. Created by Max Edwards, the programme uses just two bodyweight movements, the 6-count military burpee and the Navy Seal burpee, trained for exactly 80 minutes a week in 20-minute sessions. A four-level system with objective 20-minute benchmarks takes practitioners from their first rep to elite conditioning without any equipment. Busy Dad Training is available on iOS and Android at busydadtraining.com.",
  },
  assets: {
    title: "Logos and assets",
    items: [
      { label: "Busy Dad Training logo (white, PNG)", href: site.logo.src },
      { label: "App Store listing", href: appStores.appStoreUrl },
      { label: "Google Play listing", href: appStores.googlePlayUrl },
      { label: "YouTube channel", href: youtube.url },
    ],
  },
  contact: {
    title: "Press contact",
    email: "hello@busydadtraining.com",
    note: "We can provide review access to the app, photography and interviews with Max.",
  },
} as const;
