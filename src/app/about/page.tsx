import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DownloadSection } from "@/components/home/DownloadSection";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutBio } from "@/components/about/AboutBio";
import { OriginTimeline } from "@/components/about/OriginTimeline";
import { JsonLd } from "@/components/seo/JsonLd";
import { aboutPage } from "@/content/about";
import {
  createPageMetadata,
  getAboutVideoJsonLd,
  getBreadcrumbJsonLd,
  getWebPageJsonLd,
} from "@/lib/seo";

export const metadata = createPageMetadata({
  title: aboutPage.seo.title,
  description: aboutPage.seo.description,
  path: "/about/",
});

export default function AboutPage() {
  const { title, description } = aboutPage.seo;

  return (
    <>
      <JsonLd
        data={[
          getWebPageJsonLd({ title, description, path: "/about/" }),
          getBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About Max", path: "/about/" },
          ]),
          getAboutVideoJsonLd(),
        ]}
      />
      <Header />
      <main>
        <AboutHero />
        <AboutBio />
        <OriginTimeline />
        <DownloadSection />
      </main>
      <Footer />
    </>
  );
}
