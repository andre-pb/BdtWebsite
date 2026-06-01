import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageContainer } from "@/components/ui/PageContainer";
import { AppStoreBadge, GooglePlayBadge } from "@/components/ui/AppStoreBadges";
import { colors } from "@/constants/colors";
import { eyebrowStyle, headingStyle, bodyStyle } from "@/components/ui/Typography";

export const metadata = {
  title: "Email Verified",
  robots: { index: false, follow: false },
};

export default function EmailVerifySuccess() {
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
              background: colors.bgBlueLight,
              marginBottom: "1.5rem",
            }}
          >
            <svg
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.brandBlue}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>

          <span style={eyebrowStyle}>Email Verified</span>
          <h1 style={{ ...headingStyle, maxWidth: "640px" }}>
            You&rsquo;re verified. Welcome to the Busy Dad Army.
          </h1>
          <p style={{ ...bodyStyle, maxWidth: "520px" }}>
            Your email has been confirmed. Head back to the Busy Dad Training
            app and log in to finish setting up your account and start the work.
          </p>

          <p
            style={{
              color: colors.textLight,
              fontSize: "0.875rem",
              marginBottom: "1.25rem",
            }}
          >
            Don&rsquo;t have the app yet?
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              justifyContent: "center",
            }}
          >
            <AppStoreBadge />
            <GooglePlayBadge />
          </div>
        </PageContainer>
      </main>
      <Footer />
    </>
  );
}
