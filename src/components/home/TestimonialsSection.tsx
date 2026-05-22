import { testimonials } from "@/content/site";
import { colors } from "@/constants/colors";
import { PageContainer } from "@/components/ui/PageContainer";

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      style={{ padding: "120px 0", background: colors.bgOff }}
    >
      <PageContainer>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
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
            {testimonials.eyebrow}
          </span>
          <h2
            id="testimonials-heading"
            style={{
              fontSize: "clamp(2rem, 3vw, 3rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: colors.textMain,
              marginBottom: "1rem",
            }}
          >
            {testimonials.title}
          </h2>
          <p
            style={{
              color: colors.textMuted,
              fontSize: "1.125rem",
              maxWidth: "560px",
              margin: "0 auto",
            }}
          >
            {testimonials.description}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {testimonials.quotes.map((t) => (
            <figure
              key={t.name}
              style={{
                background: colors.bgPure,
                borderRadius: "24px",
                border: `1px solid ${colors.borderLight}`,
                padding: "32px",
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                boxShadow: "0 10px 40px -20px rgba(0,0,0,0.06)",
              }}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                width="28"
                height="28"
                fill={colors.brandBlue}
                style={{ opacity: 0.85 }}
              >
                <path d="M9.5 6C5.91 6 3 8.91 3 12.5V18h6v-5.5H6.5c0-1.66 1.34-3 3-3V6zm11 0c-3.59 0-6.5 2.91-6.5 6.5V18h6v-5.5h-2.5c0-1.66 1.34-3 3-3V6z" />
              </svg>
              <blockquote
                style={{
                  margin: 0,
                  color: colors.textMain,
                  fontSize: "1rem",
                  lineHeight: 1.6,
                  flex: 1,
                }}
              >
                {t.quote}
              </blockquote>
              <figcaption style={{ marginTop: "auto" }}>
                <div
                  style={{
                    fontWeight: 700,
                    color: colors.textMain,
                    fontSize: "1rem",
                  }}
                >
                  {t.name}
                </div>
                <div
                  style={{
                    color: colors.textMuted,
                    fontSize: "0.9rem",
                    marginTop: "2px",
                  }}
                >
                  {t.role}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
