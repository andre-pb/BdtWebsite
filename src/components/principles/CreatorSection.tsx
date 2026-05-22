import Image from "next/image";
import { principlesPage } from "@/content/principles";
import { colors } from "@/constants/colors";
import { PullQuote, bodyStyle, eyebrowStyle, headingStyle } from "@/components/ui/Typography";
import { PageContainer } from "@/components/ui/PageContainer";

export function CreatorSection() {
  const { creator } = principlesPage;

  return (
    <section
      aria-labelledby="creator-heading"
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
            src={creator.image}
            alt={creator.imageAlt}
            width={1080}
            height={1430}
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
          <span style={eyebrowStyle}>{creator.eyebrow}</span>
          <h2 id="creator-heading" style={headingStyle}>
            {creator.name}
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
            {creator.subtitle}
          </p>
          <PullQuote>{creator.quote}</PullQuote>
        </div>
      </PageContainer>
    </section>
  );
}
