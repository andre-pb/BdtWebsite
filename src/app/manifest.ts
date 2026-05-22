import type { MetadataRoute } from "next";
import { seo, site } from "@/content/site";
import { assetPath } from "@/lib/base-path";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: seo.description,
    start_url: assetPath("/"),
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#0055FF",
    icons: [
      {
        src: site.favicon.png192,
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: site.favicon.png512,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
