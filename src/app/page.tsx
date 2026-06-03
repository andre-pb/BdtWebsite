import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { PhilosophySection } from "@/components/home/PhilosophySection";
import { BurpeeStatSection } from "@/components/home/BurpeeStatSection";
import { AppShowcaseSection } from "@/components/home/AppShowcaseSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { PricingSection } from "@/components/home/PricingSection";
import { DownloadSection } from "@/components/home/DownloadSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { seo } from "@/content/site";
import { createPageMetadata, getExerciseProgramJsonLd, getHomePageJsonLd } from "@/lib/seo";

export const metadata = {
  ...createPageMetadata({
    title: seo.title,
    description: seo.description,
    path: "/",
    keywords: [...seo.keywords],
  }),
  title: { absolute: seo.title },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={[...getHomePageJsonLd(), getExerciseProgramJsonLd()]} />
      <Header />
      <main>
        <HeroSection />
        <PhilosophySection />
        <BurpeeStatSection />
        <AppShowcaseSection />
        <TestimonialsSection />
        <PricingSection />
        <DownloadSection />
      </main>
      <Footer />
    </>
  );
}
