/* eslint-disable @typescript-eslint/no-explicit-any */
import { notion, DB } from "./notion";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export type Article = {
  id: string;
  title: string;
  slug: string;
  status: string;
  category: string;
  tags: string[];
  publishedDate: string | null;
  coverImage: string | null;
  summary: string;
  seoTitle: string;
  faqQuestion: string;
  featured: boolean;
  readingTime: number;
};

function getProperty(page: PageObjectResponse, name: string): any {
  return page.properties[name];
}

function toArticle(page: PageObjectResponse): Article {
  const p = (name: string) => getProperty(page, name);

  return {
    id: page.id,
    title: p("標題")?.title?.[0]?.plain_text ?? "",
    slug: p("Slug")?.rich_text?.[0]?.plain_text ?? "",
    status: p("狀態")?.select?.name ?? "",
    category: p("分類")?.select?.name ?? "",
    tags: p("標籤")?.multi_select?.map((t: any) => t.name) ?? [],
    publishedDate: p("發布日期")?.date?.start ?? null,
    coverImage: p("封面圖片")?.url ?? null,
    summary: p("摘要")?.rich_text?.[0]?.plain_text ?? "",
    seoTitle: p("SEO 標題")?.rich_text?.[0]?.plain_text ?? "",
    faqQuestion: p("FAQ 關鍵問題")?.rich_text?.[0]?.plain_text ?? "",
    featured: p("精選文章")?.checkbox ?? false,
    readingTime: p("閱讀時間")?.number ?? 0,
  };
}

export async function getArticles(): Promise<Article[]> {
  const res = await notion.databases.query({
    database_id: DB.articles,
    filter: { property: "狀態", select: { equals: "已發布" } },
    sorts: [{ property: "發布日期", direction: "descending" }],
  });

  return (res.results as PageObjectResponse[]).map(toArticle);
}

export async function getFeaturedArticles(): Promise<Article[]> {
  const res = await notion.databases.query({
    database_id: DB.articles,
    filter: {
      and: [
        { property: "狀態", select: { equals: "已發布" } },
        { property: "精選文章", checkbox: { equals: true } },
      ],
    },
    sorts: [{ property: "發布日期", direction: "descending" }],
  });

  return (res.results as PageObjectResponse[]).map(toArticle);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const res = await notion.databases.query({
    database_id: DB.articles,
    filter: { property: "Slug", rich_text: { equals: slug } },
  });

  if (!res.results.length) return null;
  return toArticle(res.results[0] as PageObjectResponse);
}
