import { colors } from "@/constants/colors";

type Landmark = {
  movement: string;
  target: string;
};

type LandmarkWorkoutsProps = {
  landmarks: readonly Landmark[];
  variant?: "default" | "graduation";
};

export function LandmarkWorkouts({ landmarks, variant = "default" }: LandmarkWorkoutsProps) {
  const isGraduation = variant === "graduation";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "16px",
        marginTop: "24px",
      }}
    >
      {landmarks.map((landmark) => (
        <div
          key={`${landmark.movement}-${landmark.target}`}
          style={{
            padding: "20px 24px",
            borderRadius: "16px",
            background: isGraduation ? colors.heroDark : colors.bgBlueLight,
            border: isGraduation ? "none" : `1px solid ${colors.borderBlue}`,
          }}
        >
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: isGraduation ? colors.accentLight : colors.brandBlue,
              marginBottom: "8px",
            }}
          >
            {landmark.movement}
          </p>
          <p
            style={{
              fontSize: "1.25rem",
              fontWeight: 800,
              color: isGraduation ? "white" : colors.textMain,
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            {landmark.target}
          </p>
        </div>
      ))}
    </div>
  );
}

type LevelNumberBadgeProps = {
  number: number | string;
  large?: boolean;
};

export function LevelNumberBadge({ number, large = false }: LevelNumberBadgeProps) {
  const size = large ? "72px" : "56px";
  const fontSize = large ? "2rem" : "1.5rem";

  return (
    <div
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        borderRadius: "16px",
        background: colors.brandBlue,
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 800,
        fontSize,
        flexShrink: 0,
        boxShadow: "0 4px 14px 0 rgba(0,85,255,0.35)",
      }}
    >
      {number}
    </div>
  );
}
