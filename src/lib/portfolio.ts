import { notion, DB } from "./notion";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

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

function toPortfolioItem(page: PageObjectResponse): PortfolioItem {
  const p = (name: string) => (page.properties as Record<string, any>)[name];

  return {
    id: page.id,
    name: p("專案名稱")?.title?.[0]?.plain_text ?? "",
    slug: p("Slug")?.rich_text?.[0]?.plain_text ?? "",
    status: p("狀態")?.select?.name ?? "",
    types: p("類型")?.multi_select?.map((t: any) => t.name) ?? [],
    techStack: p("技術棧")?.multi_select?.map((t: any) => t.name) ?? [],
    siteUrl: p("網站連結")?.url ?? null,
    githubUrl: p("GitHub 連結")?.url ?? null,
    coverImage: p("封面圖片")?.url ?? null,
    description: p("簡介")?.rich_text?.[0]?.plain_text ?? "",
    featured: p("精選作品")?.checkbox ?? false,
    completedDate: p("完成日期")?.date?.start ?? null,
  };
}

export async function getPortfolio(): Promise<PortfolioItem[]> {
  const res = await notion.databases.query({
    database_id: DB.portfolio,
    sorts: [{ property: "完成日期", direction: "descending" }],
  });

  return (res.results as PageObjectResponse[]).map(toPortfolioItem);
}

export async function getFeaturedPortfolio(): Promise<PortfolioItem[]> {
  const res = await notion.databases.query({
    database_id: DB.portfolio,
    filter: { property: "精選作品", checkbox: { equals: true } },
    sorts: [{ property: "完成日期", direction: "descending" }],
  });

  return (res.results as PageObjectResponse[]).map(toPortfolioItem);
}

export async function getPortfolioBySlug(slug: string): Promise<PortfolioItem | null> {
  const res = await notion.databases.query({
    database_id: DB.portfolio,
    filter: { property: "Slug", rich_text: { equals: slug } },
  });

  if (!res.results.length) return null;
  return toPortfolioItem(res.results[0] as PageObjectResponse);
}
