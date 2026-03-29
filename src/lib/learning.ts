/* eslint-disable @typescript-eslint/no-explicit-any */
import { notion, DB } from "./notion";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export type LearningPost = {
  id: string;
  title: string;
  slug: string;
  status: string;
  topic: string;
  tags: string[];
  publishedDate: string | null;
  coverImage: string | null;
  summary: string;
  coreQuestion: string;
  featured: boolean;
  difficulty: string;
};

function toLearningPost(page: PageObjectResponse): LearningPost {
  const p = (name: string): any => page.properties[name];

  return {
    id: page.id,
    title: p("標題")?.title?.[0]?.plain_text ?? "",
    slug: p("Slug")?.rich_text?.[0]?.plain_text ?? "",
    status: p("狀態")?.select?.name ?? "",
    topic: p("主題")?.select?.name ?? "",
    tags: p("標籤")?.multi_select?.map((t: any) => t.name) ?? [],
    publishedDate: p("發布日期")?.date?.start ?? null,
    coverImage: p("封面圖片")?.url ?? null,
    summary: p("摘要")?.rich_text?.[0]?.plain_text ?? "",
    coreQuestion: p("核心問題")?.rich_text?.[0]?.plain_text ?? "",
    featured: p("精選")?.checkbox ?? false,
    difficulty: p("難度")?.select?.name ?? "",
  };
}

export async function getLearningPosts(): Promise<LearningPost[]> {
  const res = await notion.databases.query({
    database_id: DB.learning,
    filter: { property: "狀態", select: { equals: "已發布" } },
    sorts: [{ property: "發布日期", direction: "descending" }],
  });

  return (res.results as PageObjectResponse[]).map(toLearningPost);
}

export async function getFeaturedLearning(): Promise<LearningPost[]> {
  const res = await notion.databases.query({
    database_id: DB.learning,
    filter: {
      and: [
        { property: "狀態", select: { equals: "已發布" } },
        { property: "精選", checkbox: { equals: true } },
      ],
    },
  });

  return (res.results as PageObjectResponse[]).map(toLearningPost);
}

export async function getLearningBySlug(slug: string): Promise<LearningPost | null> {
  const res = await notion.databases.query({
    database_id: DB.learning,
    filter: { property: "Slug", rich_text: { equals: slug } },
  });

  if (!res.results.length) return null;
  return toLearningPost(res.results[0] as PageObjectResponse);
}
