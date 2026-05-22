import Image from "next/image";
import { philosophy } from "@/content/site";
import { colors } from "@/constants/colors";
import { PageContainer } from "@/components/ui/PageContainer";

export function PhilosophySection() {
  return (
    <section
      id="philosophy"
      aria-labelledby="philosophy-heading"
      style={{ padding: "120px 0", backgroundColor: colors.bgOff }}
    >
      <PageContainer
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "80px",
          alignItems: "center",
        }}
      >
        <div>
          <span
            style={{
              display: "inline-block",
              fontSize: "0.875rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: colors.brandBlue,
              marginBottom: "1rem",
            }}
          >
            {philosophy.eyebrow}
          </span>
          <h2
            id="philosophy-heading"
            style={{
              fontSize: "clamp(2rem, 3vw, 3rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: colors.textMain,
              marginBottom: "1rem",
            }}
          >
            {philosophy.title}
          </h2>
          <p style={{ color: colors.textMuted, fontSize: "1.125rem", marginBottom: "1.5rem" }}>
            {philosophy.description}
          </p>
          <div
            style={{
              marginTop: "32px",
              width: "64px",
              height: "64px",
              background: colors.bgBlueLight,
              color: colors.brandBlue,
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19M23 13v-2M11 6v12M11 6h-6M11 18h-6M11 6h4M11 18h4" />
            </svg>
          </div>
        </div>
        <div>
          <Image
            src={philosophy.image}
            alt={philosophy.imageAlt}
            width={1080}
            height={1430}
            style={{
              width: "100%",
              maxWidth: "420px",
              borderRadius: "24px",
              boxShadow: "0 20px 60px -20px rgba(0,0,0,0.15)",
              objectFit: "cover",
              aspectRatio: "4/5",
              display: "block",
              height: "auto",
            }}
          />
        </div>
      </PageContainer>
    </section>
  );
}
