// "Goes well with" links for the RelatedGuides block. One registry so every
// page describes the others the same way, and a page can never link to
// itself (relatedFor() filters the current path out).

export type RelatedGuideLink = {
  href: string;
  title: string;
  description: string;
};

export const relatedGuides = {
  movements: {
    href: "/movements/",
    title: "The Two Sacred Movements",
    description: "The 6-count and Navy Seal burpee, count by count, with tutorial videos.",
  },
  levels: {
    href: "/levels/",
    title: "The Four Levels",
    description: "From Level 1A to Graduation, and the exact reps each Landmark Workout asks for.",
  },
  principles: {
    href: "/principles/",
    title: "The Principles",
    description: "Simplicity, efficiency, intentionality: why the programme is built the way it is.",
  },
  navySealBurpee: {
    href: "/navy-seal-burpee/",
    title: "What is a Navy Seal burpee?",
    description: "The 10-count movement defined, muscles worked, mistakes, and the benchmarks per level.",
  },
  sixCountBurpee: {
    href: "/6-count-burpee/",
    title: "What is a 6-count burpee?",
    description: "The military burpee in six counts, how it differs from a CrossFit burpee, and the 20-minute standards.",
  },
  twentyMinuteGuide: {
    href: "/20-minute-home-workout-for-busy-dads/",
    title: "20-Minute Home Workout for Busy Dads",
    description: "A complete session you can do today, plus the weekly plan it fits into.",
  },
  comparisons: {
    href: "/comparisons/",
    title: "App Comparisons",
    description: "Busy Dad Training head-to-head with Freeletics, Boostcamp, Thenx and more.",
  },
  pricing: {
    href: "/pricing/",
    title: "Pricing",
    description: "One plan with everything included, and how the free trial works.",
  },
  faq: {
    href: "/faq/",
    title: "FAQ",
    description: "Every common question about the app, the programme and the movements.",
  },
  about: {
    href: "/about/",
    title: "About Max",
    description: "The creator of the programme and the 80-minute rule it started from.",
  },
  community: {
    href: "/community/",
    title: "The Busy Dad Army",
    description: "Real stories from members and the live burpee leaderboard.",
  },
} as const satisfies Record<string, RelatedGuideLink>;

export type RelatedGuideKey = keyof typeof relatedGuides;

/** The requested links, minus whichever one is the current page. */
export function relatedFor(currentPath: string, keys: readonly RelatedGuideKey[]): RelatedGuideLink[] {
  return keys.map((key) => relatedGuides[key]).filter((link) => link.href !== currentPath);
}
