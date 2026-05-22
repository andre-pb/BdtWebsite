import type { Metadata } from "next";
import { appStores, seo, site, video } from "@/content/site";

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
    icon: site.logo.src,
    apple: site.logo.src,
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
