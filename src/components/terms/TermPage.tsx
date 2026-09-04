import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DownloadSection } from "@/components/home/DownloadSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqSection } from "@/components/guides/FaqSection";
import { PageContainer } from "@/components/ui/PageContainer";
import { YouTubeEmbed } from "@/components/ui/YouTubeEmbed";
import { eyebrowStyle, headingStyle, bodyStyle } from "@/components/ui/Typography";
import { colors } from "@/constants/colors";
import type { TermPageData } from "@/content/burpee-terms";
import {
  absoluteUrl,
  buildFaqJsonLd,
  getArticleJsonLd,
  getBreadcrumbJsonLd,
  getDefinedTermJsonLd,
  getWebPageJsonLd,
} from "@/lib/seo";

const cardStyle = {
  padding: "1.25rem 1.5rem",
  borderRadius: "12px",
  border: `1px solid ${colors.borderLight}`,
} as const;

const subHeadingStyle = {
  ...headingStyle,
  fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
  marginTop: "3rem",
} as const;

export function TermPage({ data: d }: { data: TermPageData }) {
  const url = absoluteUrl(d.path);

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${url}#howto`,
    name: d.howTo.title,
    description: d.definition,
    totalTime: d.howTo.totalTimePerRep,
    tool: [],
    supply: [],
    video: {
      "@type": "VideoObject",
      name: d.video.title,
      description: d.definition,
      thumbnailUrl: `https://i.ytimg.com/vi/${d.video.youtubeId}/hqdefault.jpg`,
      contentUrl: d.video.url,
      embedUrl: `https://www.youtube.com/embed/${d.video.youtubeId}`,
      uploadDate: "2024-01-01",
    },
    step: d.howTo.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: `${step.counts}: ${step.name}`,
      text: step.text,
    })),
  };

  return (
    <>
      <JsonLd
        data={[
          getWebPageJsonLd({
            title: d.seo.title,
            description: d.seo.description,
            path: d.path,
            datePublished: d.datePublished,
            dateModified: d.dateModified,
          }),
          getBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Movements", path: "/movements/" },
            { name: d.term, path: d.path },
          ]),
          getArticleJsonLd({
            headline: d.seo.title,
            description: d.seo.description,
            path: d.path,
            datePublished: d.datePublished,
            dateModified: d.dateModified,
          }),
          getDefinedTermJsonLd({
            path: d.path,
            term: d.term,
            alternateNames: d.alternateNames,
            definition: d.definition,
          }),
          howToJsonLd,
          buildFaqJsonLd(d.faqs),
        ]}
      />
      <Header />
      <main>
        {/* Hero with the definition first */}
        <section
          aria-labelledby="term-hero-heading"
          style={{
            paddingTop: "200px",
            paddingBottom: "100px",
            position: "relative",
            backgroundColor: colors.heroDark,
            backgroundImage: `linear-gradient(rgba(15,23,42,0.75), rgba(15,23,42,0.92)), url('${d.hero.backgroundImage}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
          }}
        >
          <PageContainer>
            <span style={{ ...eyebrowStyle, color: colors.accentLight }}>{d.hero.eyebrow}</span>
            <h1
              id="term-hero-heading"
              style={{
                fontSize: "clamp(2.5rem, 4vw, 3.75rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "white",
                marginBottom: "1.5rem",
              }}
            >
              {d.hero.title}
            </h1>
            <p
              data-speakable
              style={{ color: "white", fontSize: "1.35rem", lineHeight: 1.6, maxWidth: "760px", fontWeight: 500 }}
            >
              {d.definition}
            </p>
            {d.intro.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.125rem", lineHeight: 1.7, maxWidth: "760px" }}
              >
                {paragraph}
              </p>
            ))}
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", marginTop: "1.5rem", marginBottom: 0 }}>
              Written by Max Edwards, creator of Busy Dad Training · Updated{" "}
              <time dateTime={d.dateModified}>{d.dateModified}</time>
            </p>
          </PageContainer>
        </section>

        {/* Quick facts */}
        <section aria-labelledby="term-facts-heading" style={{ padding: "100px 0", backgroundColor: colors.bgPure }}>
          <PageContainer>
            <h2 id="term-facts-heading" style={headingStyle}>
              {d.term}: quick facts
            </h2>
            <dl
              style={{
                margin: "2rem 0 0",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "1rem",
              }}
            >
              {d.facts.map((fact) => (
                <div key={fact.label} style={{ ...cardStyle, backgroundColor: colors.bgOff }}>
                  <dt style={{ fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: colors.brandBlue, marginBottom: "0.35rem" }}>
                    {fact.label}
                  </dt>
                  <dd style={{ margin: 0, color: colors.textMain, fontWeight: 500, lineHeight: 1.5 }}>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </PageContainer>
        </section>

        {/* How to */}
        <section aria-labelledby="term-howto-heading" style={{ padding: "100px 0", backgroundColor: colors.bgOff }}>
          <PageContainer>
            <h2 id="term-howto-heading" style={headingStyle}>
              {d.howTo.title}
            </h2>
            <ol style={{ listStyle: "none", padding: 0, margin: "2rem 0", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {d.howTo.steps.map((step, index) => (
                <li key={step.name} style={{ ...cardStyle, backgroundColor: colors.bgPure, display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <span
                    aria-hidden="true"
                    style={{
                      flexShrink: 0,
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "9999px",
                      backgroundColor: colors.brandBlue,
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                    }}
                  >
                    {index + 1}
                  </span>
                  <span>
                    <strong style={{ color: colors.textMain, display: "block", marginBottom: "0.35rem" }}>
                      {step.counts}: {step.name}
                    </strong>
                    <span style={{ ...bodyStyle, marginBottom: 0, fontSize: "1rem" }}>{step.text}</span>
                  </span>
                </li>
              ))}
            </ol>
            <h3 style={subHeadingStyle}>Watch the tutorial</h3>
            <div style={{ maxWidth: "860px" }}>
              <YouTubeEmbed videoId={d.video.youtubeId} title={d.video.title} />
            </div>
          </PageContainer>
        </section>

        {/* What it builds */}
        <section aria-labelledby="term-builds-heading" style={{ padding: "100px 0", backgroundColor: colors.bgPure }}>
          <PageContainer>
            <h2 id="term-builds-heading" style={headingStyle}>
              {d.builds.title}
            </h2>
            {d.builds.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} style={bodyStyle}>
                {paragraph}
              </p>
            ))}
          </PageContainer>
        </section>

        {/* Comparison table */}
        <section aria-labelledby="term-comparison-heading" style={{ padding: "100px 0", backgroundColor: colors.bgOff }}>
          <PageContainer>
            <h2 id="term-comparison-heading" style={headingStyle}>
              {d.comparison.title}
            </h2>
            <p style={bodyStyle}>{d.comparison.intro}</p>
            <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
              <table
                style={{
                  width: "100%",
                  minWidth: "720px",
                  borderCollapse: "collapse",
                  fontSize: "0.95rem",
                  backgroundColor: colors.bgPure,
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 4px 24px -8px rgba(15,23,42,0.08)",
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: colors.heroDark, color: "white" }}>
                    {d.comparison.columns.map((col) => (
                      <th key={col} scope="col" style={{ textAlign: "left", padding: "1rem 1.25rem", fontWeight: 600 }}>
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {d.comparison.rows.map((row) => {
                    const isThis =
                      (d.id === "navy-seal" && row.label.startsWith("Navy Seal")) ||
                      (d.id === "six-count" && row.label.startsWith("6-count"));
                    return (
                      <tr key={row.label} style={{ borderTop: `1px solid ${colors.borderLight}`, backgroundColor: isThis ? colors.bgBlueLight : "transparent" }}>
                        <th scope="row" style={{ textAlign: "left", padding: "1rem 1.25rem", fontWeight: 700, color: colors.textMain }}>
                          {row.label}
                        </th>
                        {row.cells.map((cell, i) => (
                          <td key={i} style={{ padding: "1rem 1.25rem", color: colors.textMuted }}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </PageContainer>
        </section>

        {/* Benchmarks */}
        <section aria-labelledby="term-benchmarks-heading" style={{ padding: "100px 0", backgroundColor: colors.bgPure }}>
          <PageContainer>
            <h2 id="term-benchmarks-heading" style={headingStyle}>
              {d.benchmarks.title}
            </h2>
            <p style={bodyStyle}>{d.benchmarks.intro}</p>
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  maxWidth: "560px",
                  borderCollapse: "collapse",
                  fontSize: "1rem",
                  backgroundColor: colors.bgOff,
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: `1px solid ${colors.borderLight}`,
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: colors.heroDark, color: "white" }}>
                    <th scope="col" style={{ textAlign: "left", padding: "0.9rem 1.25rem" }}>Level</th>
                    <th scope="col" style={{ textAlign: "left", padding: "0.9rem 1.25rem" }}>{d.term}s in 20 minutes</th>
                  </tr>
                </thead>
                <tbody>
                  {d.benchmarks.items.map((item) => (
                    <tr key={item.level} style={{ borderTop: `1px solid ${colors.borderLight}` }}>
                      <th scope="row" style={{ textAlign: "left", padding: "0.8rem 1.25rem", fontWeight: 600, color: colors.textMain }}>
                        {item.level}
                      </th>
                      <td style={{ padding: "0.8rem 1.25rem", color: colors.textMuted }}>{item.target}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ ...bodyStyle, marginTop: "1.5rem", marginBottom: 0 }}>{d.benchmarks.outro}</p>
          </PageContainer>
        </section>

        {/* Mistakes */}
        <section aria-labelledby="term-mistakes-heading" style={{ padding: "100px 0", backgroundColor: colors.bgOff }}>
          <PageContainer>
            <h2 id="term-mistakes-heading" style={headingStyle}>
              {d.mistakes.title}
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: "2rem 0 0", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {d.mistakes.items.map((item) => (
                <li key={item.label} style={{ ...cardStyle, backgroundColor: colors.bgPure }}>
                  <strong style={{ color: colors.textMain, display: "block", marginBottom: "0.35rem" }}>{item.label}</strong>
                  <span style={{ ...bodyStyle, marginBottom: 0, fontSize: "1rem" }}>{item.description}</span>
                </li>
              ))}
            </ul>
          </PageContainer>
        </section>

        <FaqSection faqs={d.faqs} />

        {/* Related */}
        <section aria-labelledby="term-related-heading" style={{ padding: "60px 0 100px", backgroundColor: colors.bgPure }}>
          <PageContainer>
            <h2 id="term-related-heading" style={{ ...headingStyle, fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>
              Keep reading
            </h2>
            <nav aria-label="Related pages">
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                {d.related.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      style={{
                        display: "inline-block",
                        padding: "0.6rem 1.25rem",
                        borderRadius: "999px",
                        backgroundColor: colors.bgOff,
                        border: `1px solid ${colors.borderBlue}`,
                        color: colors.brandBlue,
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        textDecoration: "none",
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </PageContainer>
        </section>

        <DownloadSection />
      </main>
      <Footer />
    </>
  );
}
