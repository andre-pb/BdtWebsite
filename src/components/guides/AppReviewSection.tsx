import Link from "next/link";
import type { GuideApp } from "@/content/guide-types";
import { colors } from "@/constants/colors";
import { PageContainer } from "@/components/ui/PageContainer";
import { bodyStyle, headingStyle } from "@/components/ui/Typography";

type AppReviewSectionProps = {
  app: GuideApp;
  variant: "light" | "dark";
};

export function AppReviewSection({ app, variant }: AppReviewSectionProps) {
  const isLight = variant === "light";
  const websiteHost = new URL(app.websiteUrl).hostname.replace(/^www\./, "");
  const metaBits = [app.platforms, app.ratingNote].filter(Boolean);

  return (
    <section
      id={app.id}
      aria-labelledby={`${app.id}-heading`}
      style={{
        padding: "100px 0",
        backgroundColor: isLight ? colors.bgPure : colors.bgOff,
      }}
    >
      <PageContainer>
        <h2 id={`${app.id}-heading`} style={headingStyle}>
          {app.name}
        </h2>
        <p style={{ ...bodyStyle, fontSize: "0.95rem", marginBottom: "0.5rem" }}>
          <strong style={{ color: colors.textMain }}>Best for:</strong> {app.bestFor}
        </p>
        {metaBits.length > 0 && (
          <p style={{ ...bodyStyle, fontSize: "0.9rem", color: colors.textLight, marginBottom: "1rem" }}>
            {metaBits.join(" · ")}
          </p>
        )}
        <p style={bodyStyle}>{app.summary}</p>
        <p style={{ ...bodyStyle, marginBottom: "1.5rem" }}>
          <a
            href={app.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: colors.brandBlue, fontWeight: 600 }}
          >
            {websiteHost}
          </a>
          {app.appStoreUrl && (
            <>
              {" · "}
              <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer" style={{ color: colors.brandBlue, fontWeight: 600 }}>
                App Store
              </a>
            </>
          )}
          {app.googlePlayUrl && (
            <>
              {" · "}
              <a href={app.googlePlayUrl} target="_blank" rel="noopener noreferrer" style={{ color: colors.brandBlue, fontWeight: 600 }}>
                Google Play
              </a>
            </>
          )}
          {app.isOwnProduct && (
            <>
              {" · "}
              <Link href="/pricing/" style={{ color: colors.brandBlue, fontWeight: 600 }}>
                Pricing
              </Link>
            </>
          )}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
            marginTop: "2rem",
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: 700,
                color: colors.textMain,
                marginBottom: "0.75rem",
              }}
            >
              Pros
            </h3>
            <ul style={{ margin: 0, paddingLeft: "1.25rem", color: colors.textMuted, lineHeight: 1.7 }}>
              {app.pros.map((pro) => (
                <li key={pro.slice(0, 40)} style={{ marginBottom: "0.5rem" }}>
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: 700,
                color: colors.textMain,
                marginBottom: "0.75rem",
              }}
            >
              Cons
            </h3>
            <ul style={{ margin: 0, paddingLeft: "1.25rem", color: colors.textMuted, lineHeight: 1.7 }}>
              {app.cons.map((con) => (
                <li key={con.slice(0, 40)} style={{ marginBottom: "0.5rem" }}>
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
