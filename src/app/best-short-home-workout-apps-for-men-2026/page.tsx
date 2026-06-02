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
import { bestHomeWorkoutAppsPage } from "@/content/best-home-workout-apps";
import { testimonials } from "@/content/site";
import {
  buildFaqJsonLd,
  createPageMetadata,
  getArticleJsonLd,
  getAppsItemListJsonLd,
  getBreadcrumbJsonLd,
  getGuideAppJsonLd,
  getReviewJsonLdFromTestimonials,
  getWebPageJsonLd,
} from "@/lib/seo";

const { path, seo, apps, faqs, datePublished, dateModified } = bestHomeWorkoutAppsPage;

export const metadata = createPageMetadata({
  title: seo.title,
  description: seo.description,
  path,
  keywords: [...seo.keywords],
});

export default function BestHomeWorkoutAppsPage() {
  return (
    <>
      <JsonLd
        data={[
          getWebPageJsonLd({ title: seo.title, description: seo.description, path }),
          getBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Best Home Workout Apps 2026", path },
          ]),
          getArticleJsonLd({
            headline: seo.title,
            description: seo.description,
            path,
            datePublished,
            dateModified,
          }),
          buildFaqJsonLd(faqs),
          getAppsItemListJsonLd(apps),
          getGuideAppJsonLd(),
          ...getReviewJsonLdFromTestimonials(testimonials.quotes),
        ]}
      />
      <Header />
      <main>
        <GuideHero />
        <GuideIntroSection />
        <ComparisonTable />
        {apps.map((app, index) => (
          <AppReviewSection key={app.id} app={app} variant={index % 2 === 0 ? "light" : "dark"} />
        ))}
        <BestForPicksSection />
        <WhyBdpSection />
        <FaqSection faqs={faqs} />
        <DownloadSection />
      </main>
      <Footer />
    </>
  );
}
