import { assetPath } from "@/lib/base-path";
import { appPricing, appStores } from "@/content/site";
import type { GuideData } from "@/content/guide-types";

/**
 * "Best Bodyweight Workout Apps (2026)".
 *
 * Prices and ratings were read from the US App Store / Google Play listings
 * on 2026-09-03. Where the two stores disagree (Madbarz, Centr) we say so.
 */
export const bestBodyweightAppsPage = {
  path: "/best-bodyweight-workout-apps-2026/",
  datePublished: "2026-09-03",
  dateModified: "2026-09-03",
  breadcrumbLabel: "Best Bodyweight Workout Apps 2026",
  listName: "Best Bodyweight Workout Apps (2026)",
  seo: {
    title: "Best Bodyweight Workout Apps (2026): 8 No-Equipment Apps Compared",
    description:
      "The best bodyweight workout apps in 2026, compared on session length, equipment, progression, coaching style and price: Busy Dad Training, Freeletics, Nike Training Club, Seven, Madbarz, Thenx, Caliber and FitOn.",
    keywords: [
      "best bodyweight workout app",
      "bodyweight workout app",
      "no equipment workout app",
      "calisthenics app",
      "home workout app no equipment",
      "best free bodyweight workout app",
      "bodyweight training app for men",
      "Freeletics alternative",
      "Nike Training Club alternative",
      "burpee workout app",
    ],
  },
  hero: {
    eyebrow: "2026 Guide",
    title: "Best Bodyweight Workout Apps (2026)",
    intro:
      "No gym, no dumbbells, no pull-up bar: which apps actually deliver a progressive bodyweight programme? We compared eight of the most popular options on what a session looks like, what equipment they quietly assume, how you progress, and what they cost in 2026.",
    backgroundImage: assetPath("/photos/burpee-photo-1.webp"),
  },
  quickAnswer:
    "The best bodyweight workout app in 2026 depends on what you want: Busy Dad Training for a measurable no-equipment programme (two burpee movements, four 20-minute sessions a week, four levels with 20-minute benchmarks); Nike Training Club for the best free video library; Freeletics for adaptive AI-generated HIIT; Seven for a seven-minute daily habit; Thenx for calisthenics skills if you own a pull-up bar.",
  intro: {
    title: "Who this guide is for",
    paragraphs: [
      "\"Bodyweight app\" covers three different things. Some apps are video libraries you follow along with (Nike Training Club, FitOn). Some generate workouts for you from a big exercise pool (Freeletics, Madbarz). Some are programmes: a fixed method with benchmarks that tell you when to move up (Busy Dad Training, and the skill trees in Thenx). Which one is right depends less on the app's rating and more on whether you want variety, a habit, or a result you can measure.",
      "We also checked the fine print on equipment. \"Bodyweight\" on a store listing often means \"a pull-up bar and rings\" once you get past the beginner plan. Thenx and Madbarz are the honest examples; their best content assumes a bar. Only Busy Dad Training, Seven, Nike Training Club's equipment-free filter and FitOn are floor-only all the way through.",
      "Every app here is available on iOS and Android, and every rating was taken from the US store listing on the date at the top of this page.",
    ],
  },
  criteria: {
    title: "How we compared these apps",
    items: [
      { label: "Session length", description: "What a normal session actually takes, including warm-up, and whether the app fixes it or leaves it to you." },
      { label: "Real equipment needs", description: "Floor-only throughout, or does the good content assume a bar, rings or dumbbells?" },
      { label: "Progression", description: "Objective benchmarks or levels, versus a streak counter or an algorithm nudging difficulty." },
      { label: "Coaching style", description: "Follow-along video, AI-generated plan, workout builder, or timer-led programme." },
      { label: "Price and maintenance", description: "Free tier, subscription cost, and whether the app shipped an update in 2026." },
    ],
  },
  comparisonColumns: [
    { key: "sessionLength", label: "Typical session" },
    { key: "equipment", label: "Equipment" },
    { key: "focus", label: "Style" },
    { key: "price", label: "Pricing (US store)" },
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
      equipment: "None, ever",
      focus: "Two-movement burpee programme with levels",
      price: `${appPricing.tableLabel}, 14-day trial`,
      summary:
        `Busy Dad Training is a bodyweight programme, not a library. You train two compound burpee movements (the 6-count military burpee and the Navy Seal burpee) for exactly 80 minutes a week, usually four 20-minute sessions. Progress is measured by Landmark Workouts, 20-minute tests that unlock each of the four levels from 1A to Graduation, so you always know precisely how fit you are relative to the standard. The app sets weekly rep targets, runs the timer, tracks every rep and hosts a global leaderboard. It costs ${appPricing.summary}.`,
      pros: [
        "The shortest complete programme in this guide: 20 minutes, four times a week, and never a decision about what to do.",
        "Objective progression. Level 1B is 50 6-counts in 20 minutes; Graduation is 325. The test never changes, so the numbers mean something.",
        "Truly equipment-free at every level, which is not the case for most \"bodyweight\" apps.",
        "Actively developed on iOS and Android, with tutorial and follow-along videos on YouTube.",
      ],
      cons: [
        "Only two movements. If you want variety, skills like handstands, or dumbbell work, look elsewhere.",
        "No free tier after the 14-day trial.",
        "The programme is demanding at the top; most people spend a long time in Levels 1 and 2.",
      ],
      bestFor: "Time-poor men, dads especially, who want measurable results from the simplest possible bodyweight system.",
    },
    {
      id: "freeletics",
      name: "Freeletics",
      websiteUrl: "https://www.freeletics.com/",
      appStoreUrl: "https://apps.apple.com/us/app/freeletics-workouts-fitness/id654810212",
      googlePlayUrl: "https://play.google.com/store/apps/details?id=com.freeletics.lite",
      isOwnProduct: false,
      platforms: "iOS & Android",
      ratingNote: "4.6 (22K ratings, App Store) · 4.5 (260K, Google Play, 10M+ installs)",
      sessionLength: "15–45 min",
      equipment: "None required; optional weights",
      focus: "AI-generated HIIT and strength plan",
      price: "Limited free tier; Coach $34.99–$79.99 (term varies)",
      summary:
        "Freeletics is the best-known bodyweight HIIT app, with 700+ exercises and an AI \"Training Journey\" that reshapes your plan each week from your feedback. Sessions run 15 to 45 minutes and can be bodyweight-only or include weights. Coach+, its conversational AI coach, is included in the Coach subscription rather than sold separately. The free tier is thin and the Google Play listing notes ads.",
      pros: [
        "Huge, varied exercise library and a plan that adapts to your feedback.",
        "Bodyweight-only tracks exist and workouts scale down to 15 minutes.",
        "Ten years of refinement and one of the largest user bases in fitness.",
      ],
      cons: [
        "The Coach subscription is among the most expensive here.",
        "Progress is algorithmic rather than benchmarked; there is no fixed test you pass.",
        "Variety cuts both ways: it is easy to stay busy without getting measurably stronger at anything.",
      ],
      bestFor: "People who get bored easily and want a new, adaptive HIIT session every time.",
    },
    {
      id: "nike-training-club",
      name: "Nike Training Club",
      websiteUrl: "https://www.nike.com/ntc-app",
      appStoreUrl: "https://apps.apple.com/us/app/nike-training-club-wellness/id301521403",
      googlePlayUrl: "https://play.google.com/store/apps/details?id=com.nike.ntc",
      isOwnProduct: false,
      platforms: "iOS & Android",
      ratingNote: "4.8 (252K ratings, App Store) · 4.4 (373K, Google Play)",
      sessionLength: "5–60 min; \"20 minutes or less\" category",
      equipment: "Filter for none",
      focus: "Free trainer-led follow-along video",
      price: "Free, no in-app purchases",
      summary:
        "Nike Training Club is completely free with no in-app purchases, which makes it the obvious first download. It is a large library of trainer-led video workouts and multi-week programmes, with an equipment-free filter and a \"quick workouts in 20 minutes or less\" category. What it is not is adaptive: nothing changes based on how you did, so progression is up to you.",
      pros: [
        "Free, full stop. No ads, no paywall.",
        "Polished video coaching and a wide range of session lengths.",
        "Equipment-free filter makes floor-only training easy to find.",
      ],
      cons: [
        "No progression model; it is a library, not a programme.",
        "Sessions are follow-along, so you cannot go at your own pace or push a benchmark.",
        "Brand content first; some workouts are more about the trainer than the training.",
      ],
      bestFor: "Anyone who wants free, guided bodyweight sessions and is happy to manage their own progression.",
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
      focus: "Micro-workouts and streaks",
      price: "Free core; 7 Club $9.99/mo or $79.99/yr",
      summary:
        "Seven is the seven-minute bodyweight workout as an app: animated exercise guides, a choice of voice instructors, and a heavy emphasis on streaks and a seven-month challenge. It is superbly designed for consistency. The 7 Club subscription unlocks the full workout catalogue and personalised plans; the free tier is a real, usable workout.",
      pros: [
        "The lowest possible barrier: seven minutes, no equipment, anywhere.",
        "Excellent habit mechanics and a genuinely useful free tier.",
        "Both stores rate it 4.7 or higher from 100K+ reviews.",
      ],
      cons: [
        "Seven minutes is a floor, not a training plan; strength gains plateau quickly.",
        "Progression is more streaks than standards.",
        "Most content sits behind 7 Club.",
      ],
      bestFor: "Building the habit of daily movement when even 20 minutes feels unrealistic.",
    },
    {
      id: "madbarz",
      name: "Madbarz",
      websiteUrl: "https://www.madbarz.com/",
      appStoreUrl: "https://apps.apple.com/us/app/madbarz-bodyweight-workouts/id969057083",
      googlePlayUrl: "https://play.google.com/store/apps/details?id=com.madbarz.madbarzApp",
      isOwnProduct: false,
      platforms: "iOS & Android",
      ratingNote: "4.8 (1.5K ratings, App Store) · 4.6 (19.5K, Google Play)",
      sessionLength: "You choose; 2–12-week plans",
      equipment: "None to start; bar for many plans",
      focus: "Workout builder + calisthenics plans",
      price: "Android $9.99/mo, $59.99/yr; iOS $12.49/mo, $88.99/yr",
      summary:
        "Madbarz is a bodyweight workout builder with a catalogue of 2-to-12-week calisthenics plans and video tutorials. You can assemble your own sessions from its exercise library or follow a plan. Two things to know: pricing is markedly higher on the App Store than on Google Play, and the iOS app's last update was July 2024 while Android was updated in April 2026.",
      pros: [
        "Flexible builder if you like designing your own sessions.",
        "Cheap on Android.",
        "Large library of bodyweight tutorials.",
      ],
      cons: [
        "iOS app has not been updated since 2024, and costs 25–48% more than on Android.",
        "Many plans assume a pull-up bar.",
        "Builder-style apps still leave the programming to you.",
      ],
      bestFor: "Android users who want to build their own bodyweight sessions cheaply.",
    },
    {
      id: "thenx",
      name: "Thenx",
      websiteUrl: "https://thenx.com/",
      appStoreUrl: "https://apps.apple.com/us/app/thenx-calisthenics-training/id1192413645",
      isOwnProduct: false,
      platforms: "iOS & Android",
      ratingNote: "4.8 (12K ratings, App Store) · 4.2 (16.7K, Google Play)",
      sessionLength: "Varies, often 20–45 min",
      equipment: "Bar and rings for skill work",
      focus: "Calisthenics skill progressions",
      price: "Free tier; $9.99–19.99/mo, $89.99–119.99/yr",
      summary:
        "Thenx is the calisthenics app: daily workouts, follow-alongs, and skill trees for the muscle-up, handstand and planche. Beginner content is floor-only, but the point of Thenx is bar and ring work, so budget for a pull-up bar. Two subscription price points are listed on the App Store, and the Android version is rated noticeably lower than iOS.",
      pros: [
        "Clear skill progressions with technique breakdowns.",
        "Big, motivated community around street workout.",
        "Follow-along sessions can be kept short.",
      ],
      cons: [
        "Needs a bar for most of what makes it worth paying for.",
        "Skill breadth can be overwhelming without a coach.",
        "Android rating (4.2) lags iOS (4.8).",
      ],
      bestFor: "People chasing calisthenics skills who own or will install a pull-up bar.",
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
      equipment: "Bodyweight supported; strength-oriented",
      focus: "Coach-designed strength plans, free tier",
      price: "Free; Plus from $6/mo; 1-on-1 coaching from ~$200/mo",
      summary:
        "Caliber is a strength-training app with an unusually generous free tier: coach-designed programmes, an 800+ exercise library, weekly lessons and full logging at no cost. Bodyweight programmes are available and the app is happy to run with no gym, but its DNA is strength progression with loads, and its premium product is human 1-on-1 coaching.",
      pros: [
        "Best free tier of any strength app; no ads.",
        "Evidence-based programming and education built in.",
        "Real human coaching if you want to pay for it.",
      ],
      cons: [
        "Bodyweight is supported, not the focus; sessions are longer than a 20-minute cap.",
        "Progress tracking assumes you will eventually add load.",
        "Premium coaching is expensive.",
      ],
      bestFor: "People who want free, well-programmed strength work and may add weights later.",
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
      focus: "Free video classes with celebrity trainers",
      price: "Free; PRO $19.99–$39.99 (term varies)",
      summary:
        "FitOn is a free class library: HIIT, strength, yoga, and 10-minute quick sessions led by well-known trainers, live and on demand. Men's Journal named it the best equipment-free workout app. It is the closest thing to a free boutique studio at home. Like Nike Training Club it is a library rather than a programme, so nothing in it measures whether you are getting fitter.",
      pros: [
        "Enormous free catalogue with no equipment needed for most classes.",
        "Highest App Store rating in this guide (4.9 from 283K).",
        "Live classes and a social feed for accountability.",
      ],
      cons: [
        "Class-style, not progressive: no benchmarks, no levels.",
        "PRO upsells for meal plans and some content.",
        "Quality varies widely across trainers.",
      ],
      bestFor: "People who like class energy and variety and do not need a measured progression.",
    },
  ],
  bestForPicks: {
    title: "Quick picks: the best bodyweight app for…",
    picks: [
      { label: "Best bodyweight programme with measurable progression", appId: "busy-dad-training", reason: "Fixed 20-minute tests and four levels; 80 minutes a week, no equipment at any level." },
      { label: "Best free bodyweight workout app", appId: "nike-training-club", reason: "Completely free, no ads, equipment-free filter." },
      { label: "Best adaptive HIIT", appId: "freeletics", reason: "AI-generated plan from a 700+ exercise library, 15–45 minutes." },
      { label: "Best for building a daily habit", appId: "seven", reason: "Seven minutes, streaks, and a usable free tier." },
      { label: "Best for calisthenics skills", appId: "thenx", reason: "Muscle-up, handstand and planche progressions, if you have a bar." },
      { label: "Best free strength programming", appId: "caliber", reason: "Coach-designed plans and education at no cost." },
      { label: "Best workout builder", appId: "madbarz", reason: "Design your own bodyweight sessions; cheapest on Android." },
      { label: "Best free class library", appId: "fiton", reason: "Live and on-demand trainer-led classes without equipment." },
    ],
  },
  whyBdp: {
    title: "Why Busy Dad Training is on this list",
    paragraphs: [
      "Most bodyweight apps optimise for choice. Busy Dad Training optimises for constraint: two movements, 80 minutes a week, and one 20-minute test per level that never changes. That is the opposite of a video library, and it is why it suits people who have tried the libraries and drifted. You cannot drift when Tuesday's session is 20 minutes of 6-counts with a rep target on the screen.",
      "If you are not sure, download Nike Training Club (free) and take the 14-day Busy Dad Training trial in the same fortnight. The one you are still opening in week three is the one to keep.",
    ],
    internalLinks: [
      { label: "The two Sacred Movements", href: "/movements/" },
      { label: "Level system & benchmarks", href: "/levels/" },
      { label: "Best burpee apps (2026)", href: "/best-burpee-workout-apps-2026/" },
      { label: "Pricing", href: "/pricing/" },
    ],
  },
  faqs: [
    {
      question: "What is the best bodyweight workout app in 2026?",
      answer:
        "It depends on what you want from it. For a measurable programme with no equipment at any level, Busy Dad Training (two burpee movements, four 20-minute sessions a week, four levels). For a free library of guided sessions, Nike Training Club. For adaptive HIIT variety, Freeletics. For a seven-minute daily habit, Seven. For calisthenics skills with a bar, Thenx.",
    },
    {
      question: "What is the best free bodyweight workout app?",
      answer:
        "Nike Training Club is free with no in-app purchases and has an equipment-free filter. FitOn is free with a huge class library. Caliber has the best free strength programming. Busy Dad Training is not free, but it includes a 14-day free trial of the full programme.",
    },
    {
      question: "Do bodyweight workout apps really need no equipment?",
      answer:
        "Not always. Thenx and Madbarz market themselves as bodyweight apps but their best plans assume a pull-up bar and rings. Freeletics has optional weights tracks. Busy Dad Training, Seven, Nike Training Club's equipment-free workouts and most FitOn classes are floor-only throughout.",
    },
    {
      question: "Can you build muscle with bodyweight-only apps?",
      answer:
        "Yes, when the movements are compound and the programme progresses. The Navy Seal burpee in Busy Dad Training, for example, is a 10-count movement with a six-count upper-body sequence performed in the plank, and the level system pushes your 20-minute rep count from 20 to 150. Calisthenics skill work in Thenx builds muscle too. Follow-along class apps build fitness but rarely track strength.",
    },
    {
      question: "How long should a bodyweight workout be?",
      answer:
        "Twenty minutes of hard, structured work is enough for most people training four times a week; that is 80 minutes a week, inside the WHO's 75–150 minutes of vigorous activity. Busy Dad Training fixes sessions at 20 minutes. Seven goes as short as seven minutes for habit-building. Freeletics and Nike Training Club range from 15 to 45 minutes or more.",
    },
    {
      question: "Is Freeletics worth it compared to Busy Dad Training?",
      answer:
        "Freeletics is worth it if you want variety and an AI-generated plan across hundreds of exercises, and you are happy to pay for Coach. Busy Dad Training is worth it if you want the shortest programme with objective benchmarks and never want to choose an exercise. They solve different problems; see our Freeletics vs Busy Dad Training comparison for the detail.",
    },
    {
      question: "Which bodyweight app is best for busy dads?",
      answer:
        "Busy Dad Training was built for exactly that: 20-minute sessions you can do before the kids wake up, four times a week, no equipment, and a level system so you always know what today's target is. Seven is the fallback on days when even 20 minutes is impossible.",
    },
    {
      question: "How much do bodyweight workout apps cost in 2026?",
      answer:
        `Nike Training Club is free. Seven's 7 Club is $9.99/month or $79.99/year. Busy Dad Training is ${appPricing.summary} with a 14-day trial. Madbarz is $9.99/month on Android but $12.49/month on iOS. Thenx lists $9.99–$19.99/month. Freeletics Coach starts around $34.99 depending on term. Caliber and FitOn have free tiers with paid upgrades. Prices are US-store figures checked in September 2026 and vary by region.`,
    },
  ],
} as const satisfies GuideData;
