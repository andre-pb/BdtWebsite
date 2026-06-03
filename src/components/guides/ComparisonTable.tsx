import { bestHomeWorkoutAppsPage } from "@/content/best-home-workout-apps";
import { colors } from "@/constants/colors";
import { PageContainer } from "@/components/ui/PageContainer";
import { headingStyle } from "@/components/ui/Typography";

export function ComparisonTable() {
  const { apps, comparisonColumns } = bestHomeWorkoutAppsPage;

  return (
    <section aria-labelledby="comparison-table-heading" style={{ padding: "80px 0", backgroundColor: colors.bgOff }}>
      <PageContainer>
        <h2 id="comparison-table-heading" style={{ ...headingStyle, marginBottom: "2rem" }}>
          At a glance
        </h2>
        <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          <table
            style={{
              width: "100%",
              minWidth: "640px",
              borderCollapse: "collapse",
              fontSize: "0.95rem",
              backgroundColor: colors.bgPure,
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 24px -8px rgba(15,23,42,0.08)",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: colors.heroDark, color: "white" }}>
                <th
                  scope="col"
                  style={{
                    textAlign: "left",
                    padding: "1rem 1.25rem",
                    fontWeight: 700,
                  }}
                >
                  App
                </th>
                {comparisonColumns.map((col) => (
                  <th
                    key={col.key}
                    scope="col"
                    style={{
                      textAlign: "left",
                      padding: "1rem 1.25rem",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {apps.map((app, rowIndex) => (
                <tr
                  key={app.id}
                  style={{
                    borderTop: `1px solid ${colors.borderLight}`,
                    backgroundColor: app.isOwnProduct ? colors.bgBlueLight : "transparent",
                  }}
                >
                  <th
                    scope="row"
                    style={{
                      textAlign: "left",
                      padding: "1rem 1.25rem",
                      fontWeight: rowIndex === 0 ? 700 : 600,
                      color: colors.textMain,
                    }}
                  >
                    {app.name}
                    {app.isOwnProduct && (
                      <span
                        style={{
                          display: "inline-block",
                          marginLeft: "0.5rem",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                          color: colors.brandBlue,
                          verticalAlign: "middle",
                        }}
                      >
                        Our pick
                      </span>
                    )}
                  </th>
                  <td style={{ padding: "1rem 1.25rem", color: colors.textMuted }}>{app.sessionLength}</td>
                  <td style={{ padding: "1rem 1.25rem", color: colors.textMuted }}>{app.equipment}</td>
                  <td style={{ padding: "1rem 1.25rem", color: colors.textMuted }}>{app.focus}</td>
                  <td
                    style={{
                      padding: "1rem 1.25rem",
                      fontWeight: app.isOwnProduct ? 600 : 400,
                      color: app.isOwnProduct ? colors.textMain : colors.textMuted,
                    }}
                  >
                    {app.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageContainer>
    </section>
  );
}
