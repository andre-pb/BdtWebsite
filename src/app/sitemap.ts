import type { MetadataRoute } from "next";
import { bestHomeWorkoutAppsPage } from "@/content/best-home-workout-apps";
import { bestBurpeeAppsPage } from "@/content/best-burpee-apps";
import { bestBodyweightAppsPage } from "@/content/best-bodyweight-apps";
import { twentyMinuteWorkoutGuidePage } from "@/content/twenty-minute-workout-guide";
import { navySealBurpeePage, sixCountBurpeePage } from "@/content/burpee-terms";
import { comparisonsHubPage } from "@/content/comparisons-hub";
import { faqPage } from "@/content/faq";
import { pricingPage } from "@/content/pricing";
import { pressPage } from "@/content/press";
import {
  freeleticsComparison,
  boostcampComparison,
  thenxComparison,
} from "@/content/comparisons";
import { accountDeletionPage, privacyPage, termsPage } from "@/content/legal";
import { site } from "@/content/site";

export const dynamic = "force-static";

/**
 * lastModified must be a real date. The previous version used `new Date()`
 * on every build, which tells search engines every page changed every
 * deploy; they learn to ignore the field entirely. Pages with dated content
 * use their dateModified; the rest carry the date they were last edited.
 * Bump CORE_LAST_MODIFIED when you change the core pages' copy.
 */
const CORE_LAST_MODIFIED = "2026-09-03";
const LEGAL_LAST_MODIFIED = "2026-05-29";

type Entry = {
  path: string;
  lastModified: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const entries: Entry[] = [
  { path: "/", lastModified: CORE_LAST_MODIFIED, changeFrequency: "weekly", priority: 1 },
  { path: navySealBurpeePage.path, lastModified: navySealBurpeePage.dateModified, changeFrequency: "monthly", priority: 0.95 },
  { path: sixCountBurpeePage.path, lastModified: sixCountBurpeePage.dateModified, changeFrequency: "monthly", priority: 0.95 },
  { path: bestBurpeeAppsPage.path, lastModified: bestBurpeeAppsPage.dateModified, changeFrequency: "monthly", priority: 0.95 },
  { path: bestBodyweightAppsPage.path, lastModified: bestBodyweightAppsPage.dateModified, changeFrequency: "monthly", priority: 0.95 },
  { path: bestHomeWorkoutAppsPage.path, lastModified: bestHomeWorkoutAppsPage.dateModified, changeFrequency: "monthly", priority: 0.95 },
  { path: twentyMinuteWorkoutGuidePage.path, lastModified: twentyMinuteWorkoutGuidePage.dateModified, changeFrequency: "monthly", priority: 0.95 },
  { path: "/principles/", lastModified: CORE_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.9 },
  { path: "/movements/", lastModified: CORE_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.9 },
  { path: "/levels/", lastModified: CORE_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.9 },
  { path: pricingPage.path, lastModified: pricingPage.dateModified, changeFrequency: "monthly", priority: 0.9 },
  { path: faqPage.path, lastModified: faqPage.dateModified, changeFrequency: "monthly", priority: 0.9 },
  { path: comparisonsHubPage.path, lastModified: comparisonsHubPage.dateModified, changeFrequency: "monthly", priority: 0.9 },
  { path: freeleticsComparison.path, lastModified: freeleticsComparison.dateModified, changeFrequency: "monthly", priority: 0.9 },
  { path: boostcampComparison.path, lastModified: boostcampComparison.dateModified, changeFrequency: "monthly", priority: 0.9 },
  { path: thenxComparison.path, lastModified: thenxComparison.dateModified, changeFrequency: "monthly", priority: 0.9 },
  { path: "/about/", lastModified: CORE_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.8 },
  { path: pressPage.path, lastModified: pressPage.dateModified, changeFrequency: "monthly", priority: 0.8 },
  { path: "/community/", lastModified: CORE_LAST_MODIFIED, changeFrequency: "weekly", priority: 0.8 },
  { path: termsPage.path, lastModified: LEGAL_LAST_MODIFIED, changeFrequency: "yearly", priority: 0.3 },
  { path: privacyPage.path, lastModified: LEGAL_LAST_MODIFIED, changeFrequency: "yearly", priority: 0.3 },
  { path: accountDeletionPage.path, lastModified: LEGAL_LAST_MODIFIED, changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return entries.map((entry) => ({
    url: entry.path === "/" ? site.url : `${site.url}${entry.path}`,
    lastModified: entry.lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
