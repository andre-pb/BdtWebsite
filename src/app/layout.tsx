import { GoogleAnalytics } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { analytics } from "@/content/site";
import { baseMetadata, getSiteJsonLd } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = baseMetadata;

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
