import { Client } from "@notionhq/client";

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const DB = {
  articles: process.env.NOTION_ARTICLES_DB!,
  portfolio: process.env.NOTION_PORTFOLIO_DB!,
  learning: process.env.NOTION_LEARNING_DB!,
};
