import { colors } from "@/constants/colors";
import { MovementBadge } from "@/components/movements/MovementBadge";
import { YouTubeEmbed } from "@/components/ui/YouTubeEmbed";
import { bodyStyle, eyebrowStyle, headingStyle } from "@/components/ui/Typography";
import { PageContainer } from "@/components/ui/PageContainer";

type SacredMovement = {
  id: string;
  order: number;
  eyebrow: string;
  title: string;
  shortName: string;
  paragraphs: readonly string[];
  summary: string;
  video: {
    label: string;
    youtubeId: string;
    url: string;
  };
};

type SacredMovementSectionProps = {
  movement: SacredMovement;
  reversed?: boolean;
};

export function SacredMovementSection({ movement, reversed = false }: SacredMovementSectionProps) {
  return (
    <section
      id={movement.id}
      aria-labelledby={`${movement.id}-heading`}
      style={{
        padding: "120px 0",
        backgroundColor: colors.bgPure,
        borderTop: `3px solid ${colors.brandBlue}`,
      }}
    >
      <PageContainer
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "64px",
          alignItems: "start",
        }}
      >
        <div style={{ order: reversed ? 2 : 1 }}>
          <MovementBadge tier="sacred" order={movement.order} />
          <span style={eyebrowStyle}>{movement.eyebrow}</span>
          <h2 id={`${movement.id}-heading`} style={headingStyle}>
            {movement.title}
          </h2>
          {movement.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} style={{ ...bodyStyle, marginBottom: "1.25rem" }}>
              {paragraph}
            </p>
          ))}
          <p
            style={{
              ...bodyStyle,
              fontWeight: 700,
              color: colors.textMain,
              fontSize: "1.2rem",
              marginTop: "1.5rem",
              marginBottom: 0,
            }}
          >
            {movement.summary}
          </p>
        </div>

        <div style={{ order: reversed ? 1 : 2 }}>
          <p
            style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: colors.brandBlue,
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
            {movement.video.label} →
          </a>
        </div>
      </PageContainer>
    </section>
  );
}
