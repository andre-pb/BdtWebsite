import { appPricing, appStores } from "@/content/site";

export interface ComparisonApp {
  id: string;
  name: string;
  websiteUrl: string;
  sessionLength: string;
  equipment: string;
  focus: string;
  price: string;
  summary: string;
  pros: string[];
  cons: string[];
  bestFor: string;
}

export interface ComparisonPageData {
  competitor: ComparisonApp;
  path: string;
  datePublished: string;
  dateModified: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
  };
  whyBdpWins: string[];
  whereCompetitorWins: string[];
  verdict: string;
  faqs: { question: string; answer: string }[];
}

const bdtApp = {
  id: "busy-dad-training",
  name: "Busy Dad Training",
  websiteUrl: "https://busydadtraining.com/",
  appStoreUrl: appStores.appStoreUrl,
  sessionLength: "20 min, 4×/week",
  equipment: "None (bodyweight burpees only)",
  focus: "Minimalist burpee programme, level progression, tracking",
  price: appPricing.tableLabel,
  summary: `Busy Dad Training is a short home workout app for men built around two compound burpee movements and a strict 80-minute weekly budget (4 × 20-minute sessions). A four-tier level system unlocked by Landmark Workouts. ${appPricing.summary}.`,
  pros: [
    "Fixed 20-minute sessions with no decision fatigue.",
    "No equipment, train anywhere.",
    "Clear level progression with objective benchmarks.",
    `${appPricing.tableLabel} (${appPricing.annual.effectiveMonthly}).`,
    "Full app: timer, level tracking, community.",
  ],
  cons: [
    "Narrow exercise menu: two movements only.",
    "Not for those who want exercise variety or barbell work.",
    "Upper levels are demanding; Graduation is a long-term goal.",
  ],
  bestFor: "Busy dads who want ruthless efficiency and bodyweight strength without a gym.",
};

