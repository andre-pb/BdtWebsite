import { TermPage } from "@/components/terms/TermPage";
import { sixCountBurpeePage } from "@/content/burpee-terms";
import { createPageMetadata } from "@/lib/seo";

const { path, seo } = sixCountBurpeePage;

export const metadata = createPageMetadata({
  title: seo.title,
  description: seo.description,
  path,
  keywords: [...seo.keywords],
});

export default function SixCountBurpeePage() {
  return <TermPage data={sixCountBurpeePage} />;
}
