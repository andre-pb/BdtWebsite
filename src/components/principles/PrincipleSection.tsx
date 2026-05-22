import { colors } from "@/constants/colors";
import { PullQuote, bodyStyle, headingStyle } from "@/components/ui/Typography";
import { PageContainer } from "@/components/ui/PageContainer";

type PrincipleSectionProps = {
  id: string;
  title: string;
  paragraphs: readonly string[];
  quote: string | null;
  variant: "light" | "dark";
};

export function PrincipleSection({ id, title, paragraphs, quote, variant }: PrincipleSectionProps) {
  const isLight = variant === "light";

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      style={{
        padding: "120px 0",
        backgroundColor: isLight ? colors.bgPure : colors.bgOff,
      }}
    >
      <PageContainer>
        <h2 id={`${id}-heading`} style={headingStyle}>
          {title}
        </h2>
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} style={{ ...bodyStyle, marginBottom: "1.25rem" }}>
            {paragraph}
          </p>
        ))}
        {quote && <PullQuote>{quote}</PullQuote>}
      </PageContainer>
    </section>
  );
}
