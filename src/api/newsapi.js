export const fetchArticles = async (topic = "crypto") => {
  const url = `https://newsapi.org/v2/everything?q=${topic}&apiKey=6a52bdc7de3c49d38895cdfba705c005`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();
  return data;
};
