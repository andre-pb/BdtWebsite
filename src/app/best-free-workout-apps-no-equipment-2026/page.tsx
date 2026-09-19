import { GuidePage } from "@/components/guides/GuidePage";
import { bestFreeNoEquipmentAppsPage } from "@/content/best-free-no-equipment-apps";
import { createPageMetadata } from "@/lib/seo";

const { path, seo } = bestFreeNoEquipmentAppsPage;

export const metadata = createPageMetadata({
  title: seo.title,
  description: seo.description,
  path,
  keywords: [...seo.keywords],
});

export default function BestFreeNoEquipmentAppsPage() {
  return <GuidePage guide={bestFreeNoEquipmentAppsPage} />;
}
