import { GuidePage } from "@/components/guides/GuidePage";
import { bestBurpeeAppsPage } from "@/content/best-burpee-apps";
import { createPageMetadata } from "@/lib/seo";

const { path, seo } = bestBurpeeAppsPage;

export const metadata = createPageMetadata({
  title: seo.title,
  description: seo.description,
  path,
  keywords: [...seo.keywords],
});

export default function BestBurpeeAppsPage() {
  return <GuidePage guide={bestBurpeeAppsPage} />;
}
