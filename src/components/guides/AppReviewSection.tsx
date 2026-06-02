import Link from "next/link";
import { bestHomeWorkoutAppsPage } from "@/content/best-home-workout-apps";
import { colors } from "@/constants/colors";
import { PageContainer } from "@/components/ui/PageContainer";
import { bodyStyle, headingStyle } from "@/components/ui/Typography";

type GuideApp = (typeof bestHomeWorkoutAppsPage.apps)[number];

type AppReviewSectionProps = {
  app: GuideApp;
  variant: "light" | "dark";
};

export function AppReviewSection({ app, variant }: AppReviewSectionProps) {
  const isLight = variant === "light";
  const websiteHost = new URL(app.websiteUrl).hostname.replace(/^www\./, "");

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
          {app.isOwnProduct && (
            <>
              {" · "}
              <Link href="/" style={{ color: colors.brandBlue, fontWeight: 600 }}>
                busydadtraining.com
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
