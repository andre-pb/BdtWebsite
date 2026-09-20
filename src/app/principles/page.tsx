import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PrinciplesHero } from "@/components/principles/PrinciplesHero";

export default function PrinciplesPage() {
  return (
    <>
      <Header />
      <main>
        <PrinciplesHero />
      </main>
      <Footer />
    </>
  );
}