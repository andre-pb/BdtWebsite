import { movementsPage } from "@/content/movements";
import { colors } from "@/constants/colors";
import { bodyStyle } from "@/components/ui/Typography";
import { PageContainer } from "@/components/ui/PageContainer";

export function MovementsIntro() {
  const { intro } = movementsPage;

  return (
    <section aria-labelledby="movements-intro" style={{ padding: "120px 0", backgroundColor: colors.bgOff }}>
      <PageContainer>
        {intro.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} style={{ ...bodyStyle, marginBottom: "1.25rem" }}>
            {paragraph}
          </p>
        ))}
        <p
          style={{
            marginTop: "2rem",
            fontSize: "0.95rem",
            fontWeight: 600,
            color: colors.textLight,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Busy Dad · {intro.author}
        </p>
      </PageContainer>
    </section>
  );
}
