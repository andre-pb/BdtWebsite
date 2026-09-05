import { assetPath } from "@/lib/base-path";
import { appPricing, appStores } from "@/content/site";
import type { GuideData } from "@/content/guide-types";

/**
 * "Best Burpee Workout Apps (2026)".
 *
 * Every store figure below was read from the US App Store / Google Play
 * listing on 2026-09-03. Ratings drift; the dateModified on the page tells
 * readers (and AI models) when the numbers were checked. Keep the honest
 * cons in: a roundup that only praises its own product does not get cited.
 */
export const bestBurpeeAppsPage = {
  path: "/best-burpee-workout-apps-2026/",
  datePublished: "2026-09-03",
  dateModified: "2026-09-03",
  breadcrumbLabel: "Best Burpee Workout Apps 2026",
  listName: "Best Burpee Workout Apps (2026)",
  seo: {
    title: "Best Burpee Workout Apps (2026): 6 Apps Compared",
    description:
      "The best burpee workout apps in 2026, compared honestly: Busy Dad Training, BeStronger Burpee Workout, BurBur, Burpee Hero, Burpee by Telum Apps and 30 Day Burpee Challenge. Programmes, counters, pricing and who each one suits.",
    keywords: [
      "best burpee workout app",
      "burpee app",
      "burpee workout app",
      "burpee counter app",
      "burpee training app",
      "burpee challenge app",
      "navy seal burpee app",
      "6 count burpee app",
      "burpee tracker",
      "bodyweight workout app",
    ],
  },
  hero: {
    eyebrow: "2026 Guide",
    title: "Best Burpee Workout Apps (2026)",
    intro:
      "Burpee apps fall into three camps: full training programmes, simple counters, and 30-day challenges. We compared the six that are actually maintained in 2026 on what they do, what they cost, and who they suit.",
    backgroundImage: assetPath("/photos/burpee-photo-1.webp"),
  },
  quickAnswer:
    "The best burpee workout app in 2026 is Busy Dad Training if you want a complete programme: two defined burpee movements, four 20-minute sessions a week and a level system with 20-minute benchmarks, on iOS and Android (£9.99/month, 14-day free trial). For a free burpee timer on Android choose BeStronger's Burpee Workout; for automatic rep counting on Apple Watch choose BurBur.",
  intro: {
    title: "What a burpee app should actually do",
    paragraphs: [
      "The burpee is the most complete bodyweight exercise there is: legs, chest, shoulders, core and lungs in one movement, no equipment, any floor. That is exactly why it is so easy to do badly. Most people either do a handful at random and stop, or chase a 100-burpee challenge, burn out, and never come back. A good burpee app solves both problems by giving you a target for today and a path for the next six months.",
      "There are surprisingly few burpee-specific apps worth installing. Searching the stores for \"burpee app\" returns a long tail of abandoned counters (several have not been updated since 2018) and generic HIIT apps with a burpee thrown in. We limited this guide to apps that are burpee-first and had a store update in 2025 or 2026, then compared them on five criteria.",
      "One thing to know before you compare: the burpee in the Busy Dad programme is not the CrossFit-style jump-and-clap burpee. It is the American military burpee, counted in six or ten parts (the 6-count and the Navy Seal burpee). The counters and challenge apps below count whatever rep you do; only Busy Dad Training defines the movement standard.",
    ],
  },
  criteria: {
    title: "How we compared these burpee apps",
    items: [
      {
        label: "Programme vs counter",
        description: "Does the app tell you what to do each session and how to progress, or does it just count reps you decide to do?",
      },
      {
        label: "Progression",
        description: "Is there an objective benchmark that moves you from beginner to advanced, or only a streak?",
      },
      {
        label: "Movement standard",
        description: "Does the app define what a rep is (counts, depth, push-up) so your numbers mean something over time?",
      },
      {
        label: "Maintenance",
        description: "Was there a store update in 2025 or 2026? Several burpee apps are effectively abandoned.",
      },
      {
        label: "Price and platform",
        description: "Free with ads, one-off purchase, or subscription, and whether it exists on both iOS and Android.",
      },
    ],
  },
  comparisonColumns: [
    { key: "platforms", label: "Platforms" },
    { key: "focus", label: "What it is" },
    { key: "sessionLength", label: "Session" },
    { key: "price", label: "Pricing" },
  ] as const,
  apps: [
    {
      id: "busy-dad-training",
      name: "Busy Dad Training",
      websiteUrl: "https://busydadtraining.com/",
      appStoreUrl: appStores.appStoreUrl,
      googlePlayUrl: appStores.googlePlayUrl,
      isOwnProduct: true,
      platforms: "iOS & Android",
      sessionLength: "20 min, 4×/week",
      equipment: "None",
      focus: "Complete burpee programme with levels",
      price: `${appPricing.tableLabel}, 14-day free trial`,
      summary:
        `Busy Dad Training is the only app in this list that is a full training programme rather than a counter. It is built on two burpee variations, the 6-count military burpee and the Navy Seal burpee, trained for exactly 80 minutes a week (four 20-minute sessions). A four-tier level system from Level 1A to Graduation is unlocked by Landmark Workouts: for example, 100 6-counts in 20 minutes unlocks Level 1C, and 325 6-counts plus 150 Navy Seals in 20 minutes each graduates you. The app sets your weekly rep targets, runs the timer, tracks every rep and level, and plugs you into a global leaderboard. Subscription is ${appPricing.summary}.`,
      pros: [
        "A real programme: weekly targets, 20-minute timer windows and objective level benchmarks, so you always know what to do today and where you are going.",
        "Defines the movement standard (6-count and Navy Seal burpees, every count called out), which makes your numbers comparable over months and against other practitioners.",
        "Built for time-poor people: 80 minutes a week, no equipment, no exercise selection to think about.",
        "Actively developed on both iOS and Android, with a live community leaderboard and follow-along YouTube tutorials for both movements.",
      ],
      cons: [
        "Subscription-only after the 14-day trial; there is no permanent free tier.",
        "Only two movements. If you want burpee variety (box jumps, clap burpees, mixed HIIT) this is the wrong app.",
        "The upper levels are hard. Graduation takes most practitioners years, which is the point, but not everyone wants that.",
      ],
      bestFor: "Anyone who wants burpees as their whole training system, with a clear path from one rep to elite, in 80 minutes a week.",
    },
    {
      id: "bestronger-burpee-workout",
      name: "Burpee Workout by BeStronger",
      websiteUrl: "https://play.google.com/store/apps/details?id=com.shvagerfm.Burpy",
      googlePlayUrl: "https://play.google.com/store/apps/details?id=com.shvagerfm.Burpy",
      isOwnProduct: false,
      platforms: "Android (iOS version last updated 2018)",
      ratingNote: "4.5 (5.8K reviews, 500K+ installs, Google Play)",
      sessionLength: "5–15 min",
      equipment: "None",
      focus: "Timer, difficulty levels, history",
      price: "Free with ads, small one-off IAP",
      summary:
        "BeStronger's Burpee Workout is the most-installed burpee app on Android by a wide margin (500K+ installs) and was still receiving updates in August 2026. It is a straightforward interval timer with difficulty levels, reminders, quick stats and a training history. The same developer publishes a second, near-identical app (\"Burpee workout BeStronger\", 4.7 from 170 reviews) with a levelled beginner-to-hard plan and achievements, which can be confusing. The iOS sibling, Burpee Be Stronger, has not been updated since 2018.",
      pros: [
        "Free, simple and reliable: pick a level, start the timer, do the burpees.",
        "Largest user base of any burpee-specific app, and still maintained in 2026.",
        "Training history and reminders are enough to build a daily habit.",
      ],
      cons: [
        "Android only in practice; the iOS app is effectively abandoned.",
        "Ads in the free version.",
        "No movement standard and no long-term progression beyond the difficulty levels.",
      ],
      bestFor: "Android users who want a free burpee timer with a few difficulty levels and nothing else to configure.",
    },
    {
      id: "burbur-burpees-counter",
      name: "BurBur – Burpees Counter",
      websiteUrl: "https://apps.apple.com/us/app/burbur-burpees-counter/id6450203747",
      appStoreUrl: "https://apps.apple.com/us/app/burbur-burpees-counter/id6450203747",
      isOwnProduct: false,
      platforms: "iOS, Apple Watch, Vision Pro",
      ratingNote: "4.5 (18 ratings, App Store)",
      sessionLength: "Open, for reps, or for time",
      equipment: "Apple Watch for auto-count",
      focus: "Automatic rep counting via Apple Watch",
      price: "Free; Pro $1.99/yr or $3.99 one-off",
      summary:
        "BurBur is the only burpee counter we found that counts reps automatically, using Apple Watch motion data rather than a tap. You choose an open session, a rep target or a time cap; it writes the workout to HealthKit, closes your rings and posts to Game Center leaderboards. It is a tiny independent app (18 ratings) but it was updated in August 2026 and it does one thing well.",
      pros: [
        "Genuinely hands-free counting, so you can keep your rhythm without tapping a phone.",
        "Cheap: the Pro unlock is a couple of dollars, not a subscription.",
        "HealthKit integration and Game Center leaderboards.",
      ],
      cons: [
        "Automatic counting needs an Apple Watch; without one it is a manual tally.",
        "No programme, no levels and no rep standard: it counts whatever you do.",
        "Very small user base, so leaderboards are thin.",
      ],
      bestFor: "Apple Watch owners who already know their burpee routine and just want reps counted automatically.",
    },
    {
      id: "burpee-hero",
      name: "HIIT Workouts – Burpee Hero",
      websiteUrl: "https://apps.apple.com/us/app/hiit-workouts-burpee-hero/id1509074551",
      appStoreUrl: "https://apps.apple.com/us/app/hiit-workouts-burpee-hero/id1509074551",
      isOwnProduct: false,
      platforms: "iOS",
      ratingNote: "4.6 (87 ratings, App Store)",
      sessionLength: "Your choice",
      equipment: "None",
      focus: "Gamified logging (RPG avatar, leagues)",
      price: "Free; Premium $19.99–29.99/yr, lifetime $74.99",
      summary:
        "Burpee Hero turns burpees, squats, push-ups and sit-ups into a role-playing game: you level an avatar, fight boss battles, keep pets and climb weekly leagues by logging reps. It is the most original idea in the category and the reviews are warm (4.6 from 87 ratings). The catch is that it has not been updated since November 2021, and the in-app currency (\"Burpee Bucks\") and cosmetics add a mobile-game layer some people will not want.",
      pros: [
        "Motivation through play: boss battles, leagues and weekly tasks make daily reps feel like progress.",
        "Covers four bodyweight movements, not only burpees.",
        "Benchmark workouts and home-screen widgets.",
      ],
      cons: [
        "No update since 2021; treat it as unmaintained.",
        "Consumable in-app purchases on top of Premium.",
        "Gamification, not programming: there is no movement standard or physiological progression.",
      ],
      bestFor: "People who stick with things when there is a game attached, and do not mind an app that is no longer updated.",
    },
    {
      id: "burpee-telum-apps",
      name: "Burpee by Telum Apps",
      websiteUrl: "https://play.google.com/store/apps/details?id=com.strzelba.burpees",
      googlePlayUrl: "https://play.google.com/store/apps/details?id=com.strzelba.burpees",
      isOwnProduct: false,
      platforms: "Android",
      ratingNote: "4.7 (137 reviews, 10K+ installs, Google Play)",
      sessionLength: "Sets with rest, 5–15 min",
      equipment: "None",
      focus: "Fitness test → 12 difficulty levels",
      price: "Free with ads",
      summary:
        "Telum Apps' Burpee starts with a fitness test, places you in one of 12 difficulty levels, and then prescribes sets and rest periods. It includes a form guide, an activity log, graphs and cloud backup. Its last update was August 2025 and the user base is small (10K+ installs), but the test-then-level structure is the closest any free app gets to real progression.",
      pros: [
        "Placement test and 12 levels give a sense of progression that plain timers lack.",
        "Free, with a form guide and cloud backup of your log.",
        "Highest rating in the category (4.7), albeit from 137 reviews.",
      ],
      cons: [
        "Android only.",
        "Ads throughout.",
        "Levels are set-and-rest schemes, not benchmark workouts, and there is no defined rep standard.",
      ],
      bestFor: "Android users who want a free app with a placement test and a laddered plan.",
    },
    {
      id: "30-day-burpee-challenge",
      name: "30 Day Burpee Fitness Challenges",
      websiteUrl: "https://apps.apple.com/us/app/30-day-burpee-fitness-challenges-daily-workout/id1092870113",
      appStoreUrl: "https://apps.apple.com/us/app/30-day-burpee-fitness-challenges-daily-workout/id1092870113",
      isOwnProduct: false,
      platforms: "iOS",
      ratingNote: "3.8 (9 ratings, App Store)",
      sessionLength: "Daily, 30 days",
      equipment: "None",
      focus: "30-day challenge calendar",
      price: "Free with ads; Full Version $4.99",
      summary:
        "This is the classic 30-day challenge format: a calendar of daily burpee counts with rest days, text and video guides, push reminders, and progress export. It is cheap to unlock ($4.99, no subscription). Reviews complain about ad frequency, and parts of the listing are copied from the developer's abs app, which tells you how much attention it gets. It is fine for a one-month kick-start and nothing more.",
      pros: [
        "Simple, finite goal: 30 days, done.",
        "One-off $4.99 unlock instead of a subscription.",
        "Progress export and import if you switch phones.",
      ],
      cons: [
        "Frequent ads in the free version.",
        "Nothing after day 30, and no standard for what counts as a rep.",
        "Low, thin rating (3.8 from 9) and a listing that looks templated.",
      ],
      bestFor: "Someone who wants a 30-day burpee challenge on iPhone for a few dollars and will move on afterwards.",
    },
  ],
  bestForPicks: {
    title: "Quick picks: the best burpee app for…",
    picks: [
      {
        label: "Best overall burpee programme",
        appId: "busy-dad-training",
        reason: "The only full training system: two defined movements, weekly targets, 20-minute Landmark Workouts and a level path from 1 rep to 325 in 20 minutes.",
      },
      {
        label: "Best free burpee timer (Android)",
        appId: "bestronger-burpee-workout",
        reason: "500K+ installs, updated 2026, and it does exactly what a timer should.",
      },
      {
        label: "Best automatic burpee counter (Apple Watch)",
        appId: "burbur-burpees-counter",
        reason: "Counts reps from wrist motion and writes to HealthKit for a one-off $3.99.",
      },
      {
        label: "Best free progression on Android",
        appId: "burpee-telum-apps",
        reason: "A placement test and 12 levels for nothing but ads.",
      },
      {
        label: "Best gamified burpee app",
        appId: "burpee-hero",
        reason: "Avatar, boss battles and leagues, if you can live with no updates since 2021.",
      },
      {
        label: "Best 30-day burpee challenge",
        appId: "30-day-burpee-challenge",
        reason: "Cheap, finite, and fine for a month-long kick-start.",
      },
    ],
  },
  whyBdp: {
    title: "Why Busy Dad Training is our pick for burpee training",
    paragraphs: [
      "Every other app in this guide counts burpees. Busy Dad Training programmes them. It defines the movement (the 6-count military burpee and the 10-count Navy Seal burpee, every count called out), caps your week at 80 minutes, and measures progress with the same 20-minute test at every level. That is what turns \"I did some burpees\" into a training career with a beginning, a middle and a Graduation.",
      "It is not the cheapest option here, and it is deliberately narrow. If you want a free timer or a counter for your own routine, BeStronger or BurBur will serve you well. If you want burpees to be the whole plan, this is the app built for that.",
    ],
    internalLinks: [
      { label: "What is a Navy Seal burpee?", href: "/navy-seal-burpee/" },
      { label: "What is a 6-count burpee?", href: "/6-count-burpee/" },
      { label: "The four levels", href: "/levels/" },
      { label: "Pricing", href: "/pricing/" },
    ],
  },
  faqs: [
    {
      question: "What is the best burpee workout app in 2026?",
      answer:
        "For a complete burpee training programme, Busy Dad Training: two defined burpee movements, four 20-minute sessions a week, and a level system with objective benchmarks, on iOS and Android for £9.99/month or £99.99/year with a 14-day free trial. For a free timer on Android, BeStronger's Burpee Workout (500K+ installs). For automatic counting on Apple Watch, BurBur. For a gamified logger, Burpee Hero. For a month-long challenge on iPhone, 30 Day Burpee Fitness Challenges.",
    },
    {
      question: "Is there an app that counts burpees automatically?",
      answer:
        "Yes. BurBur – Burpees Counter counts reps automatically from Apple Watch motion data and saves the workout to HealthKit. On Android, Burpee Counter – Auto counting by EumPlus uses the phone camera and posture recognition, but it is very new (100+ installs) and unproven. Busy Dad Training does not auto-count; you log the rep total from each 20-minute Landmark Workout.",
    },
    {
      question: "What is the difference between a burpee counter and a burpee programme?",
      answer:
        "A counter records reps you decide to do. A programme tells you what to do today, how it fits the week, and what benchmark unlocks the next stage. Counters are good for people who already have a routine; programmes are for people who want results without designing the plan themselves. Of the apps in this guide, only Busy Dad Training is a full programme.",
    },
    {
      question: "How many burpees a day should a beginner do?",
      answer:
        "Start by finding how many quality reps you can do in 20 minutes with rests, not a fixed daily number. In the Busy Dad programme, one 6-count burpee and one Navy Seal burpee in a 20-minute window puts you at Level 1A; 50 6-counts in 20 minutes reaches Level 1B. Working towards those numbers four times a week beats doing 20 sloppy burpees every day.",
    },
    {
      question: "What kind of burpee do these apps use?",
      answer:
        "The counters and challenge apps count any burpee you do. Busy Dad Training uses the American military burpee in two forms: the 6-count (squat, kick back to plank, push-up down, push-up up, jump in, stand) and the 10-count Navy Seal burpee, which adds a six-count upper-body sequence in the plank. Neither includes the jump-and-clap of the CrossFit burpee.",
    },
    {
      question: "Are burpee apps free?",
      answer:
        "Most burpee counters and challenge apps are free with ads and a small one-off unlock ($0.99–$4.99). Burpee Hero sells a Premium subscription ($19.99–$29.99 a year). Busy Dad Training is a subscription (£9.99/month or £99.99/year) after a 14-day free trial, because it is a full programme with a timer, level tracking and a community, not a counter.",
    },
    {
      question: "Can you get fit doing only burpees?",
      answer:
        "Yes, if the burpee variation is complete and the training is progressive. The 6-count military burpee trains legs, core and cardiovascular capacity; the Navy Seal burpee adds serious upper-body strength work. The Busy Dad programme's Graduation standard (325 6-counts and 150 Navy Seal burpees, each in 20 minutes) is a level of conditioning few gym-goers reach. Random burpees without a standard or progression will not get you there.",
    },
    {
      question: "Which burpee apps work on both iPhone and Android?",
      answer:
        "Busy Dad Training is on both the App Store and Google Play. BeStronger and Telum Apps' Burpee are Android-first (BeStronger's iOS app has not been updated since 2018). BurBur, Burpee Hero and 30 Day Burpee Fitness Challenges are iOS only.",
    },
  ],
} as const satisfies GuideData;
