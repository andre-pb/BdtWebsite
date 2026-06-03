import { bestHomeWorkoutAppsPage } from "@/content/best-home-workout-apps";
import { colors } from "@/constants/colors";
import { PageContainer } from "@/components/ui/PageContainer";
import { bodyStyle, headingStyle } from "@/components/ui/Typography";

export function BestForPicksSection() {
  const { bestForPicks, apps } = bestHomeWorkoutAppsPage;
  const appById = Object.fromEntries(apps.map((app) => [app.id, app.name]));

  return (
    <section aria-labelledby="best-for-heading" style={{ padding: "100px 0", backgroundColor: colors.bgPure }}>
      <PageContainer>
        <h2 id="best-for-heading" style={headingStyle}>
          {bestForPicks.title}
        </h2>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {bestForPicks.picks.map((pick) => (
            <li
              key={pick.appId}
              style={{
                padding: "1.5rem",
                borderRadius: "12px",
                border: `1px solid ${colors.borderLight}`,
                backgroundColor: colors.bgOff,
              }}
            >
              <p style={{ margin: "0 0 0.35rem", fontWeight: 700, color: colors.textMain, fontSize: "1.1rem" }}>
                {pick.label}
              </p>
              <p style={{ margin: "0 0 0.5rem", color: colors.brandBlue, fontWeight: 600 }}>
                {appById[pick.appId]}
              </p>
              <p style={{ ...bodyStyle, marginBottom: 0, fontSize: "1rem" }}>{pick.reason}</p>
            </li>
          ))}
        </ul>
      </PageContainer>
    </section>
  );
}
