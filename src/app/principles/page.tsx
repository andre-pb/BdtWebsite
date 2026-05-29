import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DownloadSection } from "@/components/home/DownloadSection";
import { PrinciplesHero } from "@/components/principles/PrinciplesHero";
import { PrincipleSection } from "@/components/principles/PrincipleSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { principlesPage } from "@/content/principles";
import { createPageMetadata, getBreadcrumbJsonLd, getWebPageJsonLd } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: principlesPage.seo.title,
  description: principlesPage.seo.description,
  path: "/principles/",
});

export default function PrinciplesPage() {
  const { title, description } = principlesPage.seo;

  return (
    <>
      <JsonLd
        data={[
          getWebPageJsonLd({ title, description, path: "/principles/" }),
          getBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Principles", path: "/principles/" },
          ]),
        ]}
      />
      <Header />
      <main>
        <PrinciplesHero />
        {principlesPage.pillars.map((pillar, index) => (
          <PrincipleSection
            key={pillar.id}
            id={pillar.id}
            title={pillar.title}
            blocks={pillar.blocks}
            quote={pillar.quote}
            variant={index % 2 === 0 ? "light" : "dark"}
          />
        ))}
        <DownloadSection />
      </main>
      <Footer />
    </>
  );
}
