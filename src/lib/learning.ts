/* eslint-disable @typescript-eslint/no-explicit-any */
import { DB, queryDatabase } from "./notion";

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

function toLearningPost(page: any): LearningPost {
  const p = page.properties;
  return {
    id: page.id,
    title: p["標題"]?.title?.[0]?.plain_text ?? "",
    slug: p["Slug"]?.rich_text?.[0]?.plain_text ?? "",
    status: p["狀態"]?.select?.name ?? "",
    topic: p["主題"]?.select?.name ?? "",
    tags: p["標籤"]?.multi_select?.map((t: any) => t.name) ?? [],
    publishedDate: p["發布日期"]?.date?.start ?? null,
    coverImage: p["封面圖片"]?.url ?? null,
    summary: p["摘要"]?.rich_text?.[0]?.plain_text ?? "",
    coreQuestion: p["核心問題"]?.rich_text?.[0]?.plain_text ?? "",
    featured: p["精選"]?.checkbox ?? false,
    difficulty: p["難度"]?.select?.name ?? "",
  };
}

export async function getLearningPosts(): Promise<LearningPost[]> {
  const data = await queryDatabase(DB.learning, {
    filter: { property: "狀態", select: { equals: "已發布" } },
    sorts: [{ property: "發布日期", direction: "descending" }],
  });
  return data.results.map(toLearningPost);
}

export async function getFeaturedLearning(): Promise<LearningPost[]> {
  const data = await queryDatabase(DB.learning, {
    filter: {
      and: [
        { property: "狀態", select: { equals: "已發布" } },
        { property: "精選", checkbox: { equals: true } },
      ],
    },
  });
  return data.results.map(toLearningPost);
}

export async function getLearningBySlug(slug: string): Promise<LearningPost | null> {
  const data = await queryDatabase(DB.learning, {
    filter: { property: "Slug", rich_text: { equals: slug } },
  });
  if (!data.results.length) return null;
  return toLearningPost(data.results[0]);
}
