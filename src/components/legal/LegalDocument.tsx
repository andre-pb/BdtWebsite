import { PageContainer } from "@/components/ui/PageContainer";
import { headingStyle, bodyStyle } from "@/components/ui/Typography";
import type { LegalSection } from "@/content/legal";
import { colors } from "@/constants/colors";

type LegalDocumentProps = {
  heading: string;
  intro: string;
  sections: readonly LegalSection[];
  lastUpdated?: string;
};

export function LegalDocument({
  heading,
  intro,
  sections,
  lastUpdated,
}: LegalDocumentProps) {
  return (
    <section style={{ padding: "120px 0 80px", background: colors.bgPure }}>
      <PageContainer>
        <h1 style={{ ...headingStyle, marginBottom: "0.5rem" }}>{heading}</h1>
        {lastUpdated ? (
          <p
            style={{
              ...bodyStyle,
              fontSize: "0.95rem",
              color: colors.textLight,
              marginBottom: "1.5rem",
            }}
          >
            Last updated: {lastUpdated}
          </p>
        ) : null}
        <p style={{ ...bodyStyle, maxWidth: "720px" }}>{intro}</p>

        <div style={{ maxWidth: "720px", marginTop: "2rem" }}>
          {sections.map((section) => (
            <article key={section.id} style={{ marginBottom: "2.5rem" }}>
              <h2
                style={{
                  fontSize: "1.35rem",
                  fontWeight: 700,
                  color: colors.textMain,
                  marginBottom: "0.75rem",
                  lineHeight: 1.3,
                }}
              >
                {section.title}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} style={{ ...bodyStyle, fontSize: "1rem" }}>
                  {paragraph}
                </p>
              ))}
              {section.list ? (
                <ul
                  style={{
                    color: colors.textMuted,
                    fontSize: "1rem",
                    lineHeight: 1.7,
                    paddingLeft: "1.25rem",
                    marginBottom: "1rem",
                  }}
                >
                  {section.list.map((item) => (
                    <li key={item} style={{ marginBottom: "0.5rem" }}>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
