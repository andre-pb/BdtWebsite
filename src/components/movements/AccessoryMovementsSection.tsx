// Temporarily disabled — uncomment alongside movementsPage.accessory and the page import.

export function AccessoryMovementsSection() {
  return null;
}

/*
import { movementsPage } from "@/content/movements";
import { colors } from "@/constants/colors";
import { MovementBadge } from "@/components/movements/MovementBadge";
import { YouTubeEmbed } from "@/components/ui/YouTubeEmbed";
import { bodyStyle, headingStyle } from "@/components/ui/Typography";
import { PageContainer } from "@/components/ui/PageContainer";

export function AccessoryMovementsSection() {
  const { accessory } = movementsPage;

  return (
    <section
      id="accessory-movements"
      aria-labelledby="accessory-heading"
      style={{ padding: "120px 0", backgroundColor: colors.bgOff }}
    >
      <PageContainer>
        <span
          style={{
            display: "inline-block",
            padding: "6px 14px",
            borderRadius: "9999px",
            fontSize: "0.75rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            background: colors.borderLight,
            color: colors.textMuted,
            marginBottom: "1.5rem",
          }}
        >
          Secondary · Use Sparingly
        </span>

        <h2 id="accessory-heading" style={headingStyle}>
          {accessory.title}
        </h2>

        {accessory.intro.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} style={{ ...bodyStyle, marginBottom: "1.25rem" }}>
            {paragraph}
          </p>
        ))}

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: "2rem 0",
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          {accessory.primaryList.map((item) => (
            <li
              key={item}
              style={{
                padding: "10px 18px",
                borderRadius: "12px",
                background: colors.bgPure,
                border: `1px solid ${colors.borderLight}`,
                fontWeight: 600,
                fontSize: "0.95rem",
                color: colors.textMain,
              }}
            >
              {item}
            </li>
          ))}
          {accessory.secondaryMovements.map((movement) => (
            <li
              key={movement.id}
              style={{
                padding: "10px 18px",
                borderRadius: "12px",
                background: colors.bgPure,
                border: `1px dashed ${colors.textLight}`,
                fontWeight: 600,
                fontSize: "0.95rem",
                color: colors.textMuted,
              }}
            >
              {movement.shortName}
              <span style={{ fontWeight: 500, fontSize: "0.8rem", marginLeft: "6px" }}>(secondary)</span>
            </li>
          ))}
        </ul>

        <p style={{ ...bodyStyle, marginBottom: "3rem" }}>{accessory.burpeeIntro}</p>

        {accessory.secondaryMovements.map((movement, index) => (
          <article
            key={movement.id}
            id={movement.id}
            style={{
              marginBottom: index < accessory.secondaryMovements.length - 1 ? "80px" : 0,
              paddingTop: index > 0 ? "80px" : 0,
              borderTop: index > 0 ? `1px solid ${colors.borderLight}` : "none",
            }}
          >
            <MovementBadge tier="secondary" />
            <h3
              style={{
                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                fontWeight: 700,
                lineHeight: 1.2,
                color: colors.textMain,
                marginBottom: "1rem",
              }}
            >
              {movement.title}
            </h3>
            {movement.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} style={{ ...bodyStyle, marginBottom: "1.25rem" }}>
                {paragraph}
              </p>
            ))}
            <div style={{ marginTop: "24px" }}>
              <p
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: colors.textLight,
                  marginBottom: "12px",
                }}
              >
                Tutorial
              </p>
              <YouTubeEmbed videoId={movement.video.youtubeId} title={movement.video.label} />
              <a
                href={movement.video.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: "12px",
                  fontSize: "0.9rem",
                  color: colors.brandBlue,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Watch on YouTube →
              </a>
            </div>
          </article>
        ))}
      </PageContainer>
    </section>
  );
}
*/
