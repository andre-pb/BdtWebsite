import type { Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { analytics } from "@/content/site";
import { colors } from "@/constants/colors";
import { baseMetadata, getSiteJsonLd } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = baseMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: colors.bgPure },
    { media: "(prefers-color-scheme: dark)", color: colors.heroDark },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={inter.variable}>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .mobile-nav { display: none !important; pointer-events: none; }
              .mobile-nav.is-open { display: block !important; pointer-events: auto; }
              .header-burger { display: none; }
              @media (max-width: 900px) {
                .header-desktop-nav,
                .header-desktop-cta { display: none !important; }
                .header-burger { display: flex; }
              }
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <JsonLd data={getSiteJsonLd()} />
        {children}
        <GoogleAnalytics gaId={analytics.googleAnalyticsId} />
      </body>
    </html>
  );
}
