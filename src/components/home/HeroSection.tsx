import { hero } from "@/content/site";
import { colors } from "@/constants/colors";
import { AppStoreBadge, GooglePlayBadge } from "@/components/ui/AppStoreBadges";
import { PageContainer } from "@/components/ui/PageContainer";
import { FeaturedInBar } from "@/components/home/FeaturedInBar";

export function HeroSection() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      style={{
        paddingTop: "200px",
        paddingBottom: "160px",
        position: "relative",
        backgroundColor: colors.heroDark,
        backgroundImage: `linear-gradient(rgba(15,23,42,0.7), rgba(15,23,42,0.9)), url('${hero.backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        textAlign: "center",
        color: "white",
      }}
    >
      <PageContainer>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h1
            id="hero-heading"
            style={{
              fontSize: "clamp(3rem, 5vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "white",
              marginBottom: "1.5rem",
            }}
          >
            {hero.headline}{" "}
            <span
              style={{
                color: "white",
                backgroundImage: `linear-gradient(${colors.brandBlue}, ${colors.brandBlue})`,
                backgroundSize: "100% 8px",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left bottom 0.1em",
              }}
            >
              {hero.headlineAccent}
            </span>
          </h1>
        </div>
        <p
          style={{
            maxWidth: "560px",
            margin: "0 auto 1.5rem",
            color: "rgba(255,255,255,0.9)",
            fontSize: "1.25rem",
          }}
        >
          {hero.description}
        </p>
        <div className="hero-store-badges">
          <AppStoreBadge />
          <GooglePlayBadge />
        </div>
        <FeaturedInBar />
      </PageContainer>
    </section>
  );
}
