import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { JsonLd } from "@/components/seo/JsonLd";
import { accountDeletionPage } from "@/content/legal";
import { createPageMetadata, getBreadcrumbJsonLd, getWebPageJsonLd } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: accountDeletionPage.seo.title,
  description: accountDeletionPage.seo.description,
  path: accountDeletionPage.path,
});

export default function AccountDeletionPage() {
  const { title, description } = accountDeletionPage.seo;

  return (
    <>
      <JsonLd
        data={[
          getWebPageJsonLd({ title, description, path: accountDeletionPage.path }),
          getBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Account Deletion", path: accountDeletionPage.path },
          ]),
        ]}
      />
      <Header />
      <main>
        <LegalDocument
          heading={accountDeletionPage.heading}
          intro={accountDeletionPage.intro}
          sections={accountDeletionPage.sections}
          eyebrow="Support"
        />
      </main>
      <Footer />
    </>
  );
}
