import type { Metadata } from "next";
import { aboutPage } from "@/content/about";
import { appPricing, appStores, appScreenshots, seo, site, youtube } from "@/content/site";
import { movementsPage } from "@/content/movements";
import { levelsPage } from "@/content/levels";
import { bestHomeWorkoutAppsPage } from "@/content/best-home-workout-apps";

const siteUrl = site.url;

export function getAppOffersJsonLd() {
  return [
    {
      "@type": "Offer",
      price: String(appPricing.monthly.amount),
      priceCurrency: appPricing.monthly.currency,
      description: appPricing.monthly.display,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: String(appPricing.monthly.amount),
        priceCurrency: appPricing.monthly.currency,
        billingDuration: "P1M",
      },
    },
    {
      "@type": "Offer",
      price: String(appPricing.annual.amount),
      priceCurrency: appPricing.annual.currency,
      description: appPricing.annual.display,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: String(appPricing.annual.amount),
        priceCurrency: appPricing.annual.currency,
        billingDuration: "P1Y",
      },
    },
  ];
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalized}`;
}

export function createPageMetadata({
  title,
  description,
  path,
  ogImage = seo.ogImage,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  keywords?: string[];
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    keywords: keywords ?? [...seo.keywords],
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: "en_GB",
      url,
      siteName: site.name,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: seo.title,
    template: `%s | ${site.name}`,
  },
  description: seo.description,
  keywords: [...seo.keywords],
  applicationName: site.name,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: site.name,
    title: seo.title,
    description: seo.description,
    images: [
      {
        url: seo.ogImage,
        width: 1200,
        height: 630,
        alt: seo.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: [seo.ogImage],
  },
  icons: {
    icon: [
      { url: site.favicon.ico },
      { url: site.favicon.png32, sizes: "32x32", type: "image/png" },
      { url: site.favicon.png16, sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: site.favicon.apple, sizes: "180x180", type: "image/png" }],
  },
  category: "fitness",
};

export function getSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: site.name,
        description: seo.description,
        inLanguage: "en-GB",
        publisher: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: site.name,
        url: siteUrl,
        description: seo.description,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl(site.logo.src),
          width: site.logo.width,
          height: site.logo.height,
        },
        founder: { "@id": `${siteUrl}/#max-edwards` },
        sameAs: [youtube.url, appStores.appStoreUrl, appStores.googlePlayUrl],
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#max-edwards`,
        name: "Max Edwards",
        url: absoluteUrl("/about/"),
        jobTitle: "Founder & Creator",
        description:
          "Max Edwards is the creator of the Busy Dad Program, a minimalist bodyweight training system built around two compound burpee movements and a strict 80-minute weekly training budget. He developed the method after fatherhood forced a simpler approach to staying fit.",
        knowsAbout: [
          "Bodyweight training",
          "Burpees",
          "Minimalist fitness",
          "6-count military burpee",
          "Navy Seal burpee",
        ],
        worksFor: { "@id": `${siteUrl}/#organization` },
        // Add Max's personal profiles (Instagram, X, LinkedIn) here to
        // strengthen entity disambiguation for search engines and LLMs.
        sameAs: [youtube.url],
      },
      {
        "@type": "MobileApplication",
        "@id": `${siteUrl}/#app`,
        name: site.name,
        applicationCategory: "HealthApplication",
        operatingSystem: "iOS, Android",
        description: seo.description,
        offers: getAppOffersJsonLd(),
        downloadUrl: [appStores.appStoreUrl, appStores.googlePlayUrl],
      },
    ],
  };
}

export function getWebPageJsonLd({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  const url = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { "@id": `${siteUrl}/#website` },
    inLanguage: "en-GB",
  };
}

export function getBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function getHomePageJsonLd() {
  return [
    getWebPageJsonLd({
      title: seo.title,
      description: seo.description,
      path: "/",
    }),
  ];
}

