import type { Metadata } from "next";
import Link from "next/link";
import { getPortfolio } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "作品集",
  description: "Pei 的個人專案與作品，包含 Web 開發、UI/UX 設計等。",
};

export const revalidate = 3600;

export default async function PortfolioPage() {
  const items = await getPortfolio();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">作品集</h1>
      <p className="text-gray-500 mb-12">個人專案與設計作品</p>

      {items.length === 0 ? (
        <p className="text-gray-400">作品即將上線，敬請期待。</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/portfolio/${item.slug}`}
              className="group border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
            >
              {item.coverImage && (
                <div className="aspect-video bg-gray-50 overflow-hidden">
                  <img
                    src={item.coverImage}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-5">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="font-semibold group-hover:text-indigo-500 transition-colors">
                    {item.name}
                  </h2>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    item.status === "已完成" ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"
                  }`}>
                    {item.status}
                  </span>
                </div>
                {item.description && (
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">{item.description}</p>
                )}
                {item.techStack.length > 0 && (
                  <div className="flex gap-1.5 flex-wrap">
                    {item.techStack.map((tech) => (
                      <span key={tech} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
