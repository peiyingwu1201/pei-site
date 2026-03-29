import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Pei — 設計 × 開發 × 學習",
    template: "%s | Pei",
  },
  description: "Pei 的個人網站，分享設計、開發與學習的知識與作品。",
  metadataBase: new URL("https://pei-site.pages.dev"),
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: "https://pei-site.pages.dev",
    siteName: "Pei",
    title: "Pei — 設計 × 開發 × 學習",
    description: "Pei 的個人網站，分享設計、開發與學習的知識與作品。",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pei — 設計 × 開發 × 學習",
    description: "Pei 的個人網站，分享設計、開發與學習的知識與作品。",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-full flex flex-col antialiased bg-white text-gray-900">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
