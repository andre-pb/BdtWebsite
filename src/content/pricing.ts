import { appPricing } from "@/content/site";

export const pricingPage = {
  path: "/pricing/",
  datePublished: "2026-09-03",
  dateModified: "2026-09-03",
  seo: {
    title: "Busy Dad Training Pricing: £9.99/month or £99.99/year, 14-Day Free Trial",
    description:
      `Busy Dad Training costs ${appPricing.monthly.display} or ${appPricing.annual.display} (${appPricing.annual.effectiveMonthly}), with a 14-day free trial. One plan, everything included: the full programme, 20-minute timer, level tracking and the Busy Dad Army community.`,
    keywords: [
      "busy dad training price",
      "busy dad training cost",
      "how much is busy dad training",
      "busy dad training subscription",
      "busy dad training free trial",
      "busy dad training cancel subscription",
      "workout app price comparison",
    ],
  },
  hero: {
    eyebrow: "Pricing",
    title: "Simple pricing. Everything included.",
    intro: `Busy Dad Training is ${appPricing.summary}. Every plan starts with a 14-day free trial and includes the whole app. No tiers, no add-ons, no ads.`,
  },
  plans: [
    {
      id: "monthly",
      name: "Monthly",
      price: appPricing.monthly.display,
      note: "Billed monthly. Cancel anytime.",
      bestFor: "Trying the programme with no commitment.",
    },
    {
      id: "annual",
      name: "Annual",
      price: appPricing.annual.display,
      note: `${appPricing.annual.effectiveMonthly}. Save 17% vs monthly.`,
      bestFor: "Committed practitioners. Most members choose this.",
      highlight: true,
    },
  ],
  included: {
    title: "What every plan includes",
    items: [
      "The complete Busy Dad Program: two movements, four 20-minute sessions a week, four levels from 1A to Graduation.",
      "Weekly plan with rep targets for each movement that update from your results.",
      "20-minute workout timer for every session and Landmark Workout, plus a custom timer.",
      "Level tracking, personal records, streaks, total burpees and weekly charts.",
      "The Busy Dad Army: global leaderboard (week, month, year) and community feed.",
      "Both iOS and Android, one subscription.",
      "All future updates.",
    ],
  },
  trial: {
    title: "How the 14-day free trial works",
    paragraphs: [
      "Download the app, create an account and start the trial from either the App Store or Google Play. You get the full app for 14 days. Cancel before the trial ends and you are not charged; do nothing and the plan you chose starts automatically.",
      "Subscriptions are billed and managed by Apple or Google, so cancelling, switching plans and refunds all happen in your App Store or Google Play subscription settings, not in the app.",
    ],
  },
  comparison: {
    title: "How the price compares to other home workout apps",
    intro:
      "US-store prices checked in September 2026; regional pricing varies. Included for context, not as a like-for-like feature comparison.",
    rows: [
      { app: "Busy Dad Training", price: `${appPricing.monthly.display} or ${appPricing.annual.display} (US: $9.99 / $99.99)`, note: "Full programme, timer, levels, community; 14-day trial" },
      { app: "Freeletics Coach", price: "from ~$34.99 (term varies)", note: "AI-generated plans; limited free tier" },
      { app: "Seven (7 Club)", price: "$9.99/mo or $79.99/yr", note: "Seven-minute workouts; usable free tier" },
      { app: "Thenx", price: "$9.99–$19.99/mo, $89.99–$119.99/yr", note: "Calisthenics skills; needs a bar" },
      { app: "Heria Pro", price: "$11.99/mo or $119.99/yr", note: "Calisthenics; no annual discount" },
      { app: "Madbarz", price: "$9.99/mo (Android), $12.49/mo (iOS)", note: "Workout builder" },
      { app: "Nike Training Club", price: "Free", note: "Video library; no progression model" },
    ],
  },
  faqs: [
    {
      question: "How much does Busy Dad Training cost?",
      answer: `Busy Dad Training costs ${appPricing.monthly.display} or ${appPricing.annual.display}, which works out at ${appPricing.annual.effectiveMonthly}. Both plans include a 14-day free trial and the full app.`,
    },
    {
      question: "Is Busy Dad Training free?",
      answer:
        "The app is free to download and every subscription starts with a 14-day free trial of everything. After the trial it is a paid subscription; there is no permanently free tier. The programme itself (principles, movements, levels and tutorial videos) is published free on this site and on YouTube.",
    },
    {
      question: "Is there a discount for paying annually?",
      answer: `Yes. The annual plan is ${appPricing.annual.display}, about 17% less than twelve months of the monthly plan, and works out at ${appPricing.annual.effectiveMonthly}.`,
    },
    {
      question: "What does Busy Dad Training cost in the US?",
      answer:
        "$9.99 per month or $99.99 per year on the US App Store and Google Play, the same figures as the UK price in pounds. In other countries Apple and Google set a local equivalent, so the exact figure at checkout depends on your store region.",
    },
    {
      question: "How do I cancel?",
      answer:
        "In your App Store or Google Play subscription settings. On iPhone: Settings → your name → Subscriptions → Busy Dad Training → Cancel. On Android: Google Play → Profile → Payments & subscriptions → Subscriptions. You keep access until the end of the period you have paid for.",
    },
    {
      question: "Can I get a refund?",
      answer:
        "Refunds are handled by Apple and Google under their own policies, because they process the payment. Request one through reportaproblem.apple.com or the Google Play order history. If you are stuck, email hello@busydadtraining.com and we will point you in the right direction.",
    },
    {
      question: "Are there promo codes or offers?",
      answer:
        "We occasionally run offers for new members, for example an extended free trial, announced on the website and to the newsletter. If a promotion is live it will be shown on the home page.",
    },
    {
      question: "Is Busy Dad Training worth it compared to free apps?",
      answer:
        "If you want a free video library, Nike Training Club is excellent and costs nothing. Busy Dad Training is worth paying for if you want a programme: weekly targets, a fixed 20-minute test at every level, and a community that keeps you honest, for about the price of one coffee a week on the annual plan.",
    },
  ],
} as const;
