import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { JsonLd } from "@/components/seo/JsonLd";
import { returnsPage } from "@/content/legal";
import { createPageMetadata, getBreadcrumbJsonLd, getWebPageJsonLd } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: returnsPage.seo.title,
  description: returnsPage.seo.description,
  path: returnsPage.path,
});

export default function ReturnsPolicyPage() {
  const { title, description } = returnsPage.seo;

  return (
    <>
      <JsonLd
        data={[
          getWebPageJsonLd({ title, description, path: returnsPage.path }),
          getBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Returns Policy", path: returnsPage.path },
          ]),
        ]}
      />
      <Header />
      <main>
        <LegalDocument
          heading={returnsPage.heading}
          intro={returnsPage.intro}
          sections={returnsPage.sections}
          lastUpdated={returnsPage.lastUpdated}
          eyebrow="Legal"
        />
      </main>
      <Footer />
    </>
  );
}
