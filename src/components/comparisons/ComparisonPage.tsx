import Link from "next/link";
import { colors } from "@/constants/colors";
import { PageContainer } from "@/components/ui/PageContainer";
import { PullQuote } from "@/components/ui/Typography";
import { eyebrowStyle, headingStyle, bodyStyle } from "@/components/ui/Typography";
import type { ComparisonPageData } from "@/content/comparisons";

type Props = { data: ComparisonPageData };

function ComparisonHero({ data: d }: Props) {
  return (
    <section
      aria-labelledby="comparison-hero-heading"
      style={{
        paddingTop: "200px",
        paddingBottom: "100px",
        position: "relative",
        backgroundColor: colors.heroDark,
        backgroundImage: `linear-gradient(rgba(15,23,42,0.75), rgba(15,23,42,0.92))`,
        color: "white",
      }}
    >
      <PageContainer>
        <span style={{ ...eyebrowStyle, color: colors.accentLight }}>{d.hero.eyebrow}</span>
        <h1
          id="comparison-hero-heading"
          style={{
            fontSize: "clamp(2.5rem, 4vw, 3.75rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "white",
            marginBottom: "1.5rem",
          }}
        >
          {d.hero.title}
        </h1>
        <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "1.25rem", lineHeight: 1.7, maxWidth: "720px" }}>
          {d.hero.intro}
        </p>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", marginTop: "1.5rem", marginBottom: 0 }}>
          Updated {d.dateModified}
        </p>
      </PageContainer>
    </section>
  );
}

