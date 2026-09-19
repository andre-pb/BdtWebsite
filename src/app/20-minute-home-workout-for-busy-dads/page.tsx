import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DownloadSection } from "@/components/home/DownloadSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqSection } from "@/components/guides/FaqSection";
import { PageContainer } from "@/components/ui/PageContainer";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import { eyebrowStyle, headingStyle, bodyStyle } from "@/components/ui/Typography";
import { colors } from "@/constants/colors";
import { twentyMinuteWorkoutGuidePage } from "@/content/twenty-minute-workout-guide";
import {
  absoluteUrl,
  buildFaqJsonLd,
  createPageMetadata,
  getArticleJsonLd,
  getBreadcrumbJsonLd,
  getWebPageJsonLd,
} from "@/lib/seo";

const { path, seo, hero, quickAnswer, sections, workoutSteps, weeklyPlan, mistakes, faqs, datePublished, dateModified } =
  twentyMinuteWorkoutGuidePage;

export const metadata = createPageMetadata({
  title: seo.title,
  description: seo.description,
  path,
  keywords: [...seo.keywords],
});

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": `${absoluteUrl(path)}#howto`,
  name: "How to do a 20-minute AMRAP home workout",
  description:
    "A 20-minute bodyweight AMRAP workout for busy dads using the 6-count burpee and the bodyweight squat. No equipment needed.",
  totalTime: "PT20M",
  step: workoutSteps.map((step, index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: step.name,
    text: step.text,
  })),
};

export default function TwentyMinuteWorkoutGuidePage() {
  return (
    <>
      <JsonLd
        data={[
          getWebPageJsonLd({ title: seo.title, description: seo.description, path, datePublished, dateModified }),
          getBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "20-Minute Home Workout for Busy Dads", path },
          ]),
          getArticleJsonLd({
            headline: seo.title,
            description: seo.description,
            path,
            datePublished,
            dateModified,
          }),
          buildFaqJsonLd(faqs),
          howToJsonLd,
        ]}
      />
      <Header />
      <main>
        <section
          aria-labelledby="guide-hero-heading"
          style={{
            paddingTop: "200px",
            paddingBottom: "100px",
            position: "relative",
            backgroundColor: colors.heroDark,
            backgroundImage: `linear-gradient(rgba(15,23,42,0.75), rgba(15,23,42,0.92)), url('${hero.backgroundImage}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
          }}
        >
          <PageContainer>
            <span style={{ ...eyebrowStyle, color: colors.accentLight }}>{hero.eyebrow}</span>
            <h1
              id="guide-hero-heading"
              style={{
                fontSize: "clamp(2.5rem, 4vw, 3.75rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "white",
                marginBottom: "1.5rem",
              }}
            >
              {hero.title}
            </h1>
            <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "1.25rem", lineHeight: 1.7, maxWidth: "720px" }}>
              {hero.intro}
            </p>
            <p
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.9rem",
                marginTop: "1.5rem",
                marginBottom: 0,
              }}
            >
              Updated {dateModified}
            </p>
          </PageContainer>
        </section>

        <QuickAnswer>{quickAnswer}</QuickAnswer>

        {/* Why 20 minutes + the workout intro */}
        {sections.slice(0, 2).map((section, index) => (
          <section
            key={section.id}
            aria-labelledby={`${section.id}-heading`}
            style={{ padding: "100px 0", backgroundColor: index % 2 === 0 ? colors.bgPure : colors.bgOff }}
          >
            <PageContainer>
              <h2 id={`${section.id}-heading`} style={headingStyle}>
                {section.title}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} style={bodyStyle}>
                  {paragraph}
                </p>
              ))}
            </PageContainer>
          </section>
        ))}

        {/* Step-by-step */}
        <section aria-labelledby="steps-heading" style={{ padding: "100px 0", backgroundColor: colors.bgPure }}>
          <PageContainer>
            <h2 id="steps-heading" style={headingStyle}>
              Step by step: your first session
            </h2>
            <ol
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
                counterReset: "step",
              }}
            >
              {workoutSteps.map((step, index) => (
                <li
                  key={step.name}
                  style={{
                    padding: "1.25rem 1.5rem",
                    backgroundColor: colors.bgOff,
                    borderRadius: "12px",
                    border: `1px solid ${colors.borderLight}`,
                    display: "flex",
                    gap: "1rem",
                    alignItems: "flex-start",
                  }}
                >
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
                      {step.name}
                    </strong>
                    <span style={{ ...bodyStyle, marginBottom: 0, fontSize: "1rem" }}>{step.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </PageContainer>
        </section>

        {/* Weekly plan */}
        <section aria-labelledby="weekly-plan-heading" style={{ padding: "100px 0", backgroundColor: colors.bgOff }}>
          <PageContainer>
            <h2 id="weekly-plan-heading" style={headingStyle}>
              {weeklyPlan.title}
            </h2>
            <p style={bodyStyle}>{weeklyPlan.intro}</p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "0 0 1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {weeklyPlan.days.map((entry) => (
                <li
                  key={entry.day}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "1rem",
                    padding: "0.9rem 1.5rem",
                    backgroundColor: colors.bgPure,
                    borderRadius: "12px",
                    border: `1px solid ${colors.borderLight}`,
                  }}
                >
                  <strong style={{ color: colors.textMain }}>{entry.day}</strong>
                  <span style={{ color: colors.textMuted }}>{entry.session}</span>
                </li>
              ))}
            </ul>
            <p style={{ ...bodyStyle, marginBottom: 0 }}>{weeklyPlan.outro}</p>
          </PageContainer>
        </section>

        {/* Progression + form + results */}
        {sections.slice(2).map((section, index) => (
          <section
            key={section.id}
            aria-labelledby={`${section.id}-heading`}
            style={{ padding: "100px 0", backgroundColor: index % 2 === 0 ? colors.bgPure : colors.bgOff }}
          >
            <PageContainer>
              <h2 id={`${section.id}-heading`} style={headingStyle}>
                {section.title}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} style={bodyStyle}>
                  {paragraph}
                </p>
              ))}
              {section.id === "form" && (
                <p style={{ ...bodyStyle, marginBottom: 0 }}>
                  <Link href="/movements/" style={{ color: colors.brandBlue, fontWeight: 600 }}>
                    Learn the movements step by step →
                  </Link>
                </p>
              )}
              {section.id === "progression" && (
                <p style={{ ...bodyStyle, marginBottom: 0 }}>
                  <Link href="/levels/" style={{ color: colors.brandBlue, fontWeight: 600 }}>
                    See how the four levels work →
                  </Link>
                </p>
              )}
            </PageContainer>
          </section>
        ))}

        {/* Common mistakes */}
        <section aria-labelledby="mistakes-heading" style={{ padding: "100px 0", backgroundColor: colors.bgOff }}>
          <PageContainer>
            <h2 id="mistakes-heading" style={headingStyle}>
              {mistakes.title}
            </h2>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              {mistakes.items.map((item) => (
                <li
                  key={item.label}
                  style={{
                    padding: "1.25rem 1.5rem",
                    backgroundColor: colors.bgPure,
                    borderRadius: "12px",
                    border: `1px solid ${colors.borderLight}`,
                  }}
                >
                  <strong style={{ color: colors.textMain, display: "block", marginBottom: "0.35rem" }}>
                    {item.label}
                  </strong>
                  <span style={{ ...bodyStyle, marginBottom: 0, fontSize: "1rem" }}>{item.description}</span>
                </li>
              ))}
            </ul>
          </PageContainer>
        </section>

        <FaqSection faqs={faqs} />
        <DownloadSection />
      </main>
      <Footer />
    </>
  );
}
