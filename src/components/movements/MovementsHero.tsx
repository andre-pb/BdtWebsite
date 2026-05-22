import { movementsPage } from "@/content/movements";
import { colors } from "@/constants/colors";
import { eyebrowStyle } from "@/components/ui/Typography";
import { PageContainer } from "@/components/ui/PageContainer";

export function MovementsHero() {
  const { hero } = movementsPage;

  return (
    <section
      aria-labelledby="movements-hero-heading"
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
          id="movements-hero-heading"
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
        <p
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 18px",
            borderRadius: "9999px",
            background: "rgba(0, 85, 255, 0.2)",
            border: "1px solid rgba(0, 85, 255, 0.4)",
            color: colors.accentLight,
            fontSize: "0.9rem",
            fontWeight: 600,
          }}
        >
          6-Count &amp; Navy Seal are your primary training. Everything else is secondary.
        </p>
      </PageContainer>
    </section>
  );
}
