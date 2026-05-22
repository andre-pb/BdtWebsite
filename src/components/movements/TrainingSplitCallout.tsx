import { movementsPage } from "@/content/movements";
import { colors } from "@/constants/colors";
import { PullQuote } from "@/components/ui/Typography";
import { PageContainer } from "@/components/ui/PageContainer";

export function TrainingSplitCallout() {
  return (
    <section
      aria-label="Weekly training split"
      style={{
        padding: "80px 0",
        background: colors.heroDark,
        textAlign: "center",
      }}
    >
      <PageContainer>
        <PullQuote light>{movementsPage.trainingSplit.text}</PullQuote>
      </PageContainer>
    </section>
  );
}
