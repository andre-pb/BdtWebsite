import { GuidePage } from "@/components/guides/GuidePage";
import { bestBodyweightAppsPage } from "@/content/best-bodyweight-apps";
import { createPageMetadata } from "@/lib/seo";

const { path, seo } = bestBodyweightAppsPage;

export const metadata = createPageMetadata({
  title: seo.title,
  description: seo.description,
  path,
  keywords: [...seo.keywords],
});

export default function BestBodyweightAppsPage() {
  return <GuidePage guide={bestBodyweightAppsPage} />;
}
