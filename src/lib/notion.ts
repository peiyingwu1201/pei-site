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
  const res = await fetch(`${NOTION_API}/databases/${databaseId}/query`, {
    method: 'POST',
    headers: notionHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Notion query failed: ${res.status}`);
  return res.json();
}
