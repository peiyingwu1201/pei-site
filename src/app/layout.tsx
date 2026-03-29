import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "The Curated Atelier — Pei",
    template: "%s | The Curated Atelier",
  },
  description: "A sanctuary for thoughts, sketches, and professional growth. Pei 的個人知識空間，分享設計、開發與學習。",
  metadataBase: new URL("https://pei-site.pages.dev"),
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: "https://pei-site.pages.dev",
    siteName: "The Curated Atelier",
    title: "The Curated Atelier — Pei",
    description: "A sanctuary for thoughts, sketches, and professional growth.",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Curated Atelier — Pei",
    description: "A sanctuary for thoughts, sketches, and professional growth.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <body className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