export const freeleticsComparison: ComparisonPageData = {
  competitor: {
    id: "freeletics",
    name: "Freeletics",
    websiteUrl: "https://www.freeletics.com/",
    sessionLength: "15–50 min",
    equipment: "Bodyweight + optional equipment",
    focus: "AI coach, HIIT, strength, personalised plans (Coach+ conversational AI included in Coach)",
    price: "Limited free tier + Coach from ~$34.99 (term varies)",
    summary:
      "Freeletics pairs bodyweight HIIT with an AI coach that adapts plans over time, and its conversational Coach+ assistant (included in the Coach subscription, not a separate tier) makes AI the core differentiator. Workouts run 15–45 minutes, with optional equipment tracks. One of the best-known home workout apps for men, with 10M+ Android installs.",
    pros: [
      "Strong brand and large workout library.",
      "AI Coach personalises volume and exercise selection.",
      "Works well for general conditioning and fat loss.",
    ],
    cons: [
      "The Coach subscription starts around $34.99 depending on term, significantly more expensive than BDT.",
      "The AI-heavy approach means less human coaching feel and more algorithm-driven decisions.",
      "Less rigid weekly structure than a fixed 80-minute programme.",
    ],
    bestFor: "Men who want AI-guided, varied HIIT/strength and don't mind a premium subscription.",
  },
  path: "/comparisons/freeletics-vs-busy-dad-training/",
  datePublished: "2026-06-15",
  dateModified: "2026-09-03",
  seo: {
    title: "Freeletics vs Busy Dad Training (2026): AI Coach or Human-Designed Programme?",
    description:
      "Freeletics vs Busy Dad Training head-to-head: AI-guided HIIT with the Coach+ AI assistant vs disciplined 20-minute burpee minimalism. Which short home workout app for men is right for you?",
    keywords: [
      "Freeletics vs Busy Dad Training",
      "Freeletics alternative for dads",
      "Busy Dad Training vs Freeletics",
      "Freeletics vs BDT",
      "Freeletics Coach+ alternative",
      "best home workout app for men",
      "Freeletics bodyweight review",
      "busy dad workout app comparison",
      "AI fitness app vs human coaching",
    ],
  },
  hero: {
    eyebrow: "App Comparison",
    title: "Freeletics vs Busy Dad Training",
    intro:
      "Two popular home workout apps for men, but they take very different approaches. Freeletics gives you an AI coach and broad exercise variety. Busy Dad Training gives you two movements, a strict 80-minute weekly budget, and a four-tier level system. Here's how they compare.",
  },
  whyBdpWins: [
    "Fixed 20-minute sessions with no equipment needed. You can train in a hotel room, your garage, or your living room.",
    "Clear objective progression: pass a Landmark Workout, unlock the next level. No algorithm deciding what you should do. A real programme designed by a real person.",
    "Lower price: £9.99/month or £99.99/year vs Freeletics Coach from around $34.99. You're paying for a programme, not an algorithm.",
    "No decision fatigue. Every session is the same format: two movements, 20 minutes. You just show up and work.",
  ],
  whereCompetitorWins: [
    "Freeletics has a much larger exercise library. If you get bored easily it offers more variety.",
    "The AI Coach adapts to your performance across many exercise types, not just two movements.",
    "Freeletics has a stronger brand presence and more social proof (260K+ ratings, larger user base).",
  ],
  verdict:
    "If you want a short home workout app with total variety and AI-driven coaching, Freeletics Coach (with its Coach+ AI assistant) is a premium option. If you want a disciplined, human-designed minimalist system optimised for busy schedules (no equipment, no algorithms, just 20 minutes of high-quality work controlled by you), Busy Dad Training is the better fit.",
  faqs: [
    {
      question: "What's the main difference between Freeletics and Busy Dad Training?",
      answer:
        "Freeletics offers broad exercise variety with an AI coach that personalises your plan, and its conversational Coach+ assistant goes even deeper into AI-driven training. Busy Dad Training offers disciplined, human-designed minimalism: two compound burpee movements, an 80-minute weekly budget, and level unlocks via Landmark Workouts. Freeletics optimises for adaptable AI coaching; BDT optimises for time-boxed mastery and consistency without an algorithm telling you what to do.",
    },
    {
      question: "Is Busy Dad Training cheaper than Freeletics?",
      answer:
        `Busy Dad Training is ${appPricing.summary} with a 14-day free trial. Freeletics uses a freemium model: the free tier is limited and the full AI Coach experience requires a subscription. Exact pricing varies by region and plan.`,
    },
    {
      question: "Can I do Freeletics workouts in 20 minutes?",
      answer:
        "Yes, many Freeletics HIIT workouts fit in 15–30 minutes. However the session length varies by workout type, and Freeletics doesn't enforce a fixed weekly time budget like Busy Dad Training's 80-minute cap.",
    },
    {
      question: "Which app is better for busy dads with no equipment?",
      answer:
        "Both can work, but Busy Dad Training is specifically designed for this scenario: no equipment, exactly 20 minutes, no decisions. Freeletics works too but is designed for a broader audience with optional equipment tracks.",
    },
  ],
};

