import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DownloadSection } from "@/components/home/DownloadSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { bodyweightAppsComparison } from "@/content/seo-comparisons";
import { buildFaqJsonLd, createPageMetadata, getBreadcrumbJsonLd, getWebPageJsonLd } from "@/lib/seo";
import { ComparisonPage } from "@/components/comparisons/ComparisonPage";

const data = bodyweightAppsComparison;

export const metadata = createPageMetadata({
  title: data.seo.title,
  description: data.seo.description,
  path: data.path,
  keywords: [...data.seo.keywords],
});

export default function BodyweightAppsPage() {
  return (
    <>
      <JsonLd
        data={[
          getWebPageJsonLd({ title: data.seo.title, description: data.seo.description, path: data.path }),
          getBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: data.seo.title, path: data.path },
          ]),
          buildFaqJsonLd(data.faqs),
        ]}
      />
      <Header />
      <main>
        <ComparisonPage data={data} />
        <DownloadSection />
      </main>
      <Footer />
    </>
  );
}