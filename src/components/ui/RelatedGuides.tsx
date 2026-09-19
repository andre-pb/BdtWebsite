import Link from "next/link";
import { colors } from "@/constants/colors";
import { PageContainer } from "@/components/ui/PageContainer";
import type { RelatedGuideLink } from "@/content/related-guides";

type Props = {
  links: readonly RelatedGuideLink[];
  title?: string;
  /** "dark" for pages laid out on the hero-dark background. */
  variant?: "light" | "dark";
};

/**
 * "Goes well with" block: a short grid of related pages with one-line
 * descriptions. Plain <a> links and real text, so crawlers and AI engines
 * can follow the relationships between pages (Microsoft AEO/GEO pillar 2).
 */
export function RelatedGuides({ links, title = "Related guides", variant = "light" }: Props) {
  if (links.length === 0) return null;
  const dark = variant === "dark";

  return (
    <section
      aria-labelledby="related-guides-heading"
      style={{
        padding: "72px 0",
        backgroundColor: dark ? colors.heroDark : colors.bgOff,
        borderTop: `1px solid ${dark ? "rgba(255,255,255,0.08)" : colors.borderLight}`,
      }}
    >
      <PageContainer>
        <h2
          id="related-guides-heading"
          style={{
            fontSize: "0.875rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: dark ? colors.accentLight : colors.brandBlue,
            marginBottom: "1.25rem",
          }}
        >
          {title}
        </h2>
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "14px",
          }}
        >
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                style={{
                  display: "block",
                  height: "100%",
                  padding: "18px 20px",
                  borderRadius: "16px",
                  border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : colors.borderLight}`,
                  background: dark ? "rgba(255,255,255,0.04)" : colors.bgPure,
                  textDecoration: "none",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: "1.02rem",
                    fontWeight: 700,
                    color: dark ? "white" : colors.textMain,
                    marginBottom: "6px",
                  }}
                >
                  {link.title} <span aria-hidden="true">→</span>
                </span>
                <span
                  style={{
                    display: "block",
                    fontSize: "0.92rem",
                    lineHeight: 1.5,
                    color: dark ? "rgba(255,255,255,0.65)" : colors.textMuted,
                  }}
                >
                  {link.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </PageContainer>
    </section>
  );
}