export const boostcampComparison: ComparisonPageData = {
  competitor: {
    id: "boostcamp",
    name: "Boostcamp",
    websiteUrl: "https://www.boostcamp.app/",
    sessionLength: "45–90 min",
    equipment: "Mostly gym / strength equipment",
    focus: "Programme marketplace + workout tracking",
    price: "Free + Pro $14.99/mo or $59.99/yr",
    summary:
      "Boostcamp is a marketplace for popular lifting and hypertrophy programs (Reddit PPL, 5/3/1, etc.). You pick a template and log sets. Ideal when you already know you want barbell work.",
    pros: [
      "Large library of proven strength templates.",
      "Free to log workouts; many programmes are affordable one-offs.",
      "Community reviews help you choose a plan.",
    ],
    cons: [
      "Typical programmes are not short, often 60+ minutes.",
      "Requires gym equipment for most top programmes.",
      "Less hand-holding than coached apps.",
    ],
    bestFor: "Men running barbell programmes who want flexible templates, not a 20-minute cap.",
  },
  path: "/comparisons/boostcamp-vs-busy-dad-training/",
  datePublished: "2026-06-15",
  dateModified: "2026-06-15",
  seo: {
    title: "Boostcamp vs Busy Dad Training (2026): Home Workout or Gym Programme?",
    description:
      "Boostcamp vs Busy Dad Training: programme marketplace for lifters vs minimalist bodyweight for busy dads. Which home workout app for men matches your lifestyle?",
    keywords: [
      "Boostcamp vs Busy Dad Training",
      "Boostcamp alternative for dads",
      "Busy Dad Training vs Boostcamp",
      "best home workout app without gym",
      "bodyweight app vs gym programme",
      "Boostcamp review 2026",
    ],
  },
  hero: {
    eyebrow: "App Comparison",
    title: "Boostcamp vs Busy Dad Training",
    intro:
      "Boostcamp and Busy Dad Training target completely different training styles. Boostcamp is a marketplace for strength programmes; Busy Dad Training is a fixed minimalist bodyweight system. Here's how they compare for busy men.",
  },
  whyBdpWins: [
    "No equipment needed. Busy Dad Training is pure bodyweight. Boostcamp assumes barbells and dumbbells for most programmes.",
    "Short fixed sessions: 20 minutes vs the 45–90 minute sessions typical on Boostcamp.",
    "No programme selection required. BDP tells you exactly what to do each session. Boostcamp requires choosing and following a template.",
    "Lower commitment: £9.99/month vs Boostcamp Pro at $14.99/month (plus potentially higher gym costs).",
  ],
  whereCompetitorWins: [
    "Boostcamp offers proven strength programmes (5/3/1, nSuns, GZCL) that build raw strength and size effectively.",
    "Boostcamp is free for basic logging; only Pro features require payment.",
    "If you already have a gym membership and want structured lifting, Boostcamp is the obvious choice.",
  ],
  verdict:
    "These apps are not direct competitors; they solve different problems. If you have gym access and want heavy barbell work, choose Boostcamp. If you want the shortest credible full-body workout at home with no equipment, choose Busy Dad Training.",
  faqs: [
    {
      question: "Can Boostcamp be used for home workouts?",
      answer:
        "Some Boostcamp programmes work with bodyweight or minimal equipment, but the platform is designed for gym-based strength training. Most popular templates (5/3/1, nSuns, GZCL) require barbells and racks.",
    },
    {
      question: "Which app is more affordable for home training?",
      answer:
        `Busy Dad Training is ${appPricing.summary} including a 14-day free trial. Boostcamp is free for basic logging, with Pro at $14.99/month. However Boostcamp programmes often require gym access, adding cost.`,
    },
    {
      question: "How long are typical Boostcamp workouts?",
      answer:
        "Most Boostcamp programmes prescribe 45–90 minute sessions. This contrasts with Busy Dad Training's fixed 20-minute sessions, a significant difference for busy dads with limited time.",
    },
  ],
};

