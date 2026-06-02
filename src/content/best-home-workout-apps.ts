import { assetPath } from "@/lib/base-path";
import { appPricing, appStores } from "@/content/site";

export const bestHomeWorkoutAppsPage = {
  path: "/best-short-home-workout-apps-for-men-2026/",
  datePublished: "2026-06-02",
  dateModified: "2026-06-02",
  seo: {
    title: "Best Short Home Workout Apps for Men (2026)",
    description:
      "An honest 2026 comparison of the best short home workout apps for men — Freeletics, Thenx, Boostcamp, Perigee, Chris Heria, and Busy Dad Training — by session length, equipment, and fit for busy dads.",
    keywords: [
      "best short home workout apps for men",
      "short home workout app",
      "home workout app for men",
      "20 minute workout app",
      "bodyweight workout app",
      "busy dad workout app",
      "Freeletics alternative",
      "no gym workout app",
    ],
  },
  hero: {
    eyebrow: "2026 Guide",
    title: "Best Short Home Workout Apps for Men (2026)",
    intro:
      "If you train at home and only have 20–30 minutes, the right app matters more than the trendiest one. We compared six popular options on session length, equipment, progression, and who each app is actually built for.",
    backgroundImage: assetPath("/photos/burpee-photo-1.jpg"),
  },
  intro: {
    title: "Who this guide is for",
    paragraphs: [
      "This roundup is for men who want effective home training without a gym commute, complicated splits, or hour-long sessions. Every app below can be used at home; the difference is how short the workouts feel, how much equipment you need, and how prescriptive the programming is.",
      "We evaluated each app on five criteria: typical session length, equipment requirements, progression structure, coaching style (video vs AI vs timer-led), and pricing model. Where pricing varies by region or tier, we describe the general model — check each app's store listing before you subscribe.",
    ],
  },
  criteria: {
    title: "How we compared these apps",
    items: [
      {
        label: "Session length",
        description: "Can you finish a meaningful workout in 20–30 minutes, including warm-up?",
      },
      {
        label: "Equipment",
        description: "True bodyweight only, or does the program assume dumbbells, bars, or machines?",
      },
      {
        label: "Progression",
        description: "Clear levels, benchmarks, or skill paths — vs endless random workouts.",
      },
      {
        label: "Coaching style",
        description: "AI-generated plans, follow-along video, program marketplace, or minimalist timer + reps.",
      },
      {
        label: "Price",
        description: "Free tier, subscription, or one-off program purchases.",
      },
    ],
  },
  comparisonColumns: [
    { key: "sessionLength", label: "Typical session" },
    { key: "equipment", label: "Equipment" },
    { key: "focus", label: "Focus" },
    { key: "price", label: "Pricing" },
  ] as const,
  apps: [
    {
      id: "busy-dad-training",
      name: "Busy Dad Training",
      websiteUrl: "https://busydadtraining.com/",
      appStoreUrl: appStores.appStoreUrl,
      isOwnProduct: true,
      sessionLength: "20 min (80 min/week)",
      equipment: "None — bodyweight burpees",
      focus: "Minimalist burpee program, 4 levels",
      price: appPricing.tableLabel,
      summary:
        `Busy Dad Training is built for men who want the simplest possible home system: two compound burpee movements, a strict 80-minute weekly budget (usually four 20-minute sessions), and a four-tier level system unlocked by Landmark Workouts. Subscription is ${appPricing.summary}.`,
      pros: [
        "Extremely short sessions with a fixed weekly time cap — no decision fatigue.",
        "No equipment; train anywhere.",
        "Clear progression from Level 1 through Graduation with objective benchmarks.",
        `Straightforward pricing: ${appPricing.monthly.display} or ${appPricing.annual.display} (${appPricing.annual.effectiveMonthly}).`,
        "Full app access: timer, levels, and community.",
      ],
      cons: [
        "Narrow exercise menu — mastery of two movements, not exercise variety.",
        "Not ideal if you want dumbbell work, skill tricks, or daily workout variety.",
        "High standards at upper levels; Graduation is a long-term goal.",
      ],
      bestFor: "Busy dads and men who want ruthless efficiency and bodyweight strength without a gym.",
    },
    {
      id: "freeletics",
      name: "Freeletics",
      websiteUrl: "https://www.freeletics.com/",
      isOwnProduct: false,
      sessionLength: "15–45 min",
      equipment: "Bodyweight (optional weights)",
      focus: "AI coach, HIIT & strength",
      price: "Freemium + subscription",
      summary:
        "Freeletics is one of the best-known home workout apps for men, pairing bodyweight HIIT with an AI coach that adapts plans. Workouts scale from short bursts to longer sessions, with optional equipment tracks.",
      pros: [
        "Strong brand and large workout library; good if you want variety.",
        "AI Coach personalises volume and exercise selection over time.",
        "Works well for general conditioning and fat loss at home.",
      ],
      cons: [
        "Subscription unlocks the full experience; free tier is limited.",
        "Less rigid weekly structure than a fixed 80-minute program.",
        "Exercise selection is broader — not a single-movement mastery model.",
      ],
      bestFor: "Men who want an AI-guided, varied HIIT/strength mix and do not mind subscribing.",
    },
    {
      id: "chris-heria",
      name: "Chris Heria / Heria Pro",
      websiteUrl: "https://chrisheria.com/",
      isOwnProduct: false,
      sessionLength: "20–60 min",
      equipment: "Bodyweight + optional weights",
      focus: "Calisthenics & skill work",
      price: "App subscription / programs",
      summary:
        "Chris Heria's ecosystem centres on calisthenics — pull-ups, dips, push variations, and skill progressions — delivered through Heria Pro and structured programs on his site.",
      pros: [
        "High-quality follow-along content for street workout aesthetics.",
        "Good progression for pull strength and skills (muscle-up, handstand path).",
        "Familiar brand if you already follow calisthenics on YouTube.",
      ],
      cons: [
        "Often assumes a bar or rings for best results — not pure living-room minimalism.",
        "Session length and structure vary by program; less of a single weekly budget.",
        "Overlaps with Thenx for audience; pick one calisthenics ecosystem to avoid duplication.",
      ],
      bestFor: "Men focused on calisthenics skills and who can install a pull-up bar at home.",
    },
    {
      id: "perigee",
      name: "Perigee",
      websiteUrl: "https://perigee.se/",
      isOwnProduct: false,
      sessionLength: "30–60 min",
      equipment: "Gym or home weights",
      focus: "Structured strength blocks",
      price: "Subscription",
      summary:
        "Perigee (from the team behind Strong) targets lifters who want structured strength programming with clear progression — more gym-oriented than pure bodyweight HIIT.",
      pros: [
        "Excellent for men who want percentage-based lifting and periodised blocks.",
        "Clean interface inherited from a serious training-app background.",
        "Good if you have a home rack or gym access and care about numbers on the bar.",
      ],
      cons: [
        "Not a short bodyweight-only solution; sessions often run longer than 20 minutes.",
        "Less relevant if you have zero equipment and want minimal setup.",
      ],
      bestFor: "Men with barbell or dumbbell access who prioritise strength PRs over bodyweight minimalism.",
    },
    {
      id: "boostcamp",
      name: "Boostcamp",
      websiteUrl: "https://www.boostcamp.app/",
      isOwnProduct: false,
      sessionLength: "45–90 min",
      equipment: "Gym programs common",
      focus: "Program marketplace",
      price: "Free app + paid programs",
      summary:
        "Boostcamp is a hub for popular lifting and hypertrophy programs (Reddit PPL, 5/3/1 variants, etc.). You pick a coach's template and log sets — ideal when you already know you want barbell work.",
      pros: [
        "Huge library of proven strength and hypertrophy templates.",
        "Free to log workouts; many programs are affordable one-offs.",
        "Community reviews help you choose a plan that matches your schedule.",
      ],
      cons: [
        "Typical programs are not \"short home\" by default — often 60+ minutes.",
        "Requires equipment for most top programs.",
        "Less hand-holding than AI-coach apps; you follow the spreadsheet mentality.",
      ],
      bestFor: "Men running barbell or dumbbell programs who want flexible templates, not a 20-minute cap.",
    },
    {
      id: "thenx",
      name: "Thenx",
      websiteUrl: "https://thenx.com/",
      isOwnProduct: false,
      sessionLength: "20–45 min",
      equipment: "Bodyweight + bar recommended",
      focus: "Calisthenics skills & programs",
      price: "Freemium + subscription",
      summary:
        "Thenx offers calisthenics workouts and skill paths (beginner to advanced) with follow-along videos — similar space to Heria, with a strong focus on bar work and physique at home.",
      pros: [
        "Structured skill progressions and technique breakdowns.",
        "Workouts can be relatively short for technique or pump sessions.",
        "Large community around street workout culture.",
      ],
      cons: [
        "Pull-up bar strongly recommended for full value.",
        "Skill variety can feel overwhelming vs a single-program app.",
        "Subscription for full program access.",
      ],
      bestFor: "Men who want calisthenics variety and skill goals with a bar at home.",
    },
  ],
  bestForPicks: {
    title: "Quick picks: best app for…",
    picks: [
      {
        label: "Best for 20-minute bodyweight minimalism",
        appId: "busy-dad-training",
        reason:
          "Fixed 20-minute windows, two movements, 80 minutes per week — built for dads who need zero friction.",
      },
      {
        label: "Best for AI-guided HIIT variety",
        appId: "freeletics",
        reason: "Adaptive coach and large exercise library for varied home sessions.",
      },
      {
        label: "Best for barbell strength structure",
        appId: "perigee",
        reason: "Periodised strength blocks when you have weights and want clear progression.",
      },
      {
        label: "Best for popular lifting templates",
        appId: "boostcamp",
        reason: "Marketplace of community-vetted gym programs with straightforward logging.",
      },
      {
        label: "Best for calisthenics skills (bar work)",
        appId: "thenx",
        reason: "Skill paths and follow-along calisthenics — pair with or instead of Heria.",
      },
    ],
  },
  whyBdp: {
    title: "Why Busy Dad Training fits this list",
    paragraphs: [
      "Most apps on this list optimise for variety, skills, or barbell numbers. Busy Dad Training optimises for constraint: 80 minutes per week, two Sacred Movements (6-count and Navy Seal burpees), and a level system where you unlock the next tier only by hitting Landmark Workouts in 20-minute windows.",
      "If your goal is the shortest credible home workout for men — not the most exercises — that design is the differentiator. The app handles the timer, tracks your level, and connects you to the Busy Dad Army community.",
    ],
    internalLinks: [
      { label: "Training principles", href: "/principles/" },
      { label: "The two Sacred Movements", href: "/movements/" },
      { label: "Level system & benchmarks", href: "/levels/" },
      { label: "Community stories", href: "/community/" },
    ],
  },
  faqs: [
    {
      question: "What is the best short home workout app for men in 2026?",
      answer:
        "It depends on your constraint. For strict 20-minute bodyweight sessions with minimal decisions, Busy Dad Training is the strongest fit. For AI-guided variety and HIIT, Freeletics leads. For calisthenics skills with a pull-up bar, Thenx or Chris Heria's Heria Pro are better matches. For barbell strength, consider Perigee or Boostcamp — but expect longer sessions and equipment.",
    },
    {
      question: "How long should a home workout app session be for busy men?",
      answer:
        "Twenty minutes is enough for high-quality work if the program is designed around density and clear goals — not endless exercise swapping. Busy Dad Training standardises on 20-minute windows (80 minutes per week). Apps like Freeletics and Thenx can go shorter or longer; Boostcamp and Perigee often assume 45–90 minutes when running strength blocks.",
    },
    {
      question: "Is Freeletics good for short home workouts?",
      answer:
        "Yes. Freeletics is widely used for home HIIT and bodyweight strength, and many workouts fit in 15–30 minutes. It is less rigid than a fixed weekly minute cap and relies on a subscription for the full AI Coach experience. It is a strong choice if you want variety over a single minimalist movement system.",
    },
    {
      question: "Do I need gym equipment for these workout apps?",
      answer:
        "Busy Dad Training, Freeletics (bodyweight track), and many Thenx/Heria sessions need no gym. Perigee and most Boostcamp programs assume barbells, dumbbells, or machines. Always check the program you select before committing — \"home workout\" does not always mean \"no equipment.\"",
    },
    {
      question: "What makes Busy Dad Training different from Freeletics?",
      answer:
        "Freeletics offers broad exercise variety and AI-personalised plans. Busy Dad Training offers disciplined minimalism: two burpee movements, an 80-minute weekly budget, and level unlocks via Landmark Workouts. Freeletics optimises for adaptable coaching; BDP optimises for time-boxed mastery and consistency.",
    },
    {
      question: "How much does Busy Dad Training cost?",
      answer:
        `Busy Dad Training is ${appPricing.monthly.display} or ${appPricing.annual.display} (${appPricing.annual.effectiveMonthly}). Freeletics, Thenx, and Perigee use freemium or subscription models with varying tiers. Boostcamp is free for logging with many paid program templates. Pricing changes — verify on the App Store or Google Play before subscribing.`,
    },
    {
      question: "Which app is best for calisthenics at home?",
      answer:
        "Thenx and Chris Heria (Heria Pro) are the clearest calisthenics-first options, especially if you have a pull-up bar. Busy Dad Training is bodyweight but focuses on burpee capacity rather than skills like muscle-ups or handstands.",
    },
    {
      question: "Can you build muscle with 20-minute home workouts?",
      answer:
        "Yes — if intensity and progression are built in. Short sessions work when exercises are compound, standards rise over time, and you show up consistently. Busy Dad Training's level system encodes that progression; other apps rely on volume, skill practice, or heavier loads over longer sessions.",
    },
  ],
} as const;

export type GuideFaq = (typeof bestHomeWorkoutAppsPage.faqs)[number];
