import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DownloadSection } from "@/components/home/DownloadSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageContainer } from "@/components/ui/PageContainer";
import {
  buildFaqJsonLd,
  createPageMetadata,
  getBreadcrumbJsonLd,
  getWebPageJsonLd,
} from "@/lib/seo";
import { ComparisonPageData } from "@/content/comparisons";

type Props = { data: ComparisonPageData };

function ComparisonHero({ data: d }: Props) {
  return (
    <section
      style={{
        paddingTop: "200px",
        paddingBottom: "100px",
        background: "#0F172A",
        color: "white",
        textAlign: "center",
      }}
    >
      <PageContainer>
        <span
          style={{
            display: "inline-block",
            fontSize: "0.875rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "#60A5FA",
            marginBottom: "1rem",
          }}
        >
          {d.hero.eyebrow}
        </span>
        <h1
          style={{
            fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "1rem",
            maxWidth: "700px",
            margin: "0 auto 1.5rem",
          }}
        >
          {d.hero.title}
        </h1>
        <p
          style={{
            maxWidth: "640px",
            margin: "0 auto",
            color: "rgba(255,255,255,0.85)",
            fontSize: "1.125rem",
            lineHeight: 1.7,
          }}
        >
          {d.hero.intro}
        </p>
      </PageContainer>
    </section>
  );
}

function ComparisonTable({
  competitor,
}: {
  competitor: ComparisonPageData["competitor"];
}) {
  const rowStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    padding: "16px 0",
    borderBottom: "1px solid #E2E8F0",
  };
  const labelStyle: React.CSSProperties = {
    fontWeight: 600,
    color: "#475569",
    minWidth: "140px",
    fontSize: "0.95rem",
  };
  const valueStyle: React.CSSProperties = {
    textAlign: "right",
    color: "#0F172A",
    fontSize: "0.95rem",
  };

  const rows = [
    { label: "Typical session", bdt: "20 min, 4×/week", other: competitor.sessionLength },
    { label: "Equipment", bdt: "None — bodyweight", other: competitor.equipment },
    { label: "Focus", bdt: "Burpee programme, levels", other: competitor.focus },
    { label: "Price", bdt: "£9.99/mo or £99.99/yr", other: competitor.price },
    { label: "Best for", bdt: "Busy dads, no equipment", other: competitor.bestFor },
  ];

  return (
    <section style={{ padding: "80px 0", background: "#F8FAFC" }}>
      <PageContainer>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            marginBottom: "2rem",
            color: "#0F172A",
          }}
        >
          Side-by-side comparison
        </h2>
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "24px 32px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          }}
        >
          <div style={rowStyle}>
            <span style={labelStyle}></span>
            <div style={{ display: "flex", gap: "32px", textAlign: "right" }}>
              <span style={{ fontWeight: 700, color: "#0055FF", minWidth: "160px" }}>
                BDT
              </span>
              <span style={{ fontWeight: 700, color: "#0F172A", minWidth: "160px" }}>
                {competitor.name}
              </span>
            </div>
          </div>
          {rows.map((row) => (
            <div key={row.label} style={rowStyle}>
              <span style={labelStyle}>{row.label}</span>
              <div style={{ display: "flex", gap: "32px", textAlign: "right" }}>
                <span style={{ ...valueStyle, minWidth: "160px" }}>{row.bdt}</span>
                <span style={{ ...valueStyle, minWidth: "160px" }}>{row.other}</span>
              </div>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}

function ProsConsSection({
  competitor,
}: {
  competitor: ComparisonPageData["competitor"];
}) {
  return (
    <section style={{ padding: "80px 0", background: "white" }}>
      <PageContainer>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "40px",
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "#0055FF",
                marginBottom: "1rem",
              }}
            >
              ✅ Busy Dad Training
            </h3>
            <h4 style={{ fontWeight: 600, marginBottom: "0.75rem", color: "#059669" }}>Pros</h4>
            <ul style={{ paddingLeft: "1.25rem", lineHeight: 1.8, color: "#475569" }}>
              {competitor.pros.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
            <h4 style={{ fontWeight: 600, margin: "1rem 0 0.75rem", color: "#DC2626" }}>Cons</h4>
            <ul style={{ paddingLeft: "1.25rem", lineHeight: 1.8, color: "#475569" }}>
              {competitor.cons.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </div>
          <div>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "#0F172A",
                marginBottom: "1rem",
              }}
            >
              {competitor.name}
            </h3>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "1rem" }}>
              {competitor.summary}
            </p>
            <h4 style={{ fontWeight: 600, marginBottom: "0.75rem", color: "#059669" }}>Pros</h4>
            <ul style={{ paddingLeft: "1.25rem", lineHeight: 1.8, color: "#475569" }}>
              {competitor.pros.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
            <h4 style={{ fontWeight: 600, margin: "1rem 0 0.75rem", color: "#DC2626" }}>Cons</h4>
            <ul style={{ paddingLeft: "1.25rem", lineHeight: 1.8, color: "#475569" }}>
              {competitor.cons.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

function VerdictSection({ data: d }: Props) {
  return (
    <section style={{ padding: "80px 0", background: "#F8FAFC" }}>
      <PageContainer>
        <h2
          style={{
            fontSize: "1.75rem",
            fontWeight: 700,
            marginBottom: "2rem",
            color: "#0F172A",
          }}
        >
          Why choose Busy Dad Training?
        </h2>
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "32px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            marginBottom: "2rem",
          }}
        >
          <ul style={{ lineHeight: 1.8, color: "#475569", paddingLeft: "1.25rem" }}>
            {d.whyBdpWins.map((reason, i) => (
              <li key={i} style={{ marginBottom: "0.75rem" }}>
                {reason}
              </li>
            ))}
          </ul>
        </div>

        <h2
          style={{
            fontSize: "1.75rem",
            fontWeight: 700,
            marginBottom: "2rem",
            color: "#0F172A",
          }}
        >
          Where {d.competitor.name} wins
        </h2>
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "32px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            marginBottom: "2rem",
          }}
        >
          <ul style={{ lineHeight: 1.8, color: "#475569", paddingLeft: "1.25rem" }}>
            {d.whereCompetitorWins.map((reason, i) => (
              <li key={i} style={{ marginBottom: "0.75rem" }}>
                {reason}
              </li>
            ))}
          </ul>
        </div>

        <div
          style={{
            background: "#EFF6FF",
            borderRadius: "16px",
            padding: "32px",
            borderLeft: "4px solid #0055FF",
          }}
        >
          <h3
            style={{
              fontWeight: 700,
              fontSize: "1.25rem",
              marginBottom: "0.75rem",
              color: "#0055FF",
            }}
          >
            Verdict
          </h3>
          <p style={{ color: "#1E3A5F", lineHeight: 1.7, fontSize: "1.05rem" }}>
            {d.verdict}
          </p>
        </div>
      </PageContainer>
    </section>
  );
}