export const thenxComparison: ComparisonPageData = {
  competitor: {
    id: "thenx",
    name: "Thenx",
    websiteUrl: "https://thenx.com/",
    sessionLength: "Varies, often 20–45 min",
    equipment: "Bodyweight / calisthenics equipment optional",
    focus: "Calisthenics skills, programmes, progressions (pivoting to creator economy)",
    price: "Premium plan $19.99/mo or $119.99/yr",
    summary:
      "Thenx offers calisthenics workouts and skill paths (beginner to advanced) with follow-along videos. However, the team is increasingly focused on their 'Streamer University' pivot into the creator economy and gaming space; the fitness app is no longer their primary focus. Their Google Play rating (3.83★) reflects user frustration with this shift.",
    pros: [
      "Structured skill progressions with technique breakdowns.",
      "Workouts can be relatively short for technique sessions.",
      "Large YouTube community (13.2M combined subs), though less app-focused now.",
    ],
    cons: [
      "Pull-up bar strongly recommended for full value.",
      "Declining app focus as the company pivots to creator economy (Streamer University).",
      "Higher subscription price than BDT ($19.99/mo vs £9.99/mo) with a 3.83★ rating.",
    ],
    bestFor: "Men who want calisthenics variety and skill goals with a bar at home, but the company's attention is elsewhere.",
  },
  path: "/comparisons/thenx-vs-busy-dad-training/",
  datePublished: "2026-06-15",
  dateModified: "2026-07-28",
  seo: {
    title: "Thenx vs Busy Dad Training (2026): Fading App or Focused Programme?",
    description:
      "Thenx vs Busy Dad Training: calisthenics brand pivoting to creator economy (3.83★) vs actively maintained burpee programme. Which home workout app for men is worth your money?",
    keywords: [
      "Thenx vs Busy Dad Training",
      "Thenx alternative for dads",
      "Busy Dad Training vs Thenx",
      "calisthenics app vs burpee app",
      "Thenx review 2026",
      "Thenx Streamer University pivot",
      "best bodyweight workout app",
      "Thenx vs BDT comparison",
      "Thenx rating 3.83",
    ],
  },
  hero: {
    eyebrow: "App Comparison",
    title: "Thenx vs Busy Dad Training",
    intro:
      "Thenx and Busy Dad Training both sit in the bodyweight space, but their philosophies differ. Thenx is about calisthenics skills and variety; Busy Dad Training is about disciplined burpee mastery. Here's how they compare for busy men training at home.",
  },
  whyBdpWins: [
    "No equipment at all, not even a pull-up bar. Train anywhere.",
    "Fixed 20-minute sessions with zero planning. Thenx sessions vary and often assume you have time for longer skill work.",
    "Lower price: £9.99/month vs Thenx Premium at $19.99/month, less than half the cost for a programme with a 3.83★ user rating.",
    "Single clear goal: progress through the levels. No choice paralysis between 50 different skill paths. And unlike Thenx, the app is the company's focus, not a side project.",
    "The company behind it is 100% committed to fitness, not pivoting to gaming or the creator economy.",
  ],
  whereCompetitorWins: [
    "Thenx offers pull-up and dip progression that builds upper body mass and skill in ways burpees alone cannot.",
    "Larger YouTube presence (13.2M subs) and established brand in street workout culture.",
    "Follow-along video library for dozens of exercises, though app updates are slowing.",
  ],
  verdict:
    "If you have a pull-up bar and want calisthenics skill variety with the backing of a big YouTube brand, Thenx is an option, but the company is clearly pivoting away from fitness toward the creator economy, and their 3.83★ rating reflects user frustration. If you want a focused, actively maintained, no-equipment system (20 minutes, two movements, four levels), Busy Dad Training is more focused, more affordable, and not a side project.",
  faqs: [
    {
      question: "Do I need equipment for Thenx?",
      answer:
        "Thenx works best with a pull-up bar. Many programmes and skill progressions assume bar access. Busy Dad Training requires zero equipment.",
    },
    {
      question: "Which app is better for pure bodyweight training?",
      answer:
        "Both offer bodyweight training, but they've diverged. Thenx is now primarily a creator-economy brand (Streamer University) with a fitness app on the side, rated 3.83★. Busy Dad Training is a dedicated fitness app with ongoing updates, a clear level system, and no distraction from other ventures.",
    },
    {
      question: "Is Thenx more expensive than Busy Dad Training?",
      answer:
        `Thenx Premium is $19.99/month or $119.99/year. Busy Dad Training is ${appPricing.summary}. That's less than half the cost for a focused programme that isn't losing developer attention to a gaming pivot.`,
    },
  ],
};