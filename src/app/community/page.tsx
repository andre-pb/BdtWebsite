import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { communityPage } from "@/content/community";
import { colors } from "@/constants/colors";
import { PageContainer } from "@/components/ui/PageContainer";
import { CommunityLeaderboard } from "@/components/community/CommunityLeaderboard";
import { CommunityStats } from "@/components/community/CommunityStats";
import { CommunityStories } from "@/components/community/CommunityStories";
import { CommunityCTA } from "@/components/community/CommunityCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata, getBreadcrumbJsonLd, getWebPageJsonLd } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: communityPage.seo.title,
  description: communityPage.seo.description,
  path: "/community/",
});

export default function CommunityPage() {
  const { title, description } = communityPage.seo;
  const { hero, leaderboard } = communityPage;

  return (
    <>
      <JsonLd
        data={[
          getWebPageJsonLd({ title, description, path: "/community/" }),
          getBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Community", path: "/community/" },
          ]),
        ]}
      />
      <Header />
      <main style={{ backgroundColor: colors.heroDark }}>
        <section
          aria-labelledby="community-heading"
          style={{
            paddingTop: "160px",
            paddingBottom: "0",
            backgroundColor: colors.heroDark,
            color: "white",
          }}
        >
          <PageContainer style={{ textAlign: "center" }}>
            <span
              style={{
                display: "inline-block",
                fontSize: "0.875rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: colors.accentLight,
                marginBottom: "1rem",
              }}
            >
              {hero.eyebrow}
            </span>
            <h1
              id="community-heading"
              style={{
                fontSize: "clamp(2.5rem, 4vw, 3.75rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "white",
                marginBottom: "1.25rem",
              }}
            >
              {hero.title}
            </h1>
            <p
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: "clamp(1.125rem, 2.4vw, 1.5rem)",
                fontWeight: 500,
                lineHeight: 1.5,
                letterSpacing: "-0.01em",
                marginBottom: "3rem",
                maxWidth: "640px",
                marginInline: "auto",
              }}
            >
              {hero.description}
            </p>
          </PageContainer>

          <CommunityStats />
        </section>

        <CommunityStories />

        <section
          id="leaderboard"
          aria-labelledby="community-leaderboard-heading"
          style={{
            padding: "120px 0",
            backgroundColor: colors.heroDark,
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <PageContainer style={{ textAlign: "center" }}>
            <span
              style={{
                display: "inline-block",
                fontSize: "0.875rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: colors.accentLight,
                marginBottom: "1rem",
              }}
            >
              {leaderboard.eyebrow}
            </span>
            <h2
              id="community-leaderboard-heading"
              style={{
                fontSize: "clamp(2rem, 3vw, 3rem)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "white",
                marginBottom: "1rem",
              }}
            >
              {leaderboard.title}
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "1.125rem",
                marginBottom: "3rem",
                maxWidth: "520px",
                marginInline: "auto",
                lineHeight: 1.5,
              }}
            >
              {leaderboard.description}
            </p>
            <CommunityLeaderboard />
          </PageContainer>
        </section>

        <CommunityCTA />
      </main>
      <Footer />
    </>
  );
}
