import { NEWS_API_KEY } from "@env";
export const fetchArticles = async (topic = "crypto") => {
  const url = `https://newsapi.org/v2/everything?q=${topic}&apiKey=${NEWS_API_KEY}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();
  return data;
};
