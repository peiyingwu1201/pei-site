/* eslint-disable @typescript-eslint/no-explicit-any */
import { DB, queryDatabase } from "./notion";

export type PortfolioItem = {
  id: string;
  name: string;
  slug: string;
  status: string;
  types: string[];
  techStack: string[];
  siteUrl: string | null;
  githubUrl: string | null;
  coverImage: string | null;
  description: string;
  featured: boolean;
  completedDate: string | null;
};

function toPortfolioItem(page: any): PortfolioItem {
  const p = page.properties;
  return {
    id: page.id,
    name: p["專案名稱"]?.title?.[0]?.plain_text ?? "",
    slug: p["Slug"]?.rich_text?.[0]?.plain_text ?? "",
    status: p["狀態"]?.select?.name ?? "",
    types: p["類型"]?.multi_select?.map((t: any) => t.name) ?? [],
    techStack: p["技術棧"]?.multi_select?.map((t: any) => t.name) ?? [],
    siteUrl: p["網站連結"]?.url ?? null,
    githubUrl: p["GitHub 連結"]?.url ?? null,
    coverImage: p["封面圖片"]?.url ?? null,
    description: p["簡介"]?.rich_text?.[0]?.plain_text ?? "",
    featured: p["精選作品"]?.checkbox ?? false,
    completedDate: p["完成日期"]?.date?.start ?? null,
  };
}

export async function getPortfolio(): Promise<PortfolioItem[]> {
  const data = await queryDatabase(DB.portfolio, {
    sorts: [{ property: "完成日期", direction: "descending" }],
  });
  return data.results.map(toPortfolioItem);
}

export async function getFeaturedPortfolio(): Promise<PortfolioItem[]> {
  const data = await queryDatabase(DB.portfolio, {
    filter: { property: "精選作品", checkbox: { equals: true } },
    sorts: [{ property: "完成日期", direction: "descending" }],
  });
  return data.results.map(toPortfolioItem);
}

export async function getPortfolioBySlug(slug: string): Promise<PortfolioItem | null> {
  const data = await queryDatabase(DB.portfolio, {
    filter: { property: "Slug", rich_text: { equals: slug } },
  });
  if (!data.results.length) return null;
  return toPortfolioItem(data.results[0]);
}
