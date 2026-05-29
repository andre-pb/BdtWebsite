import { colors } from "@/constants/colors";
import { PullQuote, bodyStyle, headingStyle } from "@/components/ui/Typography";
import { PageContainer } from "@/components/ui/PageContainer";

type PrincipleBlock =
  | string
  | {
      emphasis: string;
    };

type PrincipleSectionProps = {
  id: string;
  title: string;
  blocks: readonly PrincipleBlock[];
  quote: string | null;
  variant: "light" | "dark";
};

function renderBlock(block: PrincipleBlock, index: number) {
  if (typeof block === "string") {
    return (
      <p key={`${index}-${block.slice(0, 32)}`} style={{ ...bodyStyle, marginBottom: "1.25rem" }}>
        {block}
      </p>
    );
  }

  return (
    <p
      key={`${index}-${block.emphasis.slice(0, 32)}`}
      style={{
        ...bodyStyle,
        marginBottom: "1rem",
        fontSize: "1.35rem",
        fontWeight: 600,
        color: colors.textMain,
        lineHeight: 1.4,
      }}
    >
      {block.emphasis}
    </p>
  );
}

export function PrincipleSection({ id, title, blocks, quote, variant }: PrincipleSectionProps) {
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
        {blocks.map((block, index) => renderBlock(block, index))}
        {quote && <PullQuote>{quote}</PullQuote>}
      </PageContainer>
    </section>
  );
}
