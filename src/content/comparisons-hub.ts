import { bestHomeWorkoutAppsPage } from "@/content/best-home-workout-apps";
import { bestBurpeeAppsPage } from "@/content/best-burpee-apps";
import { bestBodyweightAppsPage } from "@/content/best-bodyweight-apps";
import { bestFreeNoEquipmentAppsPage } from "@/content/best-free-no-equipment-apps";
import { freeleticsComparison, boostcampComparison, thenxComparison } from "@/content/comparisons";

export const comparisonsHubPage = {
  path: "/comparisons/",
  datePublished: "2026-09-03",
  dateModified: "2026-09-05",
  seo: {
    title: "Busy Dad Training vs Other Workout Apps: Comparisons, Roundups and Alternatives",
    description:
      "Every comparison in one place: Busy Dad Training vs Freeletics, Thenx and Boostcamp head-to-head, our 2026 roundups of the best burpee, bodyweight and short home workout apps, and honest notes on when another app is the better choice.",
    keywords: [
      "busy dad training vs",
      "busy dad training alternatives",
      "freeletics alternative",
      "thenx alternative",
      "boostcamp alternative",
      "nike training club alternative",
      "best home workout app comparison",
      "workout app comparison 2026",
    ],
  },
  hero: {
    eyebrow: "Comparisons",
    title: "Busy Dad Training vs the rest",
    intro:
      "We compare ourselves to other apps honestly, because a subscriber who wanted a different kind of app cancels in week two. Every page below says where the other app wins as clearly as where we do. Prices and store facts are re-checked whenever a page is updated.",
  },
  headToHead: {
    title: "Head-to-head comparisons",
    items: [
      { label: "Freeletics vs Busy Dad Training", href: freeleticsComparison.path, summary: "AI-generated HIIT variety versus a fixed two-movement programme." },
      { label: "Thenx vs Busy Dad Training", href: thenxComparison.path, summary: "Calisthenics skill progressions (with a bar) versus floor-only burpee mastery." },
      { label: "Boostcamp vs Busy Dad Training", href: boostcampComparison.path, summary: "A marketplace of gym programmes versus one 80-minute-a-week bodyweight system." },
    ],
  },
  roundups: {
    title: "Roundups: the best apps in 2026",
    items: [
      { label: bestBurpeeAppsPage.seo.title, href: bestBurpeeAppsPage.path, summary: "Six burpee-first apps compared: programmes, counters and 30-day challenges." },
      { label: bestBodyweightAppsPage.seo.title, href: bestBodyweightAppsPage.path, summary: "Eight no-equipment apps, including which ones quietly need a pull-up bar." },
      { label: bestFreeNoEquipmentAppsPage.seo.title, href: bestFreeNoEquipmentAppsPage.path, summary: "What is really free in seven no-equipment apps, and when paying is worth it." },
      { label: bestHomeWorkoutAppsPage.seo.title, href: bestHomeWorkoutAppsPage.path, summary: "Short-session home workout apps for men, from seven-minute habits to 20-minute programmes." },
    ],
  },
  alternatives: {
    title: "Looking for an alternative to…",
    intro:
      "If you are leaving another app, here is the honest one-paragraph version of whether Busy Dad Training is the right place to land.",
    items: [
      {
        id: "freeletics-alternative",
        app: "Freeletics",
        text:
          "Busy Dad Training is a good Freeletics alternative if what you want is less: fewer exercises, a fixed 20-minute session, a weekly cap, and a benchmark that tells you where you stand. It is the wrong alternative if you loved the variety; you will get two movements and nothing else. Price is the other difference: £9.99/month against Coach from around $34.99.",
        href: freeleticsComparison.path,
      },
      {
        id: "thenx-alternative",
        app: "Thenx",
        text:
          "Come to Busy Dad Training from Thenx if you do not have a bar, do not want to chase skills, and would rather measure fitness as reps per 20 minutes. Stay with Thenx if the muscle-up or handstand is the goal; we do not train them.",
        href: thenxComparison.path,
      },
      {
        id: "boostcamp-alternative",
        app: "Boostcamp",
        text:
          "Boostcamp is for people with a gym and 45–90 minutes. Busy Dad Training is for people with a floor and 20. If your barbell programme has stalled because life got busy, this is the alternative built for exactly that situation.",
        href: boostcampComparison.path,
      },
      {
        id: "nike-training-club-alternative",
        app: "Nike Training Club",
        text:
          "Nike Training Club is free and excellent, and if you are consistent with it you do not need us. Busy Dad Training is the alternative when following along stops working and you want a programme with targets, levels and a community that notices when you miss a week.",
        href: bestBodyweightAppsPage.path,
      },
      {
        id: "seven-alternative",
        app: "Seven (7 Minute Workout)",
        text:
          "Seven is the best app for a seven-minute habit. Busy Dad Training is the step up when seven minutes has stopped producing change: 20 minutes, four times a week, with a rep target that rises as you do. Many practitioners keep Seven for travel days.",
        href: bestHomeWorkoutAppsPage.path,
      },
    ],
  },
} as const;
