import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DownloadSection } from "@/components/home/DownloadSection";
import { LevelsHero } from "@/components/levels/LevelsHero";
import { LevelsIntro } from "@/components/levels/LevelsIntro";
import { LevelWithSublevelsSection } from "@/components/levels/LevelSection";
import { GraduationSection, LevelsFooterNote } from "@/components/levels/GraduationSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { levelsPage } from "@/content/levels";
import {
  createPageMetadata,
  getBreadcrumbJsonLd,
  getLevelsFaqJsonLd,
  getWebPageJsonLd,
} from "@/lib/seo";

export const metadata = createPageMetadata({
  title: levelsPage.seo.title,
  description: levelsPage.seo.description,
  path: "/levels/",
  keywords: [
    "busy dad program levels",
    "landmark workouts",
    "progressive bodyweight training",
    "6-count workout",
    "navy seal workout",
  ],
});

const tierLevels = [levelsPage.level1, levelsPage.level2, levelsPage.level3, levelsPage.level4] as const;

export default function LevelsPage() {
  const { title, description } = levelsPage.seo;

  return (
    <>
      <JsonLd
        data={[
          getWebPageJsonLd({ title, description, path: "/levels/" }),
          getBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Levels", path: "/levels/" },
          ]),
          getLevelsFaqJsonLd(),
        ]}
      />
      <Header />
      <main>
        <LevelsHero />
        <LevelsIntro />
        {tierLevels.map((level, index) => (
          <LevelWithSublevelsSection
            key={level.id}
            id={level.id}
            number={level.number}
            title={level.title}
            image={"image" in level ? level.image : undefined}
            intro={"intro" in level ? level.intro : undefined}
            sublevels={level.sublevels}
            outro={"outro" in level ? level.outro : undefined}
            highlight={"highlight" in level ? level.highlight : false}
            variant={index % 2 === 0 ? "light" : "dark"}
          />
        ))}
        <GraduationSection />
        <LevelsFooterNote />
        <DownloadSection />
      </main>
      <Footer />
    </>
  );
}
