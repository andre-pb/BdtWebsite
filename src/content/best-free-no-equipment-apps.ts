import { assetPath } from "@/lib/base-path";
import { appPricing, appStores } from "@/content/site";
import type { GuideData } from "@/content/guide-types";

/**
 * "Best Free Workout Apps With No Equipment (2026)".
 *
 * Busy Dad Training is not free, and this page says so in the first
 * paragraph. The page exists because the query is high-intent and the honest
 * answer ("these are free; here is when paying is worth it") is exactly what
 * search engines and AI assistants want to cite. Store facts read on
 * 2026-09-03 from the US listings.
 */
export const bestFreeNoEquipmentAppsPage = {
  path: "/best-free-workout-apps-no-equipment-2026/",
  datePublished: "2026-09-05",
  dateModified: "2026-09-05",
  breadcrumbLabel: "Best Free No-Equipment Workout Apps 2026",
  listName: "Best Free Workout Apps With No Equipment (2026)",
  seo: {
    title: "Best Free Workout Apps With No Equipment (2026): 7 Apps Compared Honestly",
    description:
      "The best free workout apps that need no equipment in 2026: Nike Training Club, FitOn, Caliber, Seven, BeStronger Burpee Workout and Burpee by Telum Apps, plus what you get from Busy Dad Training's 14-day trial. What is actually free, what is behind a paywall, and when paying is worth it.",
    keywords: [
      "best free workout apps no equipment",
      "free workout app no equipment",
      "free home workout app",
      "free bodyweight workout app",
      "no equipment workout app free",
      "free workout apps for men",
      "workout app free trial",
      "free burpee app",
    ],
  },
  hero: {
    eyebrow: "2026 Guide",
    title: "Best Free Workout Apps With No Equipment (2026)",
    intro:
      "\"Free\" on an app store listing can mean anything from genuinely free to a three-day trial. We checked seven no-equipment apps for what you can actually use without paying, what sits behind the paywall, and whether the free version is enough to get fit on. One of them, our own, is not free at all; it is here because the comparison would be dishonest without it.",
    backgroundImage: assetPath("/photos/burpee-photo-1.webp"),
  },
  quickAnswer:
    "The best free workout app with no equipment in 2026 is Nike Training Club: completely free, no ads, no in-app purchases, with an equipment-free filter. FitOn is the best free class library, Caliber has the best free strength programming, and Seven's free tier is enough for a seven-minute daily habit. Busy Dad Training is not free (14-day trial, then £9.99/month) and is the pick if you want a measurable programme rather than a library.",
  intro: {
    title: "What \"free\" actually means in each app",
    paragraphs: [
      "There are three kinds of free. Truly free: Nike Training Club has no purchases at all. Free tier: FitOn, Caliber, Seven and Freeletics give you a real, usable subset and sell the rest. Free with ads: the small burpee timers (BeStronger, Telum Apps) are free because they show adverts. All of these work with no equipment; only Nike Training Club and FitOn need you to filter for it.",
      "Then there is the trial model, which is what Busy Dad Training uses: the whole app for 14 days, then a subscription. That is not a free app and we do not pretend otherwise. It is on this list so you can see what you get for the money against what you get for nothing, and decide with the facts in front of you.",
      "Every app here is on iOS and Android unless the platform column says otherwise, and every rating was read from the US store listing on the date at the top of the page.",
    ],
  },
  criteria: {
    title: "How we compared these apps",
    items: [
      { label: "What is really free", description: "Can you complete a full, repeatable programme without paying, or only a sample?" },
      { label: "Equipment", description: "Floor-only throughout, or does the free content assume a bar or dumbbells?" },
      { label: "Ads", description: "Whether the free version is ad-supported and how intrusive that is." },
      { label: "Progression", description: "Does anything in the free tier measure whether you are getting fitter?" },
      { label: "Maintenance", description: "A store update in 2025 or 2026." },
    ],
  },
  comparisonColumns: [
    { key: "platforms", label: "Platforms" },
    { key: "focus", label: "What's free" },
    { key: "sessionLength", label: "Session" },
    { key: "price", label: "Paid upgrade" },
  ] as const,
  apps: [
    {
      id: "nike-training-club",
      name: "Nike Training Club",
      websiteUrl: "https://www.nike.com/ntc-app",
      appStoreUrl: "https://apps.apple.com/us/app/nike-training-club-wellness/id301521403",
      googlePlayUrl: "https://play.google.com/store/apps/details?id=com.nike.ntc",
      isOwnProduct: false,
      platforms: "iOS & Android",
      ratingNote: "4.8 (252K ratings, App Store) · 4.4 (373K, Google Play)",
      sessionLength: "5–60 min",
      equipment: "Filter for none",
      focus: "Everything; no purchases exist",
      price: "None",
      summary:
        "Nike Training Club is the only app in this guide that is free in the plain sense: no subscription, no in-app purchases, no ads. It is a large library of trainer-led video workouts and multi-week programmes with an equipment-free filter and a \"20 minutes or less\" category. What it lacks is any form of progression: nothing adapts, and nothing tells you whether you are fitter than last month.",
      pros: ["Completely free with no catch.", "Polished video coaching across every session length.", "Equipment-free filter and short-workout category."],
      cons: ["A library, not a programme; progression is entirely on you.", "Follow-along format cannot be paced to your level.", "Brand-led content, so trainer quality varies by session."],
      bestFor: "Anyone who wants free guided sessions and will manage their own progression.",
    },
    {
      id: "fiton",
      name: "FitOn",
      websiteUrl: "https://fitonapp.com/",
      appStoreUrl: "https://apps.apple.com/us/app/fiton-workouts-fitness-plans/id1442473191",
      isOwnProduct: false,
      platforms: "iOS & Android",
      ratingNote: "4.9 (283K ratings, App Store) · 4.4 (97K, Google Play)",
      sessionLength: "10–45 min classes",
      equipment: "None for most classes",
      focus: "Large class library, live and on demand",
      price: "PRO $19.99–$39.99 (term varies)",
      summary:
        "FitOn's free tier is a huge catalogue of HIIT, strength, yoga and 10-minute quick classes led by well-known trainers, most of them equipment-free. Men's Journal named it the best equipment-free workout app. PRO adds meal plans and some premium content. Like Nike Training Club it is class-style: great for variety and energy, silent on whether you are progressing.",
      pros: ["Very large free class catalogue.", "Highest App Store rating in this guide.", "Live classes and a social feed for accountability."],
      cons: ["No benchmarks or levels.", "PRO upsells are frequent.", "Quality varies across trainers."],
      bestFor: "People who like class energy and want the biggest free library.",
    },
    {
      id: "caliber",
      name: "Caliber",
      websiteUrl: "https://caliberstrong.com/",
      appStoreUrl: "https://apps.apple.com/us/app/caliber-strength-training/id1482405410",
      googlePlayUrl: "https://play.google.com/store/apps/details?id=com.caliberfitness.app",
      isOwnProduct: false,
      platforms: "iOS & Android",
      ratingNote: "4.8 (5.9K ratings, App Store) · 4.5 (4K, Google Play)",
      sessionLength: "30–60 min",
      equipment: "Bodyweight plans available",
      focus: "Coach-designed programmes, logging, lessons",
      price: "Plus from $6/mo; coaching from ~$200/mo",
      summary:
        "Caliber has the most generous free tier of any strength app: coach-designed programmes, an 800+ exercise library, full logging and weekly education, no ads. Bodyweight programmes exist and it runs happily with no gym. Its DNA is strength progression with load, so sessions run longer than 20 minutes and the app expects you to add weights eventually.",
      pros: ["Real programming and progression for free.", "No ads in the free tier.", "Excellent built-in education."],
      cons: ["Bodyweight is supported, not the focus.", "Sessions are 30–60 minutes.", "Premium human coaching is expensive."],
      bestFor: "People who want free, structured strength work and may add weights later.",
    },
    {
      id: "seven",
      name: "Seven – 7 Minute Workout",
      websiteUrl: "https://perigee.se/",
      appStoreUrl: "https://apps.apple.com/us/app/seven-7-minute-workout/id650276551",
      googlePlayUrl: "https://play.google.com/store/apps/details?id=se.perigee.android.seven",
      isOwnProduct: false,
      platforms: "iOS & Android",
      ratingNote: "4.8 (137K ratings, App Store) · 4.7 (113K, Google Play)",
      sessionLength: "7 min",
      equipment: "None",
      focus: "Full-body workout + 7-month challenge",
      price: "7 Club $9.99/mo or $79.99/yr",
      summary:
        "Seven's free tier is a real workout, the classic seven-minute full-body circuit, plus a seven-month challenge that unlocks more as you keep your streak. Animated guides and a choice of voice instructors make it painless to start. The 7 Club subscription opens the full catalogue and personalised plans. It is the best free option for building the habit, and the wrong one for building strength.",
      pros: ["Usable free workout with no equipment.", "Best habit mechanics in the category.", "Both stores rate it 4.7+ from 100K+ reviews."],
      cons: ["Seven minutes is a floor, not a plan.", "Progression is streaks, not standards.", "Most content is behind 7 Club."],
      bestFor: "Starting a daily movement habit when 20 minutes feels like too much.",
    },
    {
      id: "freeletics",
      name: "Freeletics",
      websiteUrl: "https://www.freeletics.com/",
      appStoreUrl: "https://apps.apple.com/us/app/freeletics-workouts-fitness/id654810212",
      googlePlayUrl: "https://play.google.com/store/apps/details?id=com.freeletics.lite",
      isOwnProduct: false,
      platforms: "iOS & Android",
      ratingNote: "4.6 (22K ratings, App Store) · 4.5 (260K, Google Play)",
      sessionLength: "15–45 min",
      equipment: "None required",
      focus: "A handful of workouts; the Coach is paid",
      price: "Coach $34.99–$79.99 (term varies)",
      summary:
        "Freeletics is here as a caution. The free tier gives you a few bodyweight workouts and the exercise library, but the product, the AI Coach that builds and adapts your plan, is paid, and the Google Play listing notes ads. If you want Freeletics, budget for Coach; if you want free, one of the four apps above will serve you better.",
      pros: ["Some genuinely good free bodyweight workouts.", "Large exercise library to browse.", "Very well-known and well-maintained."],
      cons: ["The adaptive Coach, which is the point of the app, is paid.", "Ads on the free tier (Android).", "One of the pricier subscriptions here."],
      bestFor: "People who will pay for Coach; not a free-app pick.",
    },
    {
      id: "bestronger-burpee-workout",
      name: "Burpee Workout by BeStronger",
      websiteUrl: "https://play.google.com/store/apps/details?id=com.shvagerfm.Burpy",
      googlePlayUrl: "https://play.google.com/store/apps/details?id=com.shvagerfm.Burpy",
      isOwnProduct: false,
      platforms: "Android",
      ratingNote: "4.5 (5.8K reviews, 500K+ installs, Google Play)",
      sessionLength: "5–15 min",
      equipment: "None",
      focus: "Timer, levels, history (ad-supported)",
      price: "Small one-off ad removal",
      summary:
        "The most-installed burpee app on Android is free with ads: an interval timer with difficulty levels, reminders and a training history, updated as recently as August 2026. It is a timer, not a programme, and there is no movement standard, but if you already know you want to do burpees and you have an Android phone it costs nothing.",
      pros: ["Free and still maintained.", "Simple: pick a level, press start.", "Largest user base of any burpee-specific app."],
      cons: ["Android only (the iOS version was last updated in 2018).", "Ads.", "No progression beyond the difficulty levels."],
      bestFor: "Android users who want a free burpee timer.",
    },
    {
      id: "busy-dad-training",
      name: "Busy Dad Training",
      websiteUrl: "https://busydadtraining.com/",
      appStoreUrl: appStores.appStoreUrl,
      googlePlayUrl: appStores.googlePlayUrl,
      isOwnProduct: true,
      platforms: "iOS & Android",
      sessionLength: "20 min, 4×/week",
      equipment: "None, ever",
      focus: "Full app for 14 days, then paid",
      price: appPricing.tableLabel,
      summary:
        `Busy Dad Training is not a free app. Every subscription starts with a 14-day trial of the full programme, then it is ${appPricing.summary}. What you are paying for is the thing none of the free apps have: a programme. Two bodyweight burpee movements, four 20-minute sessions a week, weekly rep targets, a 20-minute timer, and a four-level system where the same 20-minute test tells you exactly how fit you are. The method itself is published free on this site and the tutorials are free on YouTube.`,
      pros: ["A complete programme with objective 20-minute benchmarks, not a library.", "Genuinely no equipment at any level.", "The method, movements and level targets are free to read on this site; the app adds the timer, targets and tracking."],
      cons: ["Not free: 14-day trial, then a subscription.", "Two movements only; no variety.", "Demanding at the upper levels."],
      bestFor: "People who have tried the free libraries, drifted, and want a programme that measures progress.",
    },
  ],
  bestForPicks: {
    title: "Quick picks: the best free no-equipment app for…",
    picks: [
      { label: "Best completely free workout app", appId: "nike-training-club", reason: "No purchases, no ads, equipment-free filter." },
      { label: "Best free class library", appId: "fiton", reason: "Huge equipment-free catalogue, live and on demand." },
      { label: "Best free programme with progression", appId: "caliber", reason: "Coach-designed plans and logging at no cost." },
      { label: "Best free daily habit", appId: "seven", reason: "A real seven-minute workout in the free tier." },
      { label: "Best free burpee timer (Android)", appId: "bestronger-burpee-workout", reason: "500K+ installs, updated 2026, free with ads." },
      { label: "Best if you decide to pay", appId: "busy-dad-training", reason: "The only fixed 20-minute programme with benchmarks; 14-day trial first." },
    ],
  },
  whyBdp: {
    title: "When paying beats free",
    paragraphs: [
      "Free libraries fail people in a predictable way: there is nothing to do next. You pick a video, do it, and the app has no opinion about tomorrow. Paid programmes earn their money by removing that decision. Busy Dad Training does it with a fixed 20-minute test at every level and weekly rep targets, so on Tuesday there is one thing to do and a number to beat.",
      "The honest recommendation: install Nike Training Club today, it costs nothing. If in a month you are still opening it, keep going. If you have drifted, take the 14-day Busy Dad Training trial and see whether a programme is what was missing.",
    ],
    internalLinks: [
      { label: "Pricing and the 14-day trial", href: "/pricing/" },
      { label: "Best bodyweight workout apps (2026)", href: "/best-bodyweight-workout-apps-2026/" },
      { label: "The 20-minute workout, free to follow", href: "/20-minute-home-workout-for-busy-dads/" },
      { label: "The four levels", href: "/levels/" },
    ],
  },
  faqs: [
    {
      question: "What is the best free workout app with no equipment?",
      answer:
        "Nike Training Club. It is completely free with no in-app purchases or ads, and its equipment-free filter and \"20 minutes or less\" category make floor-only training easy to find. FitOn is the best free class library, Caliber the best free strength programming, and Seven the best free daily habit.",
    },
    {
      question: "Is Busy Dad Training free?",
      answer:
        "No. The app is free to download and every subscription starts with a 14-day free trial of the full programme, after which it is £9.99/month or £99.99/year. The programme itself, both movements and every level's targets, is published free on busydadtraining.com and the tutorial videos are free on YouTube.",
    },
    {
      question: "Which free workout apps have no ads?",
      answer:
        "Nike Training Club and Caliber's free tier have no ads. FitOn and Seven upsell their paid tiers inside the app but do not run third-party adverts. BeStronger's Burpee Workout and Freeletics' free tier (on Android) show ads.",
    },
    {
      question: "Can I get fit with a free no-equipment app?",
      answer:
        "Yes, if you are consistent and progressive. The limitation of free libraries is that nothing measures progress, so it is up to you to pick harder sessions over time. Caliber's free tier includes real progression; with Nike Training Club or FitOn, keep a simple log and move up a level every few weeks.",
    },
    {
      question: "Is Freeletics free?",
      answer:
        "Only partly. A few bodyweight workouts and the exercise library are free; the AI Coach that builds and adapts your plan is a paid subscription starting around $34.99 depending on term, and the Android free tier shows ads.",
    },
    {
      question: "What is the best free burpee app?",
      answer:
        "On Android, BeStronger's Burpee Workout (free with ads, 500K+ installs, updated 2026). Burpee by Telum Apps is a free Android alternative with a placement test. On iPhone the free options are small counters; BurBur is the best of them if you own an Apple Watch. For a full burpee programme, Busy Dad Training, which is paid after a 14-day trial.",
    },
    {
      question: "Which free apps work with no equipment at all?",
      answer:
        "Nike Training Club (filter for equipment-free), FitOn (most classes), Seven, and the burpee timers are floor-only. Caliber has bodyweight programmes but expects you to add load eventually. Busy Dad Training is floor-only at every level, but it is a paid app.",
    },
  ],
} as const satisfies GuideData;
