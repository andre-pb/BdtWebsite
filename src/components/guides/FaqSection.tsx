import type { GuideFaq } from "@/content/best-home-workout-apps";
import { colors } from "@/constants/colors";
import { PageContainer } from "@/components/ui/PageContainer";
import { headingStyle } from "@/components/ui/Typography";

type FaqSectionProps = {
  title?: string;
  faqs: readonly GuideFaq[];
};

export function FaqSection({ title = "Frequently asked questions", faqs }: FaqSectionProps) {
  return (
    <section aria-labelledby="guide-faq-heading" style={{ padding: "100px 0", backgroundColor: colors.bgPure }}>
      <PageContainer>
        <h2 id="guide-faq-heading" style={{ ...headingStyle, marginBottom: "2rem" }}>
          {title}
        </h2>
        <dl style={{ margin: 0 }}>
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              style={{
                marginBottom: index < faqs.length - 1 ? "2rem" : 0,
                paddingBottom: index < faqs.length - 1 ? "2rem" : 0,
                borderBottom:
                  index < faqs.length - 1 ? `1px solid ${colors.borderLight}` : undefined,
              }}
            >
              <dt
                style={{
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  color: colors.textMain,
                  marginBottom: "0.75rem",
                  lineHeight: 1.4,
                }}
              >
                {faq.question}
              </dt>
              <dd
                style={{
                  margin: 0,
                  color: colors.textMuted,
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
