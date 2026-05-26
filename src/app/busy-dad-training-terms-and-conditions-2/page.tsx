import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { JsonLd } from "@/components/seo/JsonLd";
import { termsPage } from "@/content/legal";
import { createPageMetadata, getBreadcrumbJsonLd, getWebPageJsonLd } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: termsPage.seo.title,
  description: termsPage.seo.description,
  path: termsPage.path,
});

export default function TermsPage() {
  const { title, description } = termsPage.seo;

  return (
    <>
      <JsonLd
        data={[
          getWebPageJsonLd({ title, description, path: termsPage.path }),
          getBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Terms and Conditions", path: termsPage.path },
          ]),
        ]}
      />
      <Header />
      <main>
        <LegalDocument
          heading={termsPage.heading}
          intro={termsPage.intro}
          sections={termsPage.sections}
          lastUpdated={termsPage.lastUpdated}
          eyebrow="Legal"
        />
      </main>
      <Footer />
    </>
  );
}
