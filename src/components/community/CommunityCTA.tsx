import { communityPage } from "@/content/community";
import { colors } from "@/constants/colors";
import { AppStoreBadge, GooglePlayBadge } from "@/components/ui/AppStoreBadges";
import { PageContainer } from "@/components/ui/PageContainer";

export function CommunityCTA() {
  const { cta } = communityPage;

  return (
    <section
      id="join"
      aria-labelledby="community-cta-heading"
      style={{
        padding: "120px 0",
        textAlign: "center",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <PageContainer>
        <span
          style={{
            display: "inline-block",
            fontSize: "0.875rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: colors.accentLight,
            marginBottom: "1rem",
          }}
        >
          {cta.eyebrow}
        </span>
        <h2
          id="community-cta-heading"
          style={{
            fontSize: "clamp(2rem, 3vw, 3rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "white",
            marginBottom: "1rem",
          }}
        >
          {cta.title}
        </h2>
        <p
          style={{
            color: "rgba(255,255,255,0.8)",
            fontSize: "1.125rem",
            marginBottom: "2.5rem",
            maxWidth: "520px",
            marginInline: "auto",
            lineHeight: 1.5,
          }}
        >
          {cta.description}
        </p>

        <div
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <AppStoreBadge />
          <GooglePlayBadge />
        </div>
      </PageContainer>
    </section>
  );
}
