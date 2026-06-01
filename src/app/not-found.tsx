import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageContainer } from "@/components/ui/PageContainer";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { colors } from "@/constants/colors";
import { eyebrowStyle, headingStyle, bodyStyle } from "@/components/ui/Typography";

export const metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

const quickLinks = [
  { label: "Movements", href: "/movements/" },
  { label: "Levels", href: "/levels/" },
  { label: "Principles", href: "/principles/" },
  { label: "About Max", href: "/about/" },
];

export default function NotFound() {
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
          <span style={eyebrowStyle}>Error 404</span>
          <h1 style={{ ...headingStyle, maxWidth: "640px" }}>
            This page took a rest day.
          </h1>
          <p style={{ ...bodyStyle, maxWidth: "520px" }}>
            We couldn&rsquo;t find the page you were looking for. It may have
            moved, or the link might be out of date. Let&rsquo;s get you back to
            the work.
          </p>

          <div style={{ marginTop: "0.5rem" }}>
            <PrimaryButton href="/">Back to home</PrimaryButton>
          </div>

          <nav
            aria-label="Popular pages"
            style={{
              marginTop: "2.5rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem 1.5rem",
              justifyContent: "center",
            }}
          >
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  color: colors.brandBlue,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </PageContainer>
      </main>
      <Footer />
    </>
  );
}
