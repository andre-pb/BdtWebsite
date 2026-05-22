import { Inter } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
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
      </body>
    </html>
  );
}
