import { appPricing } from "@/content/site";
import { navySealBurpeePage, sixCountBurpeePage } from "@/content/burpee-terms";
import { freeleticsComparison, boostcampComparison, thenxComparison } from "@/content/comparisons";

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface FaqGroup {
  id: string;
  title: string;
  items: readonly FaqEntry[];
}

/** FAQs shown on the home page (and reused on /faq/). */
export const homeFaqs: readonly FaqEntry[] = [
  {
    question: "What is Busy Dad Training?",
    answer:
      "Busy Dad Training is a short home workout app for men built around two bodyweight movements: the 6-count military burpee and the Navy Seal burpee. Train 20 minutes a session, 4 times a week. No equipment, no gym required.",
  },
  {
    question: "Is Busy Dad Training suitable for beginners?",
    answer:
      "Yes. The programme has a four-tier level system starting from Level 1A, designed for complete beginners. You progress at your own pace through Landmark Workouts.",
  },
  {
    question: "How much does Busy Dad Training cost?",
    answer: `Busy Dad Training costs ${appPricing.monthly.display} or ${appPricing.annual.display} (${appPricing.annual.effectiveMonthly}). A 14-day free trial is included.`,
  },
  {
    question: "Do I need any equipment for Busy Dad Training?",
    answer:
      "No. The programme uses only bodyweight movements: the 6-count military burpee and the Navy Seal burpee. No gym, no weights, no equipment required.",
  },
  {
    question: "How long are Busy Dad Training workouts?",
    answer:
      "Each workout is exactly 20 minutes. The programme recommends 4 sessions per week for a total of 80 minutes of training per week.",
  },
  {
    question: "Is Busy Dad Training available on iOS and Android?",
    answer: "Yes. Busy Dad Training is available on both the Apple App Store and Google Play Store.",
  },
];

const appFaqs: readonly FaqEntry[] = [
  ...homeFaqs,
  {
    question: "Is there a free trial?",
    answer:
      "Yes. Every new subscription starts with a 14-day free trial of the full app. Cancel before the trial ends and you are not charged.",
  },
  {
    question: "How do I cancel my Busy Dad Training subscription?",
    answer:
      "Subscriptions are managed by Apple or Google, not by us. On iPhone go to Settings → your name → Subscriptions; on Android open Google Play → Profile → Payments & subscriptions. Cancel there and you keep access until the end of the paid period.",
  },
  {
    question: "Who is Busy Dad Training for?",
    answer:
      "Busy people who want to get and stay fit in 80 minutes a week without a gym: busy dads above all, but the programme is used by men and women of all ages, from complete beginners at Level 1A to elite practitioners working towards Graduation.",
  },
  {
    question: "Who created Busy Dad Training?",
    answer:
      "Max Edwards. He built the programme after fatherhood forced him to cap training at 80 minutes a week, shared it as follow-along YouTube workouts, and turned it into the app when the Busy Dad Army community grew. The app is built and run by a small team in the UK.",
  },
  {
    question: "What does the app actually do?",
    answer:
      "It sets your weekly plan (four 20-minute sessions with rep targets for each movement), runs the 20-minute timer for every workout and Landmark Workout, tracks your level from 1A to Graduation, records personal bests, streaks and total burpees, and connects you to the Busy Dad Army leaderboard and community feed.",
  },
  {
    question: "Can I follow the Busy Dad Program without the app?",
    answer:
      "The method is public: the principles, both movements and every level's Landmark Workout targets are on this site and the tutorial videos are free on YouTube. The app adds the timer, weekly targets, level tracking and community. Many practitioners start with the videos and move to the app when they want structure.",
  },
];

