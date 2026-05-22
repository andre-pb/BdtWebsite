import { colors } from "@/constants/colors";

const eyebrowStyle = {
  display: "inline-block" as const,
  fontSize: "0.875rem",
  fontWeight: 700,
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
  color: colors.brandBlue,
  marginBottom: "1rem",
};

const headingStyle = {
  fontSize: "clamp(2rem, 3vw, 3rem)",
  fontWeight: 700,
  lineHeight: 1.1,
  letterSpacing: "-0.02em",
  color: colors.textMain,
  marginBottom: "1rem",
};

const bodyStyle = {
  color: colors.textMuted,
  fontSize: "1.125rem",
  marginBottom: "1.5rem",
  lineHeight: 1.7,
};

type PullQuoteProps = {
  children: string;
  light?: boolean;
};

export function PullQuote({ children, light = false }: PullQuoteProps) {
  return (
    <blockquote
      style={{
        borderLeft: `4px solid ${colors.brandBlue}`,
        paddingLeft: "24px",
        margin: "32px 0",
        fontSize: "clamp(1.125rem, 2vw, 1.35rem)",
        fontStyle: "italic",
        fontWeight: 500,
        lineHeight: 1.5,
        color: light ? "rgba(255,255,255,0.95)" : colors.textMain,
      }}
    >
      &ldquo;{children}&rdquo;
    </blockquote>
  );
}

export { eyebrowStyle, headingStyle, bodyStyle };
