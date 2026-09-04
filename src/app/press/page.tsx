import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DownloadSection } from "@/components/home/DownloadSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageContainer } from "@/components/ui/PageContainer";
import { eyebrowStyle, headingStyle, bodyStyle } from "@/components/ui/Typography";
import { colors } from "@/constants/colors";
import { pressPage } from "@/content/press";
import { absoluteUrl, createPageMetadata, getBreadcrumbJsonLd, getWebPageJsonLd } from "@/lib/seo";

const { path, seo, hero, coverage, fastFacts, boilerplate, assets, contact, datePublished, dateModified } = pressPage;

export const metadata = createPageMetadata({
  title: seo.title,
  description: seo.description,
  path,
  keywords: [...seo.keywords],
});

const coverageListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${absoluteUrl(path)}#coverage`,
  name: "Press coverage of Busy Dad Training",
  itemListElement: coverage.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": item.type === "Podcast" ? "PodcastEpisode" : item.type === "Community" ? "DiscussionForumPosting" : "NewsArticle",
      headline: item.title,
      url: item.url,
      publisher: { "@type": "Organization", name: item.outlet },
      about: { "@id": `${absoluteUrl("/")}#organization` },
    },
  })),
};

const cardStyle = {
  padding: "1.5rem",
  borderRadius: "12px",
  border: `1px solid ${colors.borderLight}`,
  backgroundColor: colors.bgPure,
} as const;

export default function PressPage() {
  return (
    <>
      <JsonLd
        data={[
          getWebPageJsonLd({ title: seo.title, description: seo.description, path, datePublished, dateModified }),
          getBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Press", path },
          ]),
          coverageListJsonLd,
        ]}
      />
      <Header />
      <main>
        <section aria-labelledby="press-hero-heading" style={{ paddingTop: "200px", paddingBottom: "80px", backgroundColor: colors.heroDark, color: "white" }}>
          <PageContainer>
            <span style={{ ...eyebrowStyle, color: colors.accentLight }}>{hero.eyebrow}</span>
            <h1 id="press-hero-heading" style={{ fontSize: "clamp(2.5rem, 4vw, 3.75rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", color: "white", marginBottom: "1.5rem" }}>
              {hero.title}
            </h1>
            <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "1.25rem", lineHeight: 1.7, maxWidth: "720px" }}>{hero.intro}</p>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", marginTop: "1.5rem", marginBottom: 0 }}>
              Updated <time dateTime={dateModified}>{dateModified}</time>
            </p>
          </PageContainer>
        </section>

        <section aria-labelledby="coverage-heading" style={{ padding: "100px 0", backgroundColor: colors.bgOff }}>
          <PageContainer>
            <h2 id="coverage-heading" style={headingStyle}>Coverage</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: "2rem 0 0", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {coverage.map((item) => (
                <li key={item.url} style={cardStyle}>
                  <p style={{ margin: "0 0 0.25rem", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: colors.brandBlue }}>
                    {item.outlet} · {item.type}
                  </p>
                  <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.2rem", fontWeight: 700, color: colors.textMain }}>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>
                      {item.title}
                    </a>
                  </h3>
                  <p style={{ ...bodyStyle, marginBottom: 0, fontSize: "1rem" }}>{item.summary}</p>
                </li>
              ))}
            </ul>
          </PageContainer>
        </section>

        <section aria-labelledby="facts-heading" style={{ padding: "100px 0", backgroundColor: colors.bgPure }}>
          <PageContainer>
            <h2 id="facts-heading" style={headingStyle}>{fastFacts.title}</h2>
            <dl style={{ margin: "2rem 0 0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
              {fastFacts.items.map((fact) => (
                <div key={fact.label} style={{ ...cardStyle, backgroundColor: colors.bgOff }}>
                  <dt style={{ fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: colors.brandBlue, marginBottom: "0.35rem" }}>{fact.label}</dt>
                  <dd data-speakable style={{ margin: 0, color: colors.textMain, lineHeight: 1.55 }}>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </PageContainer>
        </section>

        <section aria-labelledby="boilerplate-heading" style={{ padding: "100px 0", backgroundColor: colors.bgOff }}>
          <PageContainer>
            <h2 id="boilerplate-heading" style={headingStyle}>{boilerplate.title}</h2>
            <p data-speakable style={{ ...bodyStyle, marginBottom: 0 }}>{boilerplate.text}</p>
          </PageContainer>
        </section>

        <section aria-labelledby="assets-heading" style={{ padding: "100px 0", backgroundColor: colors.bgPure }}>
          <PageContainer>
            <h2 id="assets-heading" style={headingStyle}>{assets.title}</h2>
            <ul style={{ margin: "1.5rem 0 3rem", paddingLeft: "1.25rem", color: colors.textMuted, lineHeight: 1.8 }}>
              {assets.items.map((asset) => (
                <li key={asset.href}>
                  <a href={asset.href} target="_blank" rel="noopener noreferrer" style={{ color: colors.brandBlue, fontWeight: 600 }}>
                    {asset.label}
                  </a>
                </li>
              ))}
            </ul>
            <h2 style={headingStyle}>{contact.title}</h2>
            <p style={bodyStyle}>
              <a href={`mailto:${contact.email}`} style={{ color: colors.brandBlue, fontWeight: 600 }}>{contact.email}</a>
            </p>
            <p style={{ ...bodyStyle, marginBottom: 0 }}>{contact.note}</p>
          </PageContainer>
        </section>

        <DownloadSection />
      </main>
      <Footer />
    </>
  );
}
