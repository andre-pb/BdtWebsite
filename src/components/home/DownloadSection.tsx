import { download } from "@/content/site";
import { colors } from "@/constants/colors";
import { AppStoreBadge, GooglePlayBadge } from "@/components/ui/AppStoreBadges";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";
import { PageContainer } from "@/components/ui/PageContainer";

export function DownloadSection() {
  return (
    <section
      id="download"
      aria-labelledby="download-heading"
      style={{ padding: "120px 0 60px", background: colors.heroDark, textAlign: "center" }}
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
          {download.eyebrow}
        </span>
        <h2
          id="download-heading"
          style={{
            fontSize: "clamp(2rem, 3vw, 3rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "white",
            marginBottom: "1rem",
          }}
        >
          {download.title}
        </h2>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.125rem", marginBottom: "2rem" }}>
          {download.description}
        </p>

        <NewsletterSignup />

        <div
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "40px",
          }}
        >
          <AppStoreBadge />
          <GooglePlayBadge />
        </div>
      </PageContainer>
    </section>
  );
}
