import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { JsonLd } from "@/components/seo/JsonLd";
import { privacyPage } from "@/content/legal";
import { createPageMetadata, getBreadcrumbJsonLd, getWebPageJsonLd } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: privacyPage.seo.title,
  description: privacyPage.seo.description,
  path: privacyPage.path,
});

export default function PrivacyPolicyPage() {
  const { title, description } = privacyPage.seo;

  return (
    <>
      <JsonLd
        data={[
          getWebPageJsonLd({ title, description, path: privacyPage.path }),
          getBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Privacy Policy", path: privacyPage.path },
          ]),
        ]}
      />
      <Header />
      <main>
        <LegalDocument
          heading={privacyPage.heading}
          intro={privacyPage.intro}
          sections={privacyPage.sections}
          lastUpdated={privacyPage.lastUpdated}
          eyebrow="Legal"
        />
      </main>
      <Footer />
    </>
  );
}
