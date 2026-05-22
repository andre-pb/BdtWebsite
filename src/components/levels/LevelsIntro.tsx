import { levelsPage } from "@/content/levels";
import { colors } from "@/constants/colors";
import { bodyStyle } from "@/components/ui/Typography";
import { PageContainer } from "@/components/ui/PageContainer";

export function LevelsIntro() {
  const { intro } = levelsPage;

  return (
    <section aria-labelledby="levels-intro" style={{ padding: "120px 0", backgroundColor: colors.bgOff }}>
      <PageContainer>
        {intro.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} style={{ ...bodyStyle, marginBottom: "1.25rem" }}>
            {paragraph}
          </p>
        ))}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
            marginTop: "48px",
          }}
        >
          {intro.goals.map((goal) => (
            <div
              key={goal.term}
              style={{
                padding: "24px",
                borderRadius: "16px",
                background: colors.bgPure,
                border: `1px solid ${colors.borderLight}`,
              }}
            >
              <p
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: colors.brandBlue,
                  marginBottom: "8px",
                }}
              >
                {goal.term} goal
              </p>
              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: colors.textMain,
                  marginBottom: "6px",
                  lineHeight: 1.3,
                }}
              >
                {goal.description}
              </p>
              <p style={{ fontSize: "0.9rem", color: colors.textLight, margin: 0, fontStyle: "italic" }}>
                {goal.metaphor}
              </p>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
