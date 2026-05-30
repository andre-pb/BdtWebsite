import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { communityPage } from "@/content/community";
import { colors } from "@/constants/colors";
import { PageContainer } from "@/components/ui/PageContainer";
import { CommunityLeaderboard } from "@/components/community/CommunityLeaderboard";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata, getBreadcrumbJsonLd, getWebPageJsonLd } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: communityPage.seo.title,
  description: communityPage.seo.description,
  path: "/community/",
});

export default function CommunityPage() {
  const { title, description } = communityPage.seo;

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
            paddingBottom: "120px",
            minHeight: "calc(100vh - 80px)",
            backgroundColor: colors.heroDark,
            color: "white",
          }}
        >
          <PageContainer style={{ textAlign: "center" }}>
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
              {communityPage.title}
            </h1>
            <p
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: "clamp(1.125rem, 2.4vw, 1.5rem)",
                fontWeight: 500,
                lineHeight: 1.5,
                letterSpacing: "-0.01em",
                marginBottom: "3rem",
              }}
            >
              {communityPage.message}
            </p>
            <CommunityLeaderboard />
          </PageContainer>
        </section>
      </main>
      <Footer />
    </>
  );
}
