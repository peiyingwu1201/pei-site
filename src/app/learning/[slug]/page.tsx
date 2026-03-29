import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getLearningPosts, getLearningBySlug } from "@/lib/learning";

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getLearningPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getLearningBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.publishedDate ?? undefined,
    },
  };
}

export default async function LearningPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getLearningBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.summary,
    datePublished: post.publishedDate,
    author: { "@type": "Person", name: "Pei" },
    ...(post.coreQuestion && {
      mainEntity: {
        "@type": "Question",
        name: post.coreQuestion,
        acceptedAnswer: {
          "@type": "Answer",
          text: post.summary,
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
        <Link href="/learning" className="text-sm text-gray-400 hover:text-indigo-500 transition-colors mb-8 inline-block">
          ← 回到學習觀點
        </Link>

        <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
          {post.topic && <span>{post.topic}</span>}
          {post.publishedDate && (
            <><span>·</span><time>{new Date(post.publishedDate).toLocaleDateString("zh-TW")}</time></>
          )}
        </div>

        <h1 className="text-4xl font-bold mb-4 leading-tight">{post.title}</h1>

        {post.coreQuestion && (
          <div className="bg-indigo-50 border-l-4 border-indigo-400 px-5 py-4 rounded-r-xl mb-8">
            <p className="text-sm font-medium text-indigo-600 mb-1">核心問題</p>
            <p className="text-indigo-900">{post.coreQuestion}</p>
          </div>
        )}

        {post.summary && (
          <p className="text-lg text-gray-500 mb-10 leading-relaxed">{post.summary}</p>
        )}

        <div className="prose prose-gray max-w-none">
          <p className="text-gray-400 italic">文章內容從 Notion 同步中...</p>
        </div>
      </article>
    </>
  );
}
