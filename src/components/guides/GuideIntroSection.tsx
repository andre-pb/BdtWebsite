import { bestHomeWorkoutAppsPage } from "@/content/best-home-workout-apps";
import { colors } from "@/constants/colors";
import { PageContainer } from "@/components/ui/PageContainer";
import { bodyStyle, headingStyle } from "@/components/ui/Typography";

export function GuideIntroSection() {
  const { intro, criteria } = bestHomeWorkoutAppsPage;

  return (
    <section aria-labelledby="guide-intro-heading" style={{ padding: "100px 0", backgroundColor: colors.bgPure }}>
      <PageContainer>
        <h2 id="guide-intro-heading" style={headingStyle}>
          {intro.title}
        </h2>
        {intro.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} style={bodyStyle}>
            {paragraph}
          </p>
        ))}

        <h3
          style={{
            ...headingStyle,
            fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
            marginTop: "3rem",
          }}
        >
          {criteria.title}
        </h3>
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
          {criteria.items.map((item) => (
            <li
              key={item.label}
              style={{
                padding: "1.25rem 1.5rem",
                backgroundColor: colors.bgOff,
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
  );
}
