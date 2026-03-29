import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "關於我",
  description: "關於 Pei — 分享設計、開發與學習的個人網站。",
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Pei",
    url: "https://pei-site.pages.dev",
    sameAs: ["https://github.com/peiyingwu1201"],
    knowsAbout: ["前端開發", "UI/UX 設計", "Next.js", "Cloudflare", "SEO"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-8">關於我</h1>

        <div className="space-y-6 text-gray-600 leading-relaxed">
          <p>
            嗨，我是 <strong className="text-gray-900">Pei</strong>。
          </p>
          <p>
            這個網站是我分享知識內容與作品的地方，涵蓋前端開發、設計思維與學習觀點。
          </p>
          <p>
            我重視內容的可被發現性，包含 SEO、AEO 與 GEO 的整合優化，
            希望每一篇內容都能有效地觸及需要它的人。
          </p>
        </div>

        <div className="mt-12 flex gap-4">
          <a
            href="https://github.com/peiyingwu1201"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm border border-gray-200 text-gray-600 px-4 py-2 rounded-lg hover:border-indigo-300 hover:text-indigo-500 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </>
  );
}
