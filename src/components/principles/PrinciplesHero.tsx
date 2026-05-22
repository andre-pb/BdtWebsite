import { principlesPage } from "@/content/principles";
import { colors } from "@/constants/colors";
import { eyebrowStyle } from "@/components/ui/Typography";
import { PageContainer } from "@/components/ui/PageContainer";

export function PrinciplesHero() {
  const { hero } = principlesPage;

  return (
    <section
      aria-labelledby="principles-hero-heading"
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
          id="principles-hero-heading"
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
        <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "1.25rem", lineHeight: 1.7 }}>
          {hero.intro}
        </p>
      </PageContainer>
    </section>
  );
}
