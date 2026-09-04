/**
 * Shared shape for every app-roundup guide on the site
 * (best-home-workout-apps, best-burpee-apps, best-bodyweight-apps).
 *
 * Keeping one type means the guide components in src/components/guides can
 * render any roundup, and the JSON-LD helpers in src/lib/seo.ts can build
 * ItemList / Review / FAQ schema for all of them the same way.
 */
export interface GuideApp {
  id: string;
  name: string;
  websiteUrl: string;
  /** Store listing to cite; keeps the roundup verifiable. */
  appStoreUrl?: string;
  googlePlayUrl?: string;
  isOwnProduct: boolean;
  sessionLength: string;
  equipment: string;
  focus: string;
  price: string;
  /** Free-text platform note, e.g. "iOS & Android", "Android only". */
  platforms?: string;
  /** Store rating snapshot, e.g. "4.7 (170 reviews, Google Play)". */
  ratingNote?: string;
  summary: string;
  pros: readonly string[];
  cons: readonly string[];
  bestFor: string;
}

export interface GuideCriterion {
  label: string;
  description: string;
}

export interface GuidePick {
  label: string;
  appId: string;
  reason: string;
}

export interface GuideFaq {
  question: string;
  answer: string;
}

export interface GuideColumn {
  key: "sessionLength" | "equipment" | "focus" | "price" | "platforms" | "ratingNote";
  label: string;
}

export interface GuideData {
  path: string;
  datePublished: string;
  dateModified: string;
  seo: {
    title: string;
    description: string;
    keywords: readonly string[];
  };
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    backgroundImage: string;
  };
  intro: {
    title: string;
    paragraphs: readonly string[];
  };
  criteria: {
    title: string;
    items: readonly GuideCriterion[];
  };
  comparisonColumns: readonly GuideColumn[];
  apps: readonly GuideApp[];
  bestForPicks: {
    title: string;
    picks: readonly GuidePick[];
  };
  whyBdp: {
    title: string;
    paragraphs: readonly string[];
    internalLinks: readonly { label: string; href: string }[];
  };
  faqs: readonly GuideFaq[];
  /** Short breadcrumb label. */
  breadcrumbLabel: string;
  /** Name used in the ItemList schema. */
  listName: string;
}