export function getAboutVideoJsonLd() {
  const { featuredVideo } = aboutPage;

  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: featuredVideo.title,
    description: featuredVideo.description,
    thumbnailUrl: `https://i.ytimg.com/vi/${featuredVideo.videoId}/hqdefault.jpg`,
    uploadDate: featuredVideo.uploadDate,
    contentUrl: featuredVideo.videoUrl,
    embedUrl: `https://www.youtube.com/embed/${featuredVideo.videoId}`,
    publisher: { "@id": `${siteUrl}/#organization` },
  };
}

export function getExerciseProgramJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ExercisePlan",
    name: "Busy Dad Program",
    description:
      "A progressive bodyweight training programme built around two Sacred Movements: the 6-count military burpee and the Navy Seal burpee. Four 20-minute sessions per week.",
    provider: { "@id": `${siteUrl}/#organization` },
    activityDuration: "PT20M",
    category: "Bodyweight Training",
  };
}

const movementHowToSteps = {
  "six-count": [
    {
      name: "Counts 1–2: drop into a plank",
      text: "From standing, drop into a squat, place your hands on the ground, and kick your feet back into a plank position. The legs and posterior chain do the work here.",
    },
    {
      name: "Counts 3–4: push up",
      text: "Lower your chest to the ground and press back up to plank. This is where the upper body — chest, shoulders, triceps — takes the limelight.",
    },
    {
      name: "Counts 5–6: stand up",
      text: "Jump your feet back to your hands, then stand up. That's one repetition. Call out the count.",
    },
  ],
  "navy-seal": [
    {
      name: "Counts 1–2: drop into a plank",
      text: "From standing, drop into a squat, place your hands on the ground, and kick your feet back into a plank position.",
    },
    {
      name: "Counts 3–8: the upper-body work",
      text: "Move through the six-count upper-body sequence that engages core, chest, shoulders, triceps, scapula, traps, and lats. Call out every count.",
    },
    {
      name: "Counts 9–10: stand up",
      text: "Jump your feet back to your hands, then stand up. That's one repetition.",
    },
  ],
} as const;

export function getMovementsHowToJsonLd() {
  return movementsPage.sacredMovements.map((m) => {
    const steps = movementHowToSteps[m.id as keyof typeof movementHowToSteps];
    return {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: `How to Perform the ${m.title.replace(/^The /, "")}`,
      description: m.paragraphs[0],
      totalTime: m.id === "navy-seal" ? "PT8S" : "PT5S",
      video: {
        "@type": "VideoObject",
        name: m.video.label,
        thumbnailUrl: `https://i.ytimg.com/vi/${m.video.youtubeId}/hqdefault.jpg`,
        contentUrl: m.video.url,
        embedUrl: `https://www.youtube.com/embed/${m.video.youtubeId}`,
        uploadDate: "2024-01-01",
        description: m.paragraphs[0],
      },
      step: steps.map((s) => ({
        "@type": "HowToStep",
        name: s.name,
        text: s.text,
      })),
    };
  });
}

export function getPrinciplesFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What are the three principles of Busy Dad Training?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Busy Dad Program revolves around three principles: simplicity, efficiency, and intentionality. Simplicity means training only two compound movements rather than an endless library of exercises. Efficiency means a strict weekly training budget of 80 minutes. Intentionality means every minute of every workout is geared toward a specific training goal within the four-tiered level system.",
        },
      },
      {
        "@type": "Question",
        name: "Why does the Busy Dad Program only use two movements?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "BDP is a minimalist program. Rather than performing an endless library of isolation exercises, practitioners train two compound movements — the Sacred Movements — that recruit the whole body as an integrated system and activate every major muscle group. The aim is to cultivate excellence in those two movements, not breadth across many.",
        },
      },
      {
        "@type": "Question",
        name: "How long should I train each week on the Busy Dad Program?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Exactly 80 minutes per week — not a minute more, not a minute less. The preferred breakdown is four 20-minute sessions, but practitioners are free to divide the 80 minutes however they choose.",
        },
      },
      {
        "@type": "Question",
        name: "Is 80 minutes a week really enough to get fit?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Just 80 minutes per week is enough to see profound training results — provided every minute is of the highest possible quality. Because the training budget is so restrictive, every workout must be deliberate and goal-directed, and that intensity is what produces results.",
        },
      },
      {
        "@type": "Question",
        name: "Who created the Busy Dad Program?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Busy Dad Training was created by Max Edwards, who developed the program out of the conviction that two compound burpee variations — the 6-count military burpee and the Navy Seal burpee — yield all a person needs to build elite fitness and strength.",
        },
      },
    ],
  };
}

