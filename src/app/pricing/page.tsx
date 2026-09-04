import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PricingSection } from "@/components/home/PricingSection";
import { FaqSection } from "@/components/guides/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageContainer } from "@/components/ui/PageContainer";
import { eyebrowStyle, headingStyle, bodyStyle } from "@/components/ui/Typography";
import { colors } from "@/constants/colors";
import { pricingPage } from "@/content/pricing";
import {
  buildFaqJsonLd,
  createPageMetadata,
  getBreadcrumbJsonLd,
  getPricingItemListJsonLd,
  getProductJsonLd,
  getWebPageJsonLd,
} from "@/lib/seo";

const { path, seo, hero, plans, included, trial, comparison, faqs, datePublished, dateModified } = pricingPage;

export const metadata = createPageMetadata({
  title: seo.title,
  description: seo.description,
  path,
  keywords: [...seo.keywords],
});

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={[
          getWebPageJsonLd({ title: seo.title, description: seo.description, path, datePublished, dateModified }),
          getBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Pricing", path },
          ]),
          getProductJsonLd(),
          getPricingItemListJsonLd(),
          buildFaqJsonLd(faqs),
        ]}
      />
      <Header />
      <main>
        <section aria-labelledby="pricing-hero-heading" style={{ paddingTop: "200px", paddingBottom: "60px", backgroundColor: colors.heroDark, color: "white" }}>
          <PageContainer>
            <span style={{ ...eyebrowStyle, color: colors.accentLight }}>{hero.eyebrow}</span>
            <h1
              id="pricing-hero-heading"
              style={{ fontSize: "clamp(2.5rem, 4vw, 3.75rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", color: "white", marginBottom: "1.5rem" }}
            >
              {hero.title}
            </h1>
            <p data-speakable style={{ color: "rgba(255,255,255,0.9)", fontSize: "1.25rem", lineHeight: 1.7, maxWidth: "720px" }}>
              {hero.intro}
            </p>
            <dl style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", margin: "2rem 0 0", maxWidth: "640px" }}>
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  style={{
                    padding: "1.25rem 1.5rem",
                    borderRadius: "12px",
                    border: `1px solid ${"highlight" in plan && plan.highlight ? colors.accentLight : "rgba(255,255,255,0.2)"}`,
                    backgroundColor: "rgba(255,255,255,0.05)",
                  }}
                >
                  <dt style={{ fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: colors.accentLight }}>
                    {plan.name}
                  </dt>
                  <dd style={{ margin: "0.35rem 0 0", color: "white" }}>
                    <span style={{ fontSize: "1.75rem", fontWeight: 800 }}>{plan.price}</span>
                    <span style={{ display: "block", color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", marginTop: "0.25rem" }}>{plan.note}</span>
                    <span style={{ display: "block", color: "rgba(255,255,255,0.85)", fontSize: "0.95rem", marginTop: "0.5rem" }}>Best for: {plan.bestFor}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", marginTop: "1.5rem", marginBottom: 0 }}>
              Updated <time dateTime={dateModified}>{dateModified}</time>
            </p>
          </PageContainer>
        </section>

        <PricingSection />

        <section aria-labelledby="included-heading" style={{ padding: "100px 0", backgroundColor: colors.bgOff }}>
          <PageContainer>
            <h2 id="included-heading" style={headingStyle}>{included.title}</h2>
            <ul style={{ margin: "1.5rem 0 0", paddingLeft: "1.25rem", color: colors.textMuted, lineHeight: 1.7, fontSize: "1.0625rem" }}>
              {included.items.map((item) => (
                <li key={item.slice(0, 40)} style={{ marginBottom: "0.6rem" }}>{item}</li>
              ))}
            </ul>
          </PageContainer>
        </section>

        <section aria-labelledby="trial-heading" style={{ padding: "100px 0", backgroundColor: colors.bgPure }}>
          <PageContainer>
            <h2 id="trial-heading" style={headingStyle}>{trial.title}</h2>
            {trial.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} style={bodyStyle}>{paragraph}</p>
            ))}
          </PageContainer>
        </section>

        <section aria-labelledby="price-comparison-heading" style={{ padding: "100px 0", backgroundColor: colors.bgOff }}>
          <PageContainer>
            <h2 id="price-comparison-heading" style={headingStyle}>{comparison.title}</h2>
            <p style={bodyStyle}>{comparison.intro}</p>
            <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
              <table style={{ width: "100%", minWidth: "600px", borderCollapse: "collapse", fontSize: "0.95rem", backgroundColor: colors.bgPure, borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 24px -8px rgba(15,23,42,0.08)" }}>
                <thead>
                  <tr style={{ backgroundColor: colors.heroDark, color: "white" }}>
                    <th scope="col" style={{ textAlign: "left", padding: "1rem 1.25rem" }}>App</th>
                    <th scope="col" style={{ textAlign: "left", padding: "1rem 1.25rem" }}>Price</th>
                    <th scope="col" style={{ textAlign: "left", padding: "1rem 1.25rem" }}>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.rows.map((row, i) => (
                    <tr key={row.app} style={{ borderTop: `1px solid ${colors.borderLight}`, backgroundColor: i === 0 ? colors.bgBlueLight : "transparent" }}>
                      <th scope="row" style={{ textAlign: "left", padding: "1rem 1.25rem", fontWeight: i === 0 ? 700 : 600, color: colors.textMain }}>{row.app}</th>
                      <td style={{ padding: "1rem 1.25rem", color: i === 0 ? colors.textMain : colors.textMuted, fontWeight: i === 0 ? 600 : 400 }}>{row.price}</td>
                      <td style={{ padding: "1rem 1.25rem", color: colors.textMuted }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </PageContainer>
        </section>

        <FaqSection faqs={faqs} title="Pricing questions" />
      </main>
      <Footer />
    </>
  );
}
