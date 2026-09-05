import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DownloadSection } from "@/components/home/DownloadSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { GuideHero } from "@/components/guides/GuideHero";
import { GuideIntroSection } from "@/components/guides/GuideIntroSection";
import { ComparisonTable } from "@/components/guides/ComparisonTable";
import { AppReviewSection } from "@/components/guides/AppReviewSection";
import { BestForPicksSection } from "@/components/guides/BestForPicksSection";
import { WhyBdpSection } from "@/components/guides/WhyBdpSection";
import { FaqSection } from "@/components/guides/FaqSection";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import type { GuideData } from "@/content/guide-types";
import {
  buildFaqJsonLd,
  getArticleJsonLd,
  getBreadcrumbJsonLd,
  getGuideAppJsonLd,
  getGuideItemListJsonLd,
  getGuideReviewsJsonLd,
  getWebPageJsonLd,
} from "@/lib/seo";

/**
 * Full page for an app-roundup guide. The page.tsx for each guide only has
 * to export metadata and render <GuidePage guide={...} />.
 */
export function GuidePage({ guide }: { guide: GuideData }) {
  const { path, seo, apps, faqs, datePublished, dateModified, breadcrumbLabel } = guide;

  return (
    <>
      <JsonLd
        data={[
          getWebPageJsonLd({ title: seo.title, description: seo.description, path, datePublished, dateModified }),
          getBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Comparisons", path: "/comparisons/" },
            { name: breadcrumbLabel, path },
          ]),
          getArticleJsonLd({ headline: seo.title, description: seo.description, path, datePublished, dateModified }),
          buildFaqJsonLd(faqs),
          getGuideItemListJsonLd(guide),
          getGuideAppJsonLd(),
          ...getGuideReviewsJsonLd(guide),
        ]}
      />
      <Header />
      <main>
        <GuideHero guide={guide} />
        <QuickAnswer>{guide.quickAnswer}</QuickAnswer>
        <GuideIntroSection guide={guide} />
        <ComparisonTable guide={guide} />
        {apps.map((app, index) => (
          <AppReviewSection key={app.id} app={app} variant={index % 2 === 0 ? "light" : "dark"} />
        ))}
        <BestForPicksSection guide={guide} />
        <WhyBdpSection guide={guide} />
        <FaqSection faqs={faqs} />
        <DownloadSection />
      </main>
      <Footer />
    </>
  );
}
