import { boostcampComparison } from "@/content/comparisons";
import { ComparisonPage, createPageMetadata } from "@/components/comparisons/ComparisonPage";

const data = boostcampComparison;

export const metadata = createPageMetadata({
  title: data.seo.title,
  description: data.seo.description,
  path: data.path,
  keywords: [...data.seo.keywords],
});

export default function BoostcampVsBdtPage() {
  return <ComparisonPage data={data} />;
}