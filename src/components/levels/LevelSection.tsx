import Image from "next/image";
import { colors } from "@/constants/colors";
import { LandmarkWorkouts, LevelNumberBadge } from "@/components/levels/LandmarkWorkouts";
import { bodyStyle, headingStyle } from "@/components/ui/Typography";
import { PageContainer } from "@/components/ui/PageContainer";

type Sublevel = {
  id: string;
  title: string;
  description: string;
  landmarks: readonly { movement: string; target: string }[];
};

type LevelWithSublevelsSectionProps = {
  id: string;
  number: number;
  title: string;
  image?: {
    src: string;
    alt: string;
  };
  intro?: string;
  sublevels: readonly Sublevel[];
  outro?: string;
  variant: "light" | "dark";
  highlight?: boolean;
};

export function LevelWithSublevelsSection({
  id,
  number,
  title,
  image,
  intro,
  sublevels,
  outro,
  variant,
  highlight = false,
}: LevelWithSublevelsSectionProps) {
  const isLight = variant === "light";
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      style={{
        padding: "120px 0",
        backgroundColor: isLight ? colors.bgPure : colors.bgOff,
        borderTop: highlight ? `3px solid ${colors.brandBlue}` : `1px solid ${colors.borderLight}`,
      }}
    >
      <PageContainer>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
            gap: "64px",
            alignItems: "center",
            marginBottom: "48px",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "2rem" }}>
              <LevelNumberBadge number={number} large />
              <h2 id={headingId} style={{ ...headingStyle, marginBottom: 0 }}>
                {title}
              </h2>
            </div>

            {intro ? <p style={{ ...bodyStyle, marginBottom: 0 }}>{intro}</p> : null}
          </div>

          {image ? (
            <div
              style={{
                position: "relative",
                borderRadius: "28px",
                overflow: "hidden",
                border: `1px solid ${colors.borderLight}`,
                background: colors.bgOff,
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={1200}
                height={800}
                sizes="(max-width: 768px) calc(100vw - 40px), 560px"
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  aspectRatio: "3 / 2",
                  objectFit: "cover",
                }}
              />
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {sublevels.map((sublevel, index) => (
            <article
              key={sublevel.id}
              id={`level-${sublevel.id}`}
              style={{
                padding: "32px",
                borderRadius: "20px",
                background: isLight ? colors.bgOff : colors.bgPure,
                border: `1px solid ${colors.borderLight}`,
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "24px",
                  right: "24px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: colors.textLight,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {index + 1} of {sublevels.length}
              </div>

              <h3
                style={{
                  fontSize: "1.35rem",
                  fontWeight: 800,
                  color: colors.brandBlue,
                  marginBottom: "12px",
                }}
              >
                {sublevel.title}
              </h3>
              <p style={{ ...bodyStyle, marginBottom: sublevel.landmarks.length > 0 ? "0.5rem" : 0 }}>
                {sublevel.description}
              </p>
              {sublevel.landmarks.length > 0 ? <LandmarkWorkouts landmarks={sublevel.landmarks} /> : null}
            </article>
          ))}
        </div>

        {outro ? (
          <p style={{ ...bodyStyle, marginTop: "2.5rem", marginBottom: 0, fontWeight: 600, color: colors.textMain }}>
            {outro}
          </p>
        ) : null}
      </PageContainer>
    </section>
  );
}

/** @deprecated Use LevelWithSublevelsSection */
export const Level1Section = LevelWithSublevelsSection;

type StandardLevel = {
  id: string;
  number: number;
  title: string;
  paragraphs: readonly string[];
  landmarks: readonly { movement: string; target: string }[];
  highlight?: boolean;
};

type StandardLevelSectionProps = {
  level: StandardLevel;
  variant: "light" | "dark";
};

export function StandardLevelSection({ level, variant }: StandardLevelSectionProps) {
  const isLight = variant === "light";

  return (
    <section
      id={level.id}
      aria-labelledby={`${level.id}-heading`}
      style={{
        padding: "120px 0",
        backgroundColor: isLight ? colors.bgPure : colors.bgOff,
        borderTop: level.highlight ? `3px solid ${colors.brandBlue}` : `1px solid ${colors.borderLight}`,
      }}
    >
      <PageContainer>
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "2rem" }}>
          <LevelNumberBadge number={level.number} large />
          <h2 id={`${level.id}-heading`} style={{ ...headingStyle, marginBottom: 0 }}>
            {level.title}
          </h2>
        </div>

        {level.paragraphs.map((paragraph, pIndex) => (
          <p
            key={paragraph.slice(0, 48)}
            style={{
              ...bodyStyle,
              marginBottom: "1.25rem",
              fontWeight: level.highlight && pIndex === 0 ? 700 : 400,
              color: level.highlight && pIndex === 0 ? colors.textMain : colors.textMuted,
            }}
          >
            {paragraph}
          </p>
        ))}

        <div style={{ marginTop: "8px" }}>
          <p
            style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: colors.brandBlue,
              marginBottom: "4px",
            }}
          >
            Landmark Workouts to unlock
          </p>
          <LandmarkWorkouts landmarks={level.landmarks} />
        </div>
      </PageContainer>
    </section>
  );
}