export function getMovementsFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What are the two Sacred Movements of the Busy Dad Program?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The two Sacred Movements are the 6-count military burpee and the Navy Seal burpee. Both are variations of the American military burpee. BDP practitioners train these two movements and very little else.",
        },
      },
      {
        "@type": "Question",
        name: "What is a 6-count military burpee?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The 6-count military burpee is a six-part compound movement that recruits every major muscle group. The core is engaged throughout. The legs and posterior chain work hardest at counts 1–2 and 5–6, and the upper body — chest, shoulders, triceps — takes over at counts 3–4. The 6-count excels at building leg strength and cardiovascular fitness.",
        },
      },
      {
        "@type": "Question",
        name: "What is a Navy Seal burpee?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Navy Seal burpee is a 10-count compound movement. Counts 1–2 and 9–10 are leg work; counts 3–8 are an upper-body sequence where the core, chest, shoulders, triceps, scapula, traps, and lats work together. No bodyweight movement builds upper-body strength and mass like the Navy Seal.",
        },
      },
      {
        "@type": "Question",
        name: "How is the American military burpee different from a CrossFit burpee?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The American military burpee has very little in common with the more familiar burpee popularised by CrossFit. Until recently it was a niche movement largely confined to the US military and prison culture. The Sacred Movements of BDP — the 6-count and the Navy Seal — are the two most effective variations of the American military burpee.",
        },
      },
      {
        "@type": "Question",
        name: "How should I split my training time between the two movements?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "On a standard week of BDP, the 80-minute weekly training budget is split evenly: 40 minutes of 6-count training and 40 minutes of Navy Seal training, ideally across four 20-minute sessions.",
        },
      },
    ],
  };
}

export function getLevelsItemListJsonLd() {
  const url = absoluteUrl("/levels/");
  const tierLevels = [
    levelsPage.level1,
    levelsPage.level2,
    levelsPage.level3,
    levelsPage.level4,
  ] as const;

  const itemListElement = [
    ...tierLevels.map((level, index) => {
      const firstSublevel = level.sublevels[0];
      const lastSublevel = level.sublevels[level.sublevels.length - 1];
      const description =
        "intro" in level && level.intro
          ? level.intro
          : firstSublevel.description;
      return {
        "@type": "ListItem",
        position: index + 1,
        name: level.title,
        url: `${url}#${level.id}`,
        item: {
          "@type": "Thing",
          name: level.title,
          description,
          additionalProperty: [
            {
              "@type": "PropertyValue",
              name: "Entry sublevel",
              value: firstSublevel.title,
            },
            {
              "@type": "PropertyValue",
              name: "Top sublevel",
              value: lastSublevel.title,
            },
          ],
        },
      };
    }),
    {
      "@type": "ListItem",
      position: tierLevels.length + 1,
      name: levelsPage.graduation.title,
      url: `${url}#graduation`,
      item: {
        "@type": "Thing",
        name: levelsPage.graduation.title,
        description: levelsPage.graduation.paragraphs[0],
      },
    },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Busy Dad Program Levels",
    description:
      "The four-tiered level system of the Busy Dad Program, from Level 1A through Graduation.",
    url,
    numberOfItems: itemListElement.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement,
  };
}

