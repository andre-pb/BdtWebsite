import Image from "next/image";
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
  image: {
    src: string;
    alt: string;
  };
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

export function PrincipleSection({ id, title, image, blocks, quote, variant }: PrincipleSectionProps) {
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
      <PageContainer
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
          gap: "64px",
          alignItems: "center",
        }}
      >
        <div>
          <h2 id={`${id}-heading`} style={headingStyle}>
            {title}
          </h2>
          {blocks.map((block, index) => renderBlock(block, index))}
          {quote && <PullQuote>{quote}</PullQuote>}
        </div>

        <div
          style={{
            position: "relative",
            borderRadius: "28px",
            overflow: "hidden",
            border: `1px solid ${colors.borderLight}`,
            background: colors.bgOff,
          }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={1200}
            height={800}
            sizes="(max-width: 768px) calc(100vw - 40px), 560px"
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              aspectRatio: "3 / 2",
              objectFit: "cover",
            }}
          />
        </div>
      </PageContainer>
    </section>
  );
}
