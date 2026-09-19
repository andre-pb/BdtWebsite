import { TermPage } from "@/components/terms/TermPage";
import { navySealBurpeePage } from "@/content/burpee-terms";
import { createPageMetadata } from "@/lib/seo";

const { path, seo } = navySealBurpeePage;

export const metadata = createPageMetadata({
  title: seo.title,
  description: seo.description,
  path,
  keywords: [...seo.keywords],
});

export default function NavySealBurpeePage() {
  return <TermPage data={navySealBurpeePage} />;
}
