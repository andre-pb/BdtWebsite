import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageContainer } from "@/components/ui/PageContainer";
import { colors } from "@/constants/colors";
import { eyebrowStyle, headingStyle, bodyStyle } from "@/components/ui/Typography";

export const metadata = {
  title: "Email Verification Failed",
  robots: { index: false, follow: false },
};

export default function EmailVerifyFailed() {
  return (
    <>
      <Header />
      <main>
        <PageContainer
          as="section"
          style={{
            minHeight: "60vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "120px var(--page-padding-x)",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "72px",
              height: "72px",
              borderRadius: "9999px",
              background: colors.bgOff,
              border: `1px solid ${colors.borderLight}`,
              marginBottom: "1.5rem",
            }}
          >
            <svg
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.textMuted}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </span>

          <span style={eyebrowStyle}>Verification Failed</span>
          <h1 style={{ ...headingStyle, maxWidth: "640px" }}>
            We couldn&rsquo;t verify your email.
          </h1>
          <p style={{ ...bodyStyle, maxWidth: "520px" }}>
            That link may have expired or already been used. Open the Busy Dad
            Training app, request a new verification email, and try again.
          </p>

          <p
            style={{
              color: colors.textLight,
              fontSize: "0.875rem",
            }}
          >
            Still stuck? Email us at{" "}
            <a
              href="mailto:app@busydadtraining.com"
              style={{ color: colors.brandBlue, fontWeight: 600, textDecoration: "none" }}
            >
              app@busydadtraining.com
            </a>
          </p>
        </PageContainer>
      </main>
      <Footer />
    </>
  );
}
