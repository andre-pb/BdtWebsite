import { levelsPage } from "@/content/levels";
import { colors } from "@/constants/colors";
import { LandmarkWorkouts } from "@/components/levels/LandmarkWorkouts";
import { bodyStyle, eyebrowStyle, headingStyle } from "@/components/ui/Typography";
import { PageContainer } from "@/components/ui/PageContainer";

export function GraduationSection() {
  const { graduation, transition } = levelsPage;

  return (
    <>
      <section
        aria-label="Transition"
        style={{
          padding: "80px 0",
          background: colors.heroDark,
          textAlign: "center",
        }}
      >
        <PageContainer>
          <p
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "white",
              marginBottom: "8px",
            }}
          >
            {transition.prompt}
          </p>
          <p
            style={{
              fontSize: "0.95rem",
              fontWeight: 600,
              color: colors.textLight,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              margin: 0,
            }}
          >
            Busy Dad · {transition.author}
          </p>
        </PageContainer>
      </section>

      <section
        id="graduation"
        aria-labelledby="graduation-heading"
        style={{
          padding: "120px 0",
          backgroundColor: colors.bgPure,
          borderTop: `4px solid ${colors.brandBlue}`,
        }}
      >
        <PageContainer>
          <span
            style={{
              ...eyebrowStyle,
              padding: "6px 14px",
              borderRadius: "9999px",
              background: colors.bgBlueLight,
            }}
          >
            {graduation.eyebrow}
          </span>
          <h2 id="graduation-heading" style={headingStyle}>
            {graduation.title}
          </h2>

          {graduation.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} style={{ ...bodyStyle, marginBottom: "1.25rem" }}>
              {paragraph}
            </p>
          ))}

          <p
            style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: colors.brandBlue,
              marginTop: "24px",
              marginBottom: "4px",
            }}
          >
            Graduation Workouts
          </p>
          <LandmarkWorkouts landmarks={graduation.landmarks} variant="graduation" />

          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "24px 0 0",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {graduation.requirements.map((req) => (
              <li
                key={req}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  fontSize: "0.95rem",
                  color: colors.textMuted,
                }}
              >
                <span style={{ color: colors.brandBlue, fontWeight: 700, flexShrink: 0 }}>✓</span>
                {req}
              </li>
            ))}
          </ul>
        </PageContainer>
      </section>
    </>
  );
}

export function LevelsFooterNote() {
  const { footerNote } = levelsPage;

  return (
    <section
      aria-label="Additional resources"
      style={{
        padding: "80px 0",
        backgroundColor: colors.bgOff,
        textAlign: "center",
      }}
    >
      <PageContainer>
        <p style={{ ...bodyStyle, marginBottom: "1rem" }}>{footerNote.text}</p>
        <p
          style={{
            fontSize: "0.95rem",
            fontWeight: 600,
            color: colors.textLight,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            margin: 0,
          }}
        >
          {footerNote.author}
        </p>
      </PageContainer>
    </section>
  );
}
