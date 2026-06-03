import Link from "next/link";
import { bestHomeWorkoutAppsPage } from "@/content/best-home-workout-apps";
import { featuredIn } from "@/content/site";
import { colors } from "@/constants/colors";
import { PageContainer } from "@/components/ui/PageContainer";
import { bodyStyle, headingStyle } from "@/components/ui/Typography";

export function WhyBdpSection() {
  const { whyBdp } = bestHomeWorkoutAppsPage;

  return (
    <section aria-labelledby="why-bdp-heading" style={{ padding: "100px 0", backgroundColor: colors.bgOff }}>
      <PageContainer>
        <h2 id="why-bdp-heading" style={headingStyle}>
          {whyBdp.title}
        </h2>
        {whyBdp.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} style={bodyStyle}>
            {paragraph}
          </p>
        ))}

        <nav aria-label="Related Busy Dad Training pages" style={{ marginTop: "2rem", marginBottom: "2.5rem" }}>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            {whyBdp.internalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  style={{
                    display: "inline-block",
                    padding: "0.6rem 1.25rem",
                    borderRadius: "999px",
                    backgroundColor: colors.bgPure,
                    border: `1px solid ${colors.borderBlue}`,
                    color: colors.brandBlue,
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p style={{ ...bodyStyle, fontSize: "0.95rem", marginBottom: "0.75rem" }}>
          <strong style={{ color: colors.textMain }}>{featuredIn.label}</strong>
        </p>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {featuredIn.logos.map((logo) => (
            <li key={logo.name}>
              <a
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: colors.brandBlue, fontWeight: 500 }}
              >
                {logo.name}
              </a>
            </li>
          ))}
        </ul>
      </PageContainer>
    </section>
  );
}
