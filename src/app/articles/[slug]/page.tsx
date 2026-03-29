import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticles, getArticleBySlug } from "@/lib/articles";

export const revalidate = 3600;

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.seoTitle || article.title,
    description: article.summary,
    openGraph: {
      title: article.seoTitle || article.title,
      description: article.summary,
      type: "article",
      publishedTime: article.publishedDate ?? undefined,
      ...(article.coverImage && { images: [article.coverImage] }),
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    datePublished: article.publishedDate,
    author: { "@type": "Person", name: "Pei" },
    ...(article.faqQuestion && {
      mainEntity: {
        "@type": "Question",
        name: article.faqQuestion,
        acceptedAnswer: {
          "@type": "Answer",
          text: article.summary,
        },
      },
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-2xl mx-auto px-6 py-16">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
          {article.publishedDate && (
            <time>{new Date(article.publishedDate).toLocaleDateString("zh-TW")}</time>
          )}
          {article.category && <><span>·</span><span>{article.category}</span></>}
          {article.readingTime > 0 && <><span>·</span><span>{article.readingTime} 分鐘閱讀</span></>}
        </div>

        <h1 className="text-4xl font-bold mb-4 leading-tight">{article.title}</h1>

        {article.summary && (
          <p className="text-lg text-gray-500 mb-8 leading-relaxed">{article.summary}</p>
        )}

        {article.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-12">
            {article.tags.map((tag) => (
              <span key={tag} className="text-xs bg-indigo-50 text-indigo-500 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="prose prose-gray max-w-none">
          <p className="text-gray-400 italic">文章內容從 Notion 同步中...</p>
        </div>
      </article>
    </>
  );
}