const programmeFaqs: readonly FaqEntry[] = [
  {
    question: "What are the three principles of Busy Dad Training?",
    answer:
      "Simplicity, efficiency and intentionality. Simplicity means training only two compound movements. Efficiency means a strict weekly training budget of 80 minutes. Intentionality means every minute of every workout is aimed at a specific goal within the four-tiered level system.",
  },
  {
    question: "Why does the Busy Dad Program only use two movements?",
    answer:
      "Because two compound movements that recruit the whole body beat an endless library of isolation exercises. The aim is excellence in the 6-count and Navy Seal burpees, not breadth across many movements. Fewer choices also means fewer skipped workouts.",
  },
  {
    question: "How long should I train each week?",
    answer:
      "Exactly 80 minutes: not a minute more, not a minute less. The preferred split is four 20-minute sessions, two of 6-counts and two of Navy Seals, but you can divide the 80 minutes however you like.",
  },
  {
    question: "Is 80 minutes a week really enough to get fit?",
    answer:
      "Yes, provided every minute is high quality. The restrictive budget forces deliberate, goal-directed training, and that intensity is what produces results. 80 minutes of vigorous activity also sits inside the WHO's recommended 75–150 minutes per week.",
  },
  {
    question: "What are the four levels of the Busy Dad Program?",
    answer:
      "Level 1 (subdivided into 1A, 1B, 1C and 1D), Level 2 (2A, 2B), Level 3 (3A, 3B), Level 4 (4A, 4B) and then Graduation. Each level is unlocked by two Landmark Workouts: a 20-minute 6-count workout and a 20-minute Navy Seal workout with set rep targets.",
  },
  {
    question: "What is a Landmark Workout?",
    answer:
      "The benchmark that unlocks each level: as many reps of one movement as you can complete in a strict 20-minute window, every count called out. Level 1B, for example, is 50 6-counts and 20 Navy Seals; Graduation is 325 6-counts and 150 Navy Seals, completed in the same week.",
  },
  {
    question: "How long does it take to progress through the levels?",
    answer:
      "It depends on your starting fitness and consistency. Early sublevels can take weeks, later levels take months, and Graduation can take years and has been reached by only a small elite. The programme is designed to be trained for years, not finished in 30 days.",
  },
  {
    question: "Can I build muscle with bodyweight-only training?",
    answer:
      "Yes. The Navy Seal burpee delivers three full push-ups per rep plus plank and knee-drive work for the back and core; at Level 2A that is 240 push-ups in 20 minutes. Practitioners typically see the most visible change in chest, shoulders and arms. The 6-count builds legs, conditioning and work capacity.",
  },
];

const movementFaqs: readonly FaqEntry[] = [
  sixCountBurpeePage.faqs[0],
  navySealBurpeePage.faqs[0],
  sixCountBurpeePage.faqs[1],
  navySealBurpeePage.faqs[2],
  navySealBurpeePage.faqs[3],
  {
    question: "How should I split my training time between the two movements?",
    answer:
      "On a standard week, evenly: 40 minutes of 6-count training and 40 minutes of Navy Seal training, ideally as two 20-minute sessions of each.",
  },
];

const comparisonFaqs: readonly FaqEntry[] = [
  {
    question: "How is Busy Dad Training different from Freeletics?",
    answer:
      "Freeletics generates varied AI-driven HIIT workouts from a 700+ exercise library and sells an AI Coach subscription. Busy Dad Training uses two defined movements, a fixed 80-minute week and objective level benchmarks, for £9.99/month. Freeletics optimises for variety; BDT for time-boxed mastery and consistency.",
  },
  {
    question: "How is Busy Dad Training different from Thenx or Heria Pro?",
    answer:
      "Thenx and Heria Pro are calisthenics skill apps (muscle-ups, handstands, planche) that work best with a pull-up bar and rings. Busy Dad Training is floor-only at every level and measures fitness in burpee reps per 20 minutes rather than skills.",
  },
  {
    question: "How is Busy Dad Training different from Boostcamp?",
    answer:
      "Boostcamp is a marketplace of gym programmes from many coaches, mostly barbell and dumbbell work in 45–90-minute sessions. Busy Dad Training is one bodyweight programme with 20-minute sessions and no equipment.",
  },
  {
    question: "What is the best burpee workout app?",
    answer:
      "For a complete burpee programme with levels and a defined movement standard, Busy Dad Training. For a free timer on Android, BeStronger's Burpee Workout. For automatic counting on Apple Watch, BurBur. Our 2026 burpee app roundup compares six apps in detail.",
  },
  freeleticsComparison.faqs[0],
  boostcampComparison.faqs[0],
  thenxComparison.faqs[0],
];

export const faqPage = {
  path: "/faq/",
  datePublished: "2026-09-03",
  dateModified: "2026-09-03",
  seo: {
    title: "Busy Dad Training FAQ: Pricing, Programme, Movements and Comparisons",
    description:
      "Every common question about Busy Dad Training answered in one place: what it costs, how the 80-minute week and four levels work, what the 6-count and Navy Seal burpees are, and how it compares to Freeletics, Thenx and Boostcamp.",
    keywords: [
      "busy dad training faq",
      "busy dad training questions",
      "busy dad training cost",
      "busy dad training review",
      "is busy dad training worth it",
      "busy dad program",
      "80 minutes a week workout",
    ],
  },
  hero: {
    eyebrow: "Help & Answers",
    title: "Busy Dad Training: Frequently Asked Questions",
    intro:
      "Straight answers about the app, the programme, the two movements and how we compare to other home workout apps. If your question is not here, email hello@busydadtraining.com.",
  },
  groups: [
    { id: "app", title: "The app, pricing and trial", items: appFaqs },
    { id: "programme", title: "The programme: 80 minutes, four levels", items: programmeFaqs },
    { id: "movements", title: "The movements", items: movementFaqs },
    { id: "comparisons", title: "Compared to other apps", items: comparisonFaqs },
  ] as const satisfies readonly FaqGroup[],
} as const;

export const allFaqs: readonly FaqEntry[] = faqPage.groups.flatMap((g) => g.items);
