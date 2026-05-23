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
    <html lang="en-GB">
      <body className={inter.variable}>
        <JsonLd data={getSiteJsonLd()} />
        {children}
        <GoogleAnalytics gaId={analytics.googleAnalyticsId} />
      </body>
    </html>
  );
}
