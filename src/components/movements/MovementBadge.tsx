import { colors } from "@/constants/colors";

type MovementBadgeProps = {
  tier: "sacred" | "secondary";
  order?: number;
};

export function MovementBadge({ tier, order }: MovementBadgeProps) {
  const isSacred = tier === "sacred";

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "6px 14px",
        borderRadius: "9999px",
        fontSize: "0.75rem",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        background: isSacred ? colors.brandBlue : colors.bgOff,
        color: isSacred ? "white" : colors.textMuted,
        border: isSacred ? "none" : `1px solid ${colors.borderLight}`,
        marginBottom: "1rem",
      }}
    >
      {isSacred ? (
        <>
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "white",
              flexShrink: 0,
            }}
            aria-hidden="true"
          />
          Sacred Movement · Primary{order ? ` · ${order} of 2` : ""}
        </>
      ) : (
        <>Accessory · Secondary Burpee</>
      )}
    </span>
  );
}
