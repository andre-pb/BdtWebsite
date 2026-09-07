import { colors } from "@/constants/colors";
import { PageContainer } from "@/components/ui/PageContainer";
import { headingStyle } from "@/components/ui/Typography";

type FaqEntry = {
  question: string;
  answer: string;
};

type FaqSectionProps = {
  title?: string;
  faqs: readonly FaqEntry[];
  /** "dark" for pages laid out on the hero-dark background (e.g. /community/). */
  variant?: "light" | "dark";
  /** Override when a page already has an element with the default id. */
  headingId?: string;
};

export function FaqSection({
  title = "Frequently asked questions",
  faqs,
  variant = "light",
  headingId = "guide-faq-heading",
}: FaqSectionProps) {
  const dark = variant === "dark";
  const questionColor = dark ? "white" : colors.textMain;
  const answerColor = dark ? "rgba(255,255,255,0.72)" : colors.textMuted;
  const divider = dark ? "rgba(255,255,255,0.08)" : colors.borderLight;

  return (
    <section
      aria-labelledby={headingId}
      style={{
        padding: "100px 0",
        backgroundColor: dark ? colors.heroDark : colors.bgPure,
        borderTop: dark ? `1px solid ${divider}` : undefined,
      }}
    >
      <PageContainer>
        <h2 id={headingId} style={{ ...headingStyle, marginBottom: "2rem", color: questionColor }}>
          {title}
        </h2>
        <dl style={{ margin: 0 }}>
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              style={{
                marginBottom: index < faqs.length - 1 ? "2rem" : 0,
                paddingBottom: index < faqs.length - 1 ? "2rem" : 0,
                borderBottom: index < faqs.length - 1 ? `1px solid ${divider}` : undefined,
              }}
            >
              <dt
                style={{
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  color: questionColor,
                  marginBottom: "0.75rem",
                  lineHeight: 1.4,
                }}
              >
                {faq.question}
              </dt>
              <dd
                style={{
                  margin: 0,
                  color: answerColor,
                  fontSize: "1.0625rem",
                  lineHeight: 1.7,
                }}
              >
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </PageContainer>
    </section>
  );
}
