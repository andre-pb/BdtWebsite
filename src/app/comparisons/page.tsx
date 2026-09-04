import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DownloadSection } from "@/components/home/DownloadSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageContainer } from "@/components/ui/PageContainer";
import { eyebrowStyle, headingStyle, bodyStyle } from "@/components/ui/Typography";
import { colors } from "@/constants/colors";
import { comparisonsHubPage } from "@/content/comparisons-hub";
import { absoluteUrl, createPageMetadata, getBreadcrumbJsonLd, getWebPageJsonLd } from "@/lib/seo";

const { path, seo, hero, headToHead, roundups, alternatives, datePublished, dateModified } = comparisonsHubPage;

export const metadata = createPageMetadata({
  title: seo.title,
  description: seo.description,
  path,
  keywords: [...seo.keywords],
});

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${absoluteUrl(path)}#collection`,
  name: seo.title,
  url: absoluteUrl(path),
  hasPart: [...headToHead.items, ...roundups.items].map((item) => ({
    "@type": "WebPage",
    name: item.label,
    url: absoluteUrl(item.href),
  })),
};

const cardStyle = {
  padding: "1.5rem",
  borderRadius: "12px",
  border: `1px solid ${colors.borderLight}`,
} as const;

function LinkList({ items, bg }: { items: readonly { label: string; href: string; summary: string }[]; bg: string }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: "2rem 0 0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
      {items.map((item) => (
        <li key={item.href} style={{ ...cardStyle, backgroundColor: bg }}>
          <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.15rem", fontWeight: 700 }}>
            <Link href={item.href} style={{ color: colors.brandBlue, textDecoration: "none" }}>
              {item.label} →
            </Link>
          </h3>
          <p style={{ ...bodyStyle, marginBottom: 0, fontSize: "1rem" }}>{item.summary}</p>
        </li>
      ))}
    </ul>
  );
}

export default function ComparisonsHubPage() {
  return (
    <>
      <JsonLd
        data={[
          getWebPageJsonLd({ title: seo.title, description: seo.description, path, datePublished, dateModified }),
          getBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Comparisons", path },
          ]),
          collectionJsonLd,
        ]}
      />
      <Header />
      <main>
        <section aria-labelledby="hub-hero-heading" style={{ paddingTop: "200px", paddingBottom: "80px", backgroundColor: colors.heroDark, color: "white" }}>
          <PageContainer>
            <span style={{ ...eyebrowStyle, color: colors.accentLight }}>{hero.eyebrow}</span>
            <h1 id="hub-hero-heading" style={{ fontSize: "clamp(2.5rem, 4vw, 3.75rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", color: "white", marginBottom: "1.5rem" }}>
              {hero.title}
            </h1>
            <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "1.25rem", lineHeight: 1.7, maxWidth: "720px" }}>{hero.intro}</p>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", marginTop: "1.5rem", marginBottom: 0 }}>
              Updated <time dateTime={dateModified}>{dateModified}</time>
            </p>
          </PageContainer>
        </section>

        <section aria-labelledby="h2h-heading" style={{ padding: "100px 0", backgroundColor: colors.bgPure }}>
          <PageContainer>
            <h2 id="h2h-heading" style={headingStyle}>{headToHead.title}</h2>
            <LinkList items={headToHead.items} bg={colors.bgOff} />
          </PageContainer>
        </section>

        <section aria-labelledby="roundups-heading" style={{ padding: "100px 0", backgroundColor: colors.bgOff }}>
          <PageContainer>
            <h2 id="roundups-heading" style={headingStyle}>{roundups.title}</h2>
            <LinkList items={roundups.items} bg={colors.bgPure} />
          </PageContainer>
        </section>

        <section aria-labelledby="alternatives-heading" style={{ padding: "100px 0", backgroundColor: colors.bgPure }}>
          <PageContainer>
            <h2 id="alternatives-heading" style={headingStyle}>{alternatives.title}</h2>
            <p style={bodyStyle}>{alternatives.intro}</p>
            {alternatives.items.map((item) => (
              <article key={item.id} id={item.id} style={{ marginTop: "2.5rem" }}>
                <h3 style={{ fontSize: "1.35rem", fontWeight: 700, color: colors.textMain, marginBottom: "0.75rem" }}>
                  {item.app} alternative
                </h3>
                <p data-speakable style={bodyStyle}>{item.text}</p>
                <p style={{ ...bodyStyle, marginBottom: 0 }}>
                  <Link href={item.href} style={{ color: colors.brandBlue, fontWeight: 600 }}>
                    Read the full comparison →
                  </Link>
                </p>
              </article>
            ))}
          </PageContainer>
        </section>

        <DownloadSection />
      </main>
      <Footer />
    </>
  );
}
