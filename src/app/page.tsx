import Link from "next/link";
import { getFeaturedArticles } from "@/lib/articles";
import { getFeaturedPortfolio } from "@/lib/portfolio";


export default async function HomePage() {
  const [articles, portfolio] = await Promise.all([
    getFeaturedArticles(),
    getFeaturedPortfolio(),
  ]);

  return (
    <div className="max-w-5xl mx-auto px-8">

      {/* Hero */}
      <section className="py-24 max-w-2xl">
        <p className="text-xs font-label uppercase tracking-[0.15em] text-[#5c605a] mb-6">
          Personal Studio
        </p>
        <h1 className="font-headline text-[3.5rem] font-bold leading-[1.1] tracking-[-0.02em] text-[#2f342e] mb-6">
          Welcome to your<br />
          <em className="not-italic">Curated Atelier</em>
        </h1>
        <p className="font-body text-lg text-[#5c605a] leading-relaxed mb-10 max-w-lg">
          A sanctuary for thoughts, sketches, and professional growth.
          Let your creativity breathe in this digital craftspace.
        </p>
        <div className="flex gap-3">
          <Link
            href="/articles"
            className="font-body text-sm bg-gradient-to-b from-[#5f5e5e] to-[#535252] text-[#faf7f7] px-5 py-2.5 rounded-[0.375rem] hover:scale-[0.98] transition-transform"
          >
            Explore Notes
          </Link>
          <Link
            href="/portfolio"
            className="font-body text-sm bg-[#efe0d4] text-[#5a5047] px-5 py-2.5 rounded-[0.375rem] hover:scale-[0.98] transition-transform"
          >
            View Works
          </Link>
        </div>
      </section>

      {/* Recent Articles */}
      {articles.length > 0 && (
        <section className="pb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-headline text-[1.75rem] font-semibold text-[#2f342e]">
              Recent Entries
            </h2>
            <Link href="/articles" className="font-label text-sm text-[#5c605a] hover:text-[#2f342e] transition-colors">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.slice(0, 3).map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="group bg-[#ffffff] rounded-[0.25rem] p-8 hover:shadow-[0_0_32px_0_rgba(47,52,46,0.06)] transition-shadow"
              >
                {article.category && (
                  <span className="inline-block font-label text-xs uppercase tracking-[0.1em] text-[#5c605a] bg-[#e4f8f2] text-[#4d5f5b] px-3 py-1 rounded-full mb-4">
                    {article.category}
                  </span>
                )}
                <h3 className="font-headline text-[1.1rem] font-semibold text-[#2f342e] leading-snug mb-3 group-hover:text-[#5f5e5e] transition-colors">
                  {article.title}
                </h3>
                {article.summary && (
                  <p className="font-body text-sm text-[#5c605a] leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>
                )}
                {article.publishedDate && (
                  <p className="font-label text-xs text-[#787c75] mt-4">
                    {new Date(article.publishedDate).toLocaleDateString("zh-TW")}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Portfolio */}
      {portfolio.length > 0 && (
        <section className="pb-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-headline text-[1.75rem] font-semibold text-[#2f342e]">
              Selected Works
            </h2>
            <Link href="/portfolio" className="font-label text-sm text-[#5c605a] hover:text-[#2f342e] transition-colors">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {portfolio.slice(0, 4).map((item) => (
              <Link
                key={item.id}
                href={`/portfolio/${item.slug}`}
                className="group bg-[#ffffff] rounded-[0.25rem] p-8 hover:shadow-[0_0_32px_0_rgba(47,52,46,0.06)] transition-shadow"
              >
                <h3 className="font-headline text-[1.1rem] font-semibold text-[#2f342e] mb-2 group-hover:text-[#5f5e5e] transition-colors">
                  {item.name}
                </h3>
                {item.description && (
                  <p className="font-body text-sm text-[#5c605a] line-clamp-2 mb-4 leading-relaxed">
                    {item.description}
                  </p>
                )}
                {item.techStack.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {item.techStack.slice(0, 3).map((tech) => (
                      <span key={tech} className="font-label text-xs bg-[#e4f8f2] text-[#4d5f5b] px-3 py-1 rounded-full">
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

      {/* Empty state hero when no content */}
      {articles.length === 0 && portfolio.length === 0 && (
        <section className="pb-24">
          <div className="bg-[#f4f4ef] rounded-[0.25rem] p-12 text-center">
            <p className="font-body text-[#5c605a]">內容即將上線，敬請期待。</p>
          </div>
        </section>
      )}

    </div>
  );
}
