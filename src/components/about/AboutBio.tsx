import Image from "next/image";
import { aboutPage } from "@/content/about";
import { colors } from "@/constants/colors";
import { bodyStyle, eyebrowStyle, headingStyle } from "@/components/ui/Typography";
import { PageContainer } from "@/components/ui/PageContainer";

export function AboutBio() {
  const { bio } = aboutPage;

  return (
    <section
      aria-labelledby="about-bio-heading"
      style={{ padding: "120px 0", backgroundColor: colors.bgOff }}
    >
      <PageContainer
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "80px",
          alignItems: "center",
        }}
      >
        <div>
          <Image
            src={bio.image}
            alt={bio.imageAlt}
            width={852}
            height={1280}
            style={{
              width: "100%",
              maxWidth: "420px",
              borderRadius: "24px",
              boxShadow: "0 20px 60px -20px rgba(0,0,0,0.15)",
              objectFit: "cover",
              aspectRatio: "4/5",
              display: "block",
              height: "auto",
            }}
          />
        </div>
        <div>
          <span style={eyebrowStyle}>Creator</span>
          <h2 id="about-bio-heading" style={headingStyle}>
            {bio.name}
          </h2>
          <p
            style={{
              ...bodyStyle,
              fontSize: "1rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: colors.textLight,
              marginBottom: "2rem",
            }}
          >
            {bio.subtitle}
          </p>
          {bio.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} style={{ ...bodyStyle, marginBottom: "1.25rem" }}>
              {paragraph}
            </p>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
