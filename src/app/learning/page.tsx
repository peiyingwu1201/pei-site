import type { Metadata } from "next";
import Link from "next/link";
import { getLearningPosts } from "@/lib/learning";

export const metadata: Metadata = {
  title: "學習觀點",
  description: "Pei 的學習心得與知識整理，涵蓋前端、AI 工具、設計思維與職涯成長。",
};

export const revalidate = 3600;

const difficultyColor: Record<string, string> = {
  入門: "bg-green-50 text-green-600",
  中級: "bg-yellow-50 text-yellow-600",
  進階: "bg-red-50 text-red-500",
};

export default async function LearningPage() {
  const posts = await getLearningPosts();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">學習觀點</h1>
      <p className="text-gray-500 mb-12">知識整理、學習心得與個人見解</p>

      {posts.length === 0 ? (
        <p className="text-gray-400">內容即將上線，敬請期待。</p>
      ) : (
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/learning/${post.slug}`} className="group flex gap-4 items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                    {post.topic && <span>{post.topic}</span>}
                    {post.publishedDate && (
                      <>
                        <span>·</span>
                        <time>{new Date(post.publishedDate).toLocaleDateString("zh-TW")}</time>
                      </>
                    )}
                    {post.difficulty && (
                      <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColor[post.difficulty] ?? "bg-gray-100 text-gray-500"}`}>
                        {post.difficulty}
                      </span>
                    )}
                  </div>
                  <h2 className="font-semibold group-hover:text-indigo-500 transition-colors mb-1">
                    {post.title}
                  </h2>
                  {post.summary && (
                    <p className="text-sm text-gray-500 line-clamp-2">{post.summary}</p>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
