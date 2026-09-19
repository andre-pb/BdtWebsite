import { GuidePage } from "@/components/guides/GuidePage";
import { bestHomeWorkoutAppsPage } from "@/content/best-home-workout-apps";
import { createPageMetadata } from "@/lib/seo";

const { path, seo } = bestHomeWorkoutAppsPage;

export const metadata = createPageMetadata({
  title: seo.title,
  description: seo.description,
  path,
  keywords: [...seo.keywords],
});

export default function BestHomeWorkoutAppsPage() {
  return <GuidePage guide={bestHomeWorkoutAppsPage} />;
}
