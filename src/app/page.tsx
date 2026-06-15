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
import { createPageMetadata, getExerciseProgramJsonLd, getHomePageJsonLd, getAggregateRatingJsonLd, getHomepageReviewJsonLd, buildFaqJsonLd } from "@/lib/seo";

export const metadata = {
  ...createPageMetadata({
    title: seo.title,
    description: seo.description,
    path: "/",
    keywords: [...seo.keywords],
  }),
  title: { absolute: seo.title },
};

const faqSchema = buildFaqJsonLd([
  {
    question: "What is Busy Dad Training?",
    answer: "Busy Dad Training is a short home workout app for men built around two bodyweight movements — the 6-count military burpee and the Navy Seal burpee. Train 20 minutes a session, 4 times a week. No equipment, no gym required."
  },
  {
    question: "Is Busy Dad Training suitable for beginners?",
    answer: "Yes. The programme has a four-tier level system starting from Level 1A, designed for complete beginners. You progress at your own pace through Landmark Workouts."
  },
  {
    question: "How much does Busy Dad Training cost?",
    answer: "Busy Dad Training costs £9.99 per month or £99.99 per year (approximately £8.33 per month billed annually). A 14-day free trial is included."
  },
  {
    question: "Do I need any equipment for Busy Dad Training?",
    answer: "No. The programme uses only bodyweight movements — specifically the 6-count military burpee and the Navy Seal burpee. No gym, no weights, no equipment required."
  },
  {
    question: "How long are Busy Dad Training workouts?",
    answer: "Each workout is exactly 20 minutes. The programme recommends 4 sessions per week for a total of 80 minutes of training per week."
  },
  {
    question: "Is Busy Dad Training available on iOS and Android?",
    answer: "Yes. Busy Dad Training is available on both the Apple App Store and Google Play Store."
  }
]);

export default function HomePage() {
  return (
    <>
      <JsonLd data={[...getHomePageJsonLd(), getExerciseProgramJsonLd(), getAggregateRatingJsonLd(), ...getHomepageReviewJsonLd(), faqSchema]} />
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