function FaqSection({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <section style={{ padding: "80px 0", background: "white" }}>
      <PageContainer>
        <h2
          style={{
            fontSize: "1.75rem",
            fontWeight: 700,
            marginBottom: "2rem",
            color: "#0F172A",
          }}
        >
          Frequently asked questions
        </h2>
        <div style={{ maxWidth: "700px" }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                padding: "20px 0",
                borderBottom: i < faqs.length - 1 ? "1px solid #E2E8F0" : "none",
              }}
            >
              <h3
                style={{
                  fontWeight: 600,
                  fontSize: "1.05rem",
                  marginBottom: "0.5rem",
                  color: "#0F172A",
                }}
              >
                {faq.question}
              </h3>
              <p style={{ color: "#475569", lineHeight: 1.7 }}>{faq.answer}</p>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}

export function ComparisonPage({ data }: Props) {
  const { path, seo, faqs, datePublished, dateModified } = data;

  return (
    <>
      <JsonLd
        data={[
          getWebPageJsonLd({ title: seo.title, description: seo.description, path }),
          getBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: seo.title, path },
          ]),
          buildFaqJsonLd(faqs),
        ]}
      />
      <Header />
      <main>
        <ComparisonHero data={data} />
        <ComparisonTable competitor={data.competitor} />
        <ProsConsSection competitor={data.competitor} />
        <VerdictSection data={data} />
        <FaqSection faqs={faqs} />
        <DownloadSection />
      </main>
      <Footer />
    </>
  );
}

export { createPageMetadata } from "@/lib/seo";