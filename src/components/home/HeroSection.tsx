import { preload } from "react-dom";
import { hero } from "@/content/site";
import { colors } from "@/constants/colors";
import { AppStoreBadge, GooglePlayBadge } from "@/components/ui/AppStoreBadges";
import { StoreRatings } from "@/components/ui/StoreRatings";
import { PageContainer } from "@/components/ui/PageContainer";
import { FeaturedInBar } from "@/components/home/FeaturedInBar";
import { ChallengeBanner } from "@/components/home/ChallengeBanner";

// Responsive hero photo. next/image can't build a srcset for a static export
// with unoptimized images, so this is a plain <img> with pre-generated widths
// (public/photos/burpee-photo-1-*.webp, q60: the photo sits under a 70-90%
// dark overlay, so the lower quality is invisible). A phone now downloads
// 19-32 KB instead of the 88 KB 1600px master.
const HERO_WIDTHS = [640, 960, 1280, 1600] as const;
const heroSrcSet = HERO_WIDTHS.map(
  (w) => `${hero.backgroundImage.replace(/\.webp$/, "")}-${w}.webp ${w}w`,
).join(", ");
const heroSizes = "100vw";

export function HeroSection() {
  // Hoisted into <head> as <link rel="preload" as="image" imagesrcset ...>
  // so the browser starts the hero photo before it has parsed this far.
  preload(hero.backgroundImage, {
    as: "image",
    imageSrcSet: heroSrcSet,
    imageSizes: heroSizes,
    fetchPriority: "high",
  });

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      style={{
        paddingTop: "200px",
        paddingBottom: "160px",
        position: "relative",
        backgroundColor: colors.heroDark,
        textAlign: "center",
        color: "white",
        overflow: "hidden",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={hero.backgroundImage}
        srcSet={heroSrcSet}
        sizes={heroSizes}
        alt={hero.backgroundImageAlt}
        width={1600}
        height={1067}
        fetchPriority="high"
        decoding="async"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(rgba(15,23,42,0.7), rgba(15,23,42,0.9))",
          zIndex: 1,
        }}
      />
      <PageContainer style={{ position: "relative", zIndex: 2 }}>
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
        <p
          style={{
            maxWidth: "520px",
            margin: "0 auto 2rem",
            color: "rgba(255,255,255,0.55)",
            fontSize: "0.9rem",
            lineHeight: 1.5,
          }}
        >
          {hero.useCaseLine}
        </p>
        {/* Live challenge callout, right above the store buttons people use
            to join. Renders only while a promotion is open for joining
            (driven by the API), so the hero is unchanged the rest of the
            year. */}
        <ChallengeBanner variant="hero" />
        <div className="hero-store-badges">
          <AppStoreBadge />
          <GooglePlayBadge />
        </div>
        <StoreRatings />
        <FeaturedInBar />
      </PageContainer>
    </section>
  );
}
