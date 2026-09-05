import { colors } from "@/constants/colors";
import { PageContainer } from "@/components/ui/PageContainer";

type Props = { children: string; label?: string };

/**
 * A short, self-contained direct answer placed right under a page's hero.
 * Search engines and AI assistants extract passages; this gives them one.
 */
export function QuickAnswer({ children, label = "Quick answer" }: Props) {
  return (
    <section aria-label={label} style={{ backgroundColor: colors.bgBlueLight, padding: "32px 0" }}>
      <PageContainer>
        <p style={{ margin: "0 0 0.35rem", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: colors.brandBlue }}>
          {label}
        </p>
        <p data-speakable style={{ margin: 0, color: colors.textMain, fontSize: "1.15rem", lineHeight: 1.6, fontWeight: 500, maxWidth: "860px" }}>
          {children}
        </p>
      </PageContainer>
    </section>
  );
}
