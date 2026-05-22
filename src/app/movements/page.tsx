import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DownloadSection } from "@/components/home/DownloadSection";
import { MovementsHero } from "@/components/movements/MovementsHero";
import { MovementsIntro } from "@/components/movements/MovementsIntro";
import { SacredMovementSection } from "@/components/movements/SacredMovementSection";
import { TrainingSplitCallout } from "@/components/movements/TrainingSplitCallout";
import { AccessoryMovementsSection } from "@/components/movements/AccessoryMovementsSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { movementsPage } from "@/content/movements";
import { createPageMetadata, getBreadcrumbJsonLd, getWebPageJsonLd } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: movementsPage.seo.title,
  description: movementsPage.seo.description,
  path: "/movements/",
  keywords: [
    "6-count burpee",
    "navy seal burpee",
    "military burpee",
    "sacred movements",
    "bodyweight burpee workout",
    "american military burpee",
  ],
});

export default function MovementsPage() {
  const { title, description } = movementsPage.seo;

  return (
    <>
      <JsonLd
        data={[
          getWebPageJsonLd({ title, description, path: "/movements/" }),
          getBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Movements", path: "/movements/" },
          ]),
        ]}
      />
      <Header />
      <main>
        <MovementsHero />
        <MovementsIntro />
        {movementsPage.sacredMovements.map((movement, index) => (
          <SacredMovementSection key={movement.id} movement={movement} reversed={index % 2 === 1} />
        ))}
        <TrainingSplitCallout />
        <AccessoryMovementsSection />
        <DownloadSection />
      </main>
      <Footer />
    </>
  );
}
