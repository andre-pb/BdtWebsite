import { aboutPage } from "@/content/about";
import { colors } from "@/constants/colors";
import { bodyStyle, eyebrowStyle, headingStyle } from "@/components/ui/Typography";
import { PageContainer } from "@/components/ui/PageContainer";

export function OriginTimeline() {
  const { timeline, youtube } = aboutPage;

  return (
    <section
      id="story"
      aria-labelledby="origin-heading"
      style={{ padding: "120px 0", backgroundColor: colors.bgPure }}
    >
      <PageContainer>
        <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 64px" }}>
          <span style={eyebrowStyle}>{timeline.eyebrow}</span>
          <h2 id="origin-heading" style={headingStyle}>
            {timeline.title}
          </h2>
          <p style={{ ...bodyStyle, marginBottom: 0 }}>{timeline.description}</p>
        </div>

        <ol
          style={{
            listStyle: "none",
            margin: "0 0 64px",
            padding: 0,
            display: "grid",
            gap: "32px",
          }}
        >
          {timeline.steps.map((step) => (
            <li
              key={step.id}
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: "24px 32px",
                alignItems: "start",
                padding: "32px",
                background: colors.bgOff,
                borderRadius: "24px",
                border: `1px solid ${colors.borderLight}`,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: colors.brandBlue,
                  paddingTop: "4px",
                }}
              >
                {step.step}
              </span>
              <div>
                <h3
                  style={{
                    margin: "0 0 12px",
                    fontSize: "1.35rem",
                    fontWeight: 700,
                    lineHeight: 1.2,
                    color: colors.textMain,
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ margin: 0, color: colors.textMuted, fontSize: "1.05rem", lineHeight: 1.7 }}>
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "24px",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "28px 32px",
            background: colors.bgOff,
            borderRadius: "20px",
            border: `1px solid ${colors.borderLight}`,
          }}
        >
          <div>
            <p
              style={{
                margin: "0 0 4px",
                fontSize: "0.8rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: colors.brandBlue,
              }}
            >
              YouTube
            </p>
            <p style={{ margin: "0 0 4px", fontSize: "1.1rem", fontWeight: 700, color: colors.textMain }}>
              {youtube.channelName}
            </p>
            <p style={{ margin: 0, color: colors.textMuted, fontSize: "0.95rem" }}>
              {youtube.channelHandle} · {youtube.description}
            </p>
          </div>
          <a
            href={youtube.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: colors.brandBlue,
              fontWeight: 600,
              fontSize: "1rem",
              textDecoration: "none",
            }}
          >
            {youtube.linkLabel}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </PageContainer>
    </section>
  );
}
