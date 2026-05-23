import type { Metadata } from "next";
import { appStores, seo, site, video } from "@/content/site";
import { movementsPage } from "@/content/movements";

const siteUrl = site.url;

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
        sameAs: [video.youtubeUrl, appStores.appStoreUrl, appStores.googlePlayUrl],
      },
      {
        "@type": "MobileApplication",
        "@id": `${siteUrl}/#app`,
        name: site.name,
        applicationCategory: "HealthApplication",
        operatingSystem: "iOS, Android",
        description: seo.description,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
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
    {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: video.featuredTitle,
      description: video.featuredDescription,
      thumbnailUrl: `https://i.ytimg.com/vi/${video.featuredVideoId}/hqdefault.jpg`,
      uploadDate: "2024-01-01",
      contentUrl: video.featuredVideoUrl,
      embedUrl: `https://www.youtube.com/embed/${video.featuredVideoId}`,
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ];
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
