export const NOTION_API = 'https://api.notion.com/v1';

export const DB = {
  articles: process.env.NOTION_ARTICLES_DB!,
  portfolio: process.env.NOTION_PORTFOLIO_DB!,
  learning: process.env.NOTION_LEARNING_DB!,
};

export function notionHeaders() {
  return {
    'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
    'Notion-Version': '2022-06-28',
    'Content-Type': 'application/json',
  };
}

export async function queryDatabase(databaseId: string, body: object) {
  const token = process.env.NOTION_TOKEN;
  if (!token) {
    console.warn('[Notion] NOTION_TOKEN is not set, returning empty results');
    return { results: [] };
  }
  const res = await fetch(`${NOTION_API}/databases/${databaseId}/query`, {
    method: 'POST',
    headers: notionHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    console.error(`[Notion] query failed: ${res.status} ${res.statusText}`);
    return { results: [] };
  }
  return res.json();
}
