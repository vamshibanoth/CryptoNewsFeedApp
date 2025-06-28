export const fetchArticles = async () => {
  const res = await fetch(
    "https://newsapi.org/v2/everything?q=crypto&apiKey=6a52bdc7de3c49d38895cdfba705c005"
  );

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();
  console.log("data ==>", data);
  return data;
};