function ComparisonTable({ data: d }: Props) {
  const { competitor } = d;
  const columns = [
    { key: "sessionLength", label: "Typical session" },
    { key: "equipment", label: "Equipment" },
    { key: "focus", label: "Focus" },
    { key: "price", label: "Pricing" },
  ] as const;

  const rows = [
    { label: competitor.name, ...competitor, isOwnProduct: false },
  ];

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
              minWidth: "500px",
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
                <th scope="col" style={{ textAlign: "left", padding: "1rem 1.25rem", fontWeight: 700 }}>App</th>
                {columns.map((col) => (
                  <th key={col.key} scope="col" style={{ textAlign: "left", padding: "1rem 1.25rem", fontWeight: 600, whiteSpace: "nowrap" }}>
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Busy Dad Training row */}
              <tr style={{ borderTop: `1px solid ${colors.borderLight}`, backgroundColor: colors.bgBlueLight }}>
                <th scope="row" style={{ textAlign: "left", padding: "1rem 1.25rem", fontWeight: 700, color: colors.textMain }}>
                  Busy Dad Training
                  <span style={{ display: "inline-block", marginLeft: "0.5rem", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: colors.brandBlue, verticalAlign: "middle" }}>
                    Our pick
                  </span>
                </th>
                <td style={{ padding: "1rem 1.25rem", color: colors.textMuted }}>20 min, 4×/week</td>
                <td style={{ padding: "1rem 1.25rem", color: colors.textMuted }}>None — bodyweight</td>
                <td style={{ padding: "1rem 1.25rem", color: colors.textMuted }}>Burpee programme, levels</td>
                <td style={{ padding: "1rem 1.25rem", fontWeight: 600, color: colors.textMain }}>£9.99/mo or £99.99/yr</td>
              </tr>
              {/* Competitor row */}
              <tr style={{ borderTop: `1px solid ${colors.borderLight}` }}>
                <th scope="row" style={{ textAlign: "left", padding: "1rem 1.25rem", fontWeight: 600, color: colors.textMain }}>
                  {competitor.name}
                </th>
                <td style={{ padding: "1rem 1.25rem", color: colors.textMuted }}>{competitor.sessionLength}</td>
                <td style={{ padding: "1rem 1.25rem", color: colors.textMuted }}>{competitor.equipment}</td>
                <td style={{ padding: "1rem 1.25rem", color: colors.textMuted }}>{competitor.focus}</td>
                <td style={{ padding: "1rem 1.25rem", color: colors.textMuted }}>{competitor.price}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </PageContainer>
    </section>
  );
}

function ProsConsSection({ data: d }: Props) {
  const { competitor } = d;

  return (
    <section aria-labelledby="comparison-pros-cons-heading" style={{ padding: "100px 0", backgroundColor: colors.bgPure }}>
      <PageContainer>
        <h2 id="comparison-pros-cons-heading" style={headingStyle}>
          How they compare
        </h2>

        {/* BDT */}
        <div style={{ marginBottom: "3rem" }}>
          <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: colors.textMain, marginBottom: "0.75rem" }}>
            Busy Dad Training — best for busy dads who want zero-friction bodyweight training
          </h3>
          <p style={bodyStyle}>{d.competitor.summary}</p>
          <p style={{ ...bodyStyle, fontSize: "0.95rem", marginBottom: "0.5rem" }}>
            <strong style={{ color: colors.textMain }}>Best for:</strong> {d.competitor.bestFor}
          </p>
          <p style={{ ...bodyStyle, marginBottom: "1.5rem" }}>
            <a href="https://busydadtraining.com/" target="_blank" rel="noopener noreferrer" style={{ color: colors.brandBlue, fontWeight: 600 }}>
              busydadtraining.com
            </a>
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            <div>
              <h4 style={{ fontSize: "1.125rem", fontWeight: 700, color: colors.textMain, marginBottom: "0.75rem" }}>Pros</h4>
              <ul style={{ margin: 0, paddingLeft: "1.25rem", color: colors.textMuted, lineHeight: 1.7 }}>
                <li style={{ marginBottom: "0.5rem" }}>Fixed 20-minute sessions with no decision fatigue.</li>
                <li style={{ marginBottom: "0.5rem" }}>No equipment — train anywhere.</li>
                <li style={{ marginBottom: "0.5rem" }}>Clear level progression with objective benchmarks.</li>
                <li style={{ marginBottom: "0.5rem" }}>£9.99/mo or £99.99/yr (~£8.33/month billed annually).</li>
                <li style={{ marginBottom: "0.5rem" }}>Full app: timer, level tracking, community.</li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: "1.125rem", fontWeight: 700, color: colors.textMain, marginBottom: "0.75rem" }}>Cons</h4>
              <ul style={{ margin: 0, paddingLeft: "1.25rem", color: colors.textMuted, lineHeight: 1.7 }}>
                <li style={{ marginBottom: "0.5rem" }}>Narrow exercise menu — two movements only.</li>
                <li style={{ marginBottom: "0.5rem" }}>Not for those who want exercise variety or barbell work.</li>
                <li style={{ marginBottom: "0.5rem" }}>Upper levels are demanding; Graduation is a long-term goal.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Competitor */}
        <div>
          <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: colors.textMain, marginBottom: "0.75rem" }}>
            {competitor.name} — {competitor.bestFor}
          </h3>
          <p style={bodyStyle}>{competitor.summary}</p>
          <p style={{ ...bodyStyle, marginBottom: "1.5rem" }}>
            <a href={competitor.websiteUrl} target="_blank" rel="noopener noreferrer" style={{ color: colors.brandBlue, fontWeight: 600 }}>
              {new URL(competitor.websiteUrl).hostname.replace(/^www\./, "")}
            </a>
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            <div>
              <h4 style={{ fontSize: "1.125rem", fontWeight: 700, color: colors.textMain, marginBottom: "0.75rem" }}>Pros</h4>
              <ul style={{ margin: 0, paddingLeft: "1.25rem", color: colors.textMuted, lineHeight: 1.7 }}>
                {competitor.pros.map((pro, i) => (
                  <li key={i} style={{ marginBottom: "0.5rem" }}>{pro}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: "1.125rem", fontWeight: 700, color: colors.textMain, marginBottom: "0.75rem" }}>Cons</h4>
              <ul style={{ margin: 0, paddingLeft: "1.25rem", color: colors.textMuted, lineHeight: 1.7 }}>
                {competitor.cons.map((con, i) => (
                  <li key={i} style={{ marginBottom: "0.5rem" }}>{con}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

function VerdictSection({ data: d }: Props) {
  return (
    <section aria-labelledby="comparison-verdict-heading" style={{ padding: "100px 0", backgroundColor: colors.bgOff }}>
      <PageContainer>
        <h2 id="comparison-verdict-heading" style={headingStyle}>
          The verdict
        </h2>

        <PullQuote>{d.verdict}</PullQuote>

        <h3 style={{ ...headingStyle, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", marginTop: "3rem" }}>
          Why choose Busy Dad Training?
        </h3>
        <ul style={{ margin: 0, paddingLeft: "1.25rem", color: colors.textMuted, lineHeight: 1.7, fontSize: "1.125rem" }}>
          {d.whyBdpWins.map((reason, i) => (
            <li key={i} style={{ marginBottom: "0.75rem" }}>{reason}</li>
          ))}
        </ul>

        <h3 style={{ ...headingStyle, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", marginTop: "3rem" }}>
          Where {d.competitor.name} wins
        </h3>
        <ul style={{ margin: 0, paddingLeft: "1.25rem", color: colors.textMuted, lineHeight: 1.7, fontSize: "1.125rem" }}>
          {d.whereCompetitorWins.map((reason, i) => (
            <li key={i} style={{ marginBottom: "0.75rem" }}>{reason}</li>
          ))}
        </ul>

        <h3 style={{ ...headingStyle, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", marginTop: "3rem" }}>
          Key difference
        </h3>
        <p style={bodyStyle}>
          {d.competitor.name} and Busy Dad Training serve different training philosophies.
        </p>

        <nav aria-label="Related Busy Dad Training pages" style={{ marginTop: "2rem" }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <li>
              <Link href="/principles/" style={{ display: "inline-block", padding: "0.6rem 1.25rem", borderRadius: "999px", backgroundColor: colors.bgPure, border: `1px solid ${colors.borderBlue}`, color: colors.brandBlue, fontWeight: 600, fontSize: "0.95rem", textDecoration: "none" }}>
                Training principles
              </Link>
            </li>
            <li>
              <Link href="/movements/" style={{ display: "inline-block", padding: "0.6rem 1.25rem", borderRadius: "999px", backgroundColor: colors.bgPure, border: `1px solid ${colors.borderBlue}`, color: colors.brandBlue, fontWeight: 600, fontSize: "0.95rem", textDecoration: "none" }}>
                The two Sacred Movements
              </Link>
            </li>
            <li>
              <Link href="/levels/" style={{ display: "inline-block", padding: "0.6rem 1.25rem", borderRadius: "999px", backgroundColor: colors.bgPure, border: `1px solid ${colors.borderBlue}`, color: colors.brandBlue, fontWeight: 600, fontSize: "0.95rem", textDecoration: "none" }}>
                Level system & benchmarks
              </Link>
            </li>
            <li>
              <Link href="/community/" style={{ display: "inline-block", padding: "0.6rem 1.25rem", borderRadius: "999px", backgroundColor: colors.bgPure, border: `1px solid ${colors.borderBlue}`, color: colors.brandBlue, fontWeight: 600, fontSize: "0.95rem", textDecoration: "none" }}>
                Community stories
              </Link>
            </li>
          </ul>
        </nav>
      </PageContainer>
    </section>
  );
}

function ComparisonFaqSection({ faqs }: { faqs: ComparisonPageData["faqs"] }) {
  return (
    <section aria-labelledby="comparison-faq-heading" style={{ padding: "100px 0", backgroundColor: colors.bgPure }}>
      <PageContainer>
        <h2 id="comparison-faq-heading" style={{ ...headingStyle, marginBottom: "2rem" }}>
          Frequently asked questions
        </h2>
        <dl style={{ margin: 0 }}>
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              style={{
                marginBottom: index < faqs.length - 1 ? "2rem" : 0,
                paddingBottom: index < faqs.length - 1 ? "2rem" : 0,
                borderBottom: index < faqs.length - 1 ? `1px solid ${colors.borderLight}` : undefined,
              }}
            >
              <dt style={{ fontSize: "1.15rem", fontWeight: 700, color: colors.textMain, marginBottom: "0.75rem", lineHeight: 1.4 }}>
                {faq.question}
              </dt>
              <dd style={{ margin: 0, color: colors.textMuted, fontSize: "1.0625rem", lineHeight: 1.7 }}>
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </PageContainer>
    </section>
  );
}

export function ComparisonPage({ data }: Props) {
  const { path, seo, faqs, datePublished, dateModified } = data;

  return (
    <>
      {/* JSON-LD handled by each page */}
      <div data-comparison-page>
        <ComparisonHero data={data} />
        <ComparisonTable data={data} />
        <ProsConsSection data={data} />
        <VerdictSection data={data} />
        <ComparisonFaqSection faqs={faqs} />
      </div>
    </>
  );
}