import { colors } from "@/constants/colors";

type MiniUIRowProps = {
  label: string;
  value: string;
};

export function MiniUIRow({ label, value }: MiniUIRowProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 0",
        borderBottom: `1px solid ${colors.bgOff}`,
      }}
    >
      <span style={{ fontWeight: 600, fontSize: "0.95rem", color: colors.textMain }}>{label}</span>
      <span style={{ fontWeight: 800, color: colors.brandBlue, fontSize: "1.1rem" }}>{value}</span>
    </div>
  );
}

type LevelCardProps = {
  num: string;
  title: string;
  status: string;
  variant: "active" | "inProgress" | "locked";
};

export function LevelCard({ num, title, status, variant }: LevelCardProps) {
  const active = variant === "active";
  const inProgress = variant === "inProgress";
  const locked = variant === "locked";

  return (
    <div
      style={{
        background: active ? colors.bgBlueLight : colors.bgPure,
        borderRadius: "16px",
        padding: "16px",
        marginBottom: "16px",
        border: active || inProgress ? `1px solid ${colors.brandBlue}` : `1px solid ${colors.borderLight}`,
        boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        opacity: locked ? 0.5 : 1,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            background: active ? "white" : locked ? "transparent" : colors.bgBlueLight,
            border: active
              ? `2px solid ${colors.brandBlue}`
              : locked
                ? `2px solid ${colors.borderLight}`
                : "none",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: locked ? colors.textLight : colors.brandBlue,
            fontWeight: "bold",
            fontSize: "1.2rem",
          }}
        >
          {num}
        </div>
        <div>
          <h4
            style={{
              fontSize: "1rem",
              margin: 0,
              color: active ? "white" : colors.textMain,
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            {title}
          </h4>
          <p
            style={{
              fontSize: "0.8rem",
              margin: 0,
              color: active ? "rgba(255,255,255,0.8)" : colors.textLight,
            }}
          >
            {status}
          </p>
        </div>
      </div>
    </div>
  );
}
