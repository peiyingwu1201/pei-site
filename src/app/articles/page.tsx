import type { Metadata } from "next";
import Link from "next/link";
import { getArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "文章",
  description: "Pei 分享的技術文章與設計思考，涵蓋前端開發、AI 工具與工作流程。",
};

export const revalidate = 3600;

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">文章</h1>
      <p className="text-gray-500 mb-12">分享技術、設計與工具的思考與實作</p>

      {articles.length === 0 ? (
        <p className="text-gray-400">文章即將上線，敬請期待。</p>
      ) : (
        <ul className="space-y-8">
          {articles.map((article) => (
            <li key={article.id}>
              <Link href={`/articles/${article.slug}`} className="group block">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                  {article.publishedDate && (
                    <time>{new Date(article.publishedDate).toLocaleDateString("zh-TW")}</time>
                  )}
                  {article.category && (
                    <>
                      <span>·</span>
                      <span>{article.category}</span>
                    </>
                  )}
                  {article.readingTime > 0 && (
                    <>
                      <span>·</span>
                      <span>{article.readingTime} 分鐘閱讀</span>
                    </>
                  )}
                </div>
                <h2 className="text-xl font-semibold group-hover:text-indigo-500 transition-colors mb-1">
                  {article.title}
                </h2>
                {article.summary && (
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                    {article.summary}
                  </p>
                )}
                {article.tags.length > 0 && (
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {article.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
