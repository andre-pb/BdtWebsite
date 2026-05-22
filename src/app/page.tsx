import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { PhilosophySection } from "@/components/home/PhilosophySection";
import { AppShowcaseSection } from "@/components/home/AppShowcaseSection";
import { VideoSection } from "@/components/home/VideoSection";
import { DownloadSection } from "@/components/home/DownloadSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { getExerciseProgramJsonLd, getHomePageJsonLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <JsonLd data={[...getHomePageJsonLd(), getExerciseProgramJsonLd()]} />
      <Header />
      <main>
        <HeroSection />
        <PhilosophySection />
        <AppShowcaseSection />
        <VideoSection />
        <DownloadSection />
      </main>
      <Footer />
    </>
  );
}
