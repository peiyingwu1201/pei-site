export const runtime = 'edge';

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPortfolioBySlug } from "@/lib/portfolio";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPortfolioBySlug(slug);
  if (!item) return {};

  return {
    title: item.name,
    description: item.description,
    openGraph: {
      title: item.name,
      description: item.description,
      ...(item.coverImage && { images: [item.coverImage] }),
    },
  };
}

export default async function PortfolioItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getPortfolioBySlug(slug);
  if (!item) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.name,
    description: item.description,
    author: { "@type": "Person", name: "Pei" },
    url: item.siteUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-2xl mx-auto px-6 py-16">
        <Link href="/portfolio" className="text-sm text-gray-400 hover:text-indigo-500 transition-colors mb-8 inline-block">
          ← 回到作品集
        </Link>

        {item.coverImage && (
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-50 mb-8">
            <Image src={item.coverImage} alt={item.name} fill className="object-cover" />
          </div>
        )}

        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold">{item.name}</h1>
          <span className={`text-sm px-3 py-1 rounded-full ${
            item.status === "已完成" ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"
          }`}>
            {item.status}
          </span>
        </div>

        {item.description && (
          <p className="text-gray-500 mb-6 leading-relaxed">{item.description}</p>
        )}

        <div className="flex gap-3 mb-8">
          {item.siteUrl && (
            <a href={item.siteUrl} target="_blank" rel="noopener noreferrer"
              className="text-sm bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors">
              查看網站 →
            </a>
          )}
          {item.githubUrl && (
            <a href={item.githubUrl} target="_blank" rel="noopener noreferrer"
              className="text-sm border border-gray-200 text-gray-600 px-4 py-2 rounded-lg hover:border-indigo-300 transition-colors">
              GitHub
            </a>
          )}
        </div>

        {item.techStack.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-medium text-gray-400 mb-2">技術棧</h2>
            <div className="flex gap-2 flex-wrap">
              {item.techStack.map((tech) => (
                <span key={tech} className="text-sm bg-indigo-50 text-indigo-500 px-3 py-1 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
