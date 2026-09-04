import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DownloadSection } from "@/components/home/DownloadSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageContainer } from "@/components/ui/PageContainer";
import { eyebrowStyle, headingStyle, bodyStyle } from "@/components/ui/Typography";
import { colors } from "@/constants/colors";
import { faqPage, allFaqs } from "@/content/faq";
import { buildFaqJsonLd, createPageMetadata, getBreadcrumbJsonLd, getWebPageJsonLd } from "@/lib/seo";

const { path, seo, hero, groups, datePublished, dateModified } = faqPage;

export const metadata = createPageMetadata({
  title: seo.title,
  description: seo.description,
  path,
  keywords: [...seo.keywords],
});

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={[
          getWebPageJsonLd({ title: seo.title, description: seo.description, path, datePublished, dateModified }),
          getBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "FAQ", path },
          ]),
          buildFaqJsonLd(allFaqs),
        ]}
      />
      <Header />
      <main>
        <section
          aria-labelledby="faq-hero-heading"
          style={{ paddingTop: "200px", paddingBottom: "80px", backgroundColor: colors.heroDark, color: "white" }}
        >
          <PageContainer>
            <span style={{ ...eyebrowStyle, color: colors.accentLight }}>{hero.eyebrow}</span>
            <h1
              id="faq-hero-heading"
              style={{ fontSize: "clamp(2.5rem, 4vw, 3.75rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", color: "white", marginBottom: "1.5rem" }}
            >
              {hero.title}
            </h1>
            <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "1.25rem", lineHeight: 1.7, maxWidth: "720px" }}>{hero.intro}</p>
            <nav aria-label="FAQ sections" style={{ marginTop: "2rem" }}>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                {groups.map((group) => (
                  <li key={group.id}>
                    <a
                      href={`#${group.id}`}
                      style={{ display: "inline-block", padding: "0.5rem 1rem", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.25)", color: "white", fontSize: "0.9rem", fontWeight: 600, textDecoration: "none" }}
                    >
                      {group.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", marginTop: "1.5rem", marginBottom: 0 }}>
              Updated <time dateTime={dateModified}>{dateModified}</time>
            </p>
          </PageContainer>
        </section>

        {groups.map((group, index) => (
          <section
            key={group.id}
            id={group.id}
            aria-labelledby={`${group.id}-heading`}
            style={{ padding: "80px 0", backgroundColor: index % 2 === 0 ? colors.bgPure : colors.bgOff }}
          >
            <PageContainer>
              <h2 id={`${group.id}-heading`} style={{ ...headingStyle, marginBottom: "2rem" }}>
                {group.title}
              </h2>
              <dl style={{ margin: 0 }}>
                {group.items.map((faq, i) => (
                  <div
                    key={faq.question}
                    style={{
                      marginBottom: i < group.items.length - 1 ? "2rem" : 0,
                      paddingBottom: i < group.items.length - 1 ? "2rem" : 0,
                      borderBottom: i < group.items.length - 1 ? `1px solid ${colors.borderLight}` : undefined,
                    }}
                  >
                    <dt style={{ fontSize: "1.15rem", fontWeight: 700, color: colors.textMain, marginBottom: "0.75rem", lineHeight: 1.4 }}>
                      <h3 style={{ margin: 0, fontSize: "inherit", fontWeight: "inherit" }}>{faq.question}</h3>
                    </dt>
                    <dd data-speakable style={{ ...bodyStyle, margin: 0, fontSize: "1.0625rem" }}>
                      {faq.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </PageContainer>
          </section>
        ))}
        <DownloadSection />
      </main>
      <Footer />
    </>
  );
}
