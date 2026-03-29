import Link from "next/link";
import { getFeaturedArticles } from "@/lib/articles";
import { getFeaturedPortfolio } from "@/lib/portfolio";
import { getFeaturedLearning } from "@/lib/learning";

export const revalidate = 3600;

export default async function HomePage() {
  const [articles, portfolio, learning] = await Promise.all([
    getFeaturedArticles(),
    getFeaturedPortfolio(),
    getFeaturedLearning(),
  ]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      {/* Hero */}
      <section className="mb-24">
        <p className="text-indigo-500 font-medium mb-3">Hi, 我是</p>
        <h1 className="text-5xl font-bold mb-4 leading-tight">Pei</h1>
        <p className="text-xl text-gray-500 leading-relaxed max-w-xl">
          分享設計、開發與學習的知識與作品。
          <br />
          專注於讓好內容被看見。
        </p>
        <div className="flex gap-3 mt-8">
          <Link href="/articles" className="bg-indigo-500 text-white text-sm px-5 py-2.5 rounded-lg hover:bg-indigo-600 transition-colors">
            閱讀文章
          </Link>
          <Link href="/portfolio" className="border border-gray-200 text-gray-600 text-sm px-5 py-2.5 rounded-lg hover:border-indigo-300 hover:text-indigo-500 transition-colors">
            查看作品
          </Link>
        </div>
      </section>

      {/* Featured Articles */}
      {articles.length > 0 && (
        <section className="mb-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">精選文章</h2>
            <Link href="/articles" className="text-sm text-indigo-500 hover:underline">全部文章 →</Link>
          </div>
          <ul className="space-y-6">
            {articles.slice(0, 3).map((article) => (
              <li key={article.id}>
                <Link href={`/articles/${article.slug}`} className="group block">
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                    {article.publishedDate && (
                      <time>{new Date(article.publishedDate).toLocaleDateString("zh-TW")}</time>
                    )}
                    {article.category && <><span>·</span><span>{article.category}</span></>}
                  </div>
                  <h3 className="font-semibold group-hover:text-indigo-500 transition-colors mb-1">
                    {article.title}
                  </h3>
                  {article.summary && (
                    <p className="text-sm text-gray-500 line-clamp-2">{article.summary}</p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Featured Portfolio */}
      {portfolio.length > 0 && (
        <section className="mb-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">精選作品</h2>
            <Link href="/portfolio" className="text-sm text-indigo-500 hover:underline">全部作品 →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {portfolio.slice(0, 4).map((item) => (
              <Link
                key={item.id}
                href={`/portfolio/${item.slug}`}
                className="group border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold group-hover:text-indigo-500 transition-colors mb-1">
                  {item.name}
                </h3>
                {item.description && (
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">{item.description}</p>
                )}
                {item.techStack.length > 0 && (
                  <div className="flex gap-1.5 flex-wrap">
                    {item.techStack.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Learning */}
      {learning.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">學習觀點</h2>
            <Link href="/learning" className="text-sm text-indigo-500 hover:underline">全部觀點 →</Link>
          </div>
          <ul className="space-y-4">
            {learning.slice(0, 3).map((post) => (
              <li key={post.id}>
                <Link href={`/learning/${post.slug}`} className="group flex items-center justify-between">
                  <div>
                    <h3 className="font-medium group-hover:text-indigo-500 transition-colors">
                      {post.title}
                    </h3>
                    {post.topic && <p className="text-sm text-gray-400">{post.topic}</p>}
                  </div>
                  <span className="text-gray-300 group-hover:text-indigo-400 transition-colors">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