export function getLevelsFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What are the four levels of the Busy Dad Program?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Busy Dad Program has four levels — Level 1, Level 2, Level 3, and Level 4 — followed by Graduation. Level 1 is further subdivided into 1A, 1B, 1C, and 1D. Each level is unlocked by two Landmark Workouts: one 20-minute 6-count workout and one 20-minute Navy Seal workout.",
        },
      },
      {
        "@type": "Question",
        name: "How do I unlock Level 1A of the Busy Dad Program?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Level 1A is the most elementary level of the program. To unlock it, you need to complete one 6-count military burpee and one Navy Seal burpee, each within a 20-minute window.",
        },
      },
      {
        "@type": "Question",
        name: "How many burpees do you need to graduate the Busy Dad Program?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Graduation requires two Landmark Workouts completed in the same week: 325 6-counts in 20 minutes and 150 Navy Seal burpees in 20 minutes. You must call out every count of both movements. To maintain Graduation status, repeat these workouts every 30 days, otherwise you slide back to Level 4B.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take to progress through the levels?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The program asks for 80 minutes a week, ideally split into four 20-minute sessions. Progression depends on starting fitness and consistency: early sublevels can take weeks, later levels take months, and Graduation can take years and is achieved only by a small elite.",
        },
      },
      {
        "@type": "Question",
        name: "What is a Landmark Workout?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A Landmark Workout is the benchmark that unlocks each level of the Busy Dad Program. Every level has two: one for the 6-count military burpee and one for the Navy Seal burpee, each performed in a 20-minute window.",
        },
      },
    ],
  };
}

export type FaqEntry = {
  question: string;
  answer: string;
};

export function buildFaqJsonLd(faqs: readonly FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getArticleJsonLd({
  headline,
  description,
  path,
  datePublished,
  dateModified,
}: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
}) {
  const url = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline,
    description,
    url,
    datePublished,
    dateModified,
    inLanguage: "en-GB",
    author: { "@id": `${siteUrl}/#max-edwards` },
    publisher: { "@id": `${siteUrl}/#organization` },
    mainEntityOfPage: { "@id": `${url}#webpage` },
    isPartOf: { "@id": `${siteUrl}/#website` },
  };
}

export function getAppsItemListJsonLd(
  apps: readonly { id: string; name: string; websiteUrl: string }[]
) {
  const url = absoluteUrl(bestHomeWorkoutAppsPage.path);

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Short Home Workout Apps for Men (2026)",
    description: bestHomeWorkoutAppsPage.seo.description,
    url,
    numberOfItems: apps.length,
    itemListOrder: "https://schema.org/ItemListUnordered",
    itemListElement: apps.map((app, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: app.name,
      url: `${url}#${app.id}`,
      item: {
        "@type": "SoftwareApplication",
        name: app.name,
        url: app.websiteUrl,
        applicationCategory: "HealthApplication",
        operatingSystem: "iOS, Android",
      },
    })),
  };
}

export function getGuideAppJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    "@id": `${absoluteUrl(bestHomeWorkoutAppsPage.path)}#app-details`,
    name: site.name,
    applicationCategory: "HealthApplication",
    operatingSystem: "iOS, Android",
    description:
      "A minimalist home workout app for men: two burpee movements, 20-minute sessions, 80 minutes per week, and a four-level progression system.",
    featureList: [
      "20-minute workout timer",
      "Four-tier level progression with Landmark Workouts",
      "6-count and Navy Seal burpee tracking",
      "Global community and burpee leaderboard",
      "No equipment required",
    ],
    screenshot: [
      absoluteUrl(appScreenshots.timer.src),
      absoluteUrl(appScreenshots.levels.src),
      absoluteUrl(appScreenshots.community.src),
    ],
    offers: getAppOffersJsonLd(),
    downloadUrl: [appStores.appStoreUrl, appStores.googlePlayUrl],
  };
}

export function getReviewJsonLdFromTestimonials(
  quotes: readonly { quote: string; name: string; role: string }[]
) {
  return quotes.map((t, index) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    "@id": `${absoluteUrl(bestHomeWorkoutAppsPage.path)}#review-${index + 1}`,
    author: {
      "@type": "Person",
      name: t.name,
    },
    reviewBody: t.quote,
    itemReviewed: { "@id": `${siteUrl}/#app` },
  }));
}
