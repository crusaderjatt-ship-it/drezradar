// In a production environment, this API key should be stored in an environment variable (e.g., VITE_NEWS_API_KEY)
// and accessed via import.meta.env.VITE_NEWS_API_KEY for security.
const NEWS_API_KEY = "bbb976c973b84d29b49d447616e6b1df";

const DRESSY_TERMS_IN_TITLE = `"dress" OR "dresses" OR "gown" OR "maxi dress" OR "midi dress" OR "bodycon" OR "wrap dress" OR "slip dress" OR "blazer dress" OR "lehenga" OR "anarkali" OR "kaftan" OR "punjabi suit"`;

const CATEGORY_QUERIES: { [key: string]: string } = {
  "Gen Z Trending": `(viral OR "going viral" OR trending OR "sold out" OR "bestseller") AND (TikTok OR "Gen Z" OR GenZ OR Y2K OR coquette OR cottagecore OR "butter yellow" OR "Barbiecore")`,
  "Fast Fashion": `(viral OR trending OR "selling fast" OR "sold out" OR bestseller) AND (Zara OR "H&M" OR Shein OR ASOS OR Boohoo OR "Fashion Nova" OR Primark OR Uniqlo OR Mango)`,
  "Royal Classics": `("evening gown" OR "ball gown" OR couture OR "red carpet" OR "royal" OR "princess" OR "duchess" OR "Kate Middleton" OR "Meghan Markle" OR "timeless" OR "classic") AND (viral OR trending OR "sold out" OR "most-wanted")`,
  "Traditional": `(lehenga OR "Punjabi suit" OR anarkali OR angrakha OR phulkari OR kaftan OR "Pakistani suit" OR saree) AND (viral OR trending OR "sold out" OR "bestseller" OR "going viral" OR TikTok OR Instagram OR Pinterest)`,
  "All Fashion": `(viral OR "going viral" OR trending OR "sold out" OR bestseller OR "most-wanted") AND ("dress" OR "dresses" OR "gown" OR "maxi dress" OR "midi dress" OR "slip dress" OR "wrap dress" OR "bodycon" OR "blazer dress" OR lehenga OR anarkali OR kaftan)`,
};

export async function fetchFashionNews(categoryName: string, pageSize: number = 12) {
  const query = CATEGORY_QUERIES[categoryName];
  if (!query) {
    console.warn(`No specific query defined for category: ${categoryName}. Falling back to generic "fashion".`);
    return [];
  }

  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&qInTitle=${encodeURIComponent(DRESSY_TERMS_IN_TITLE)}&sortBy=publishedAt&language=en&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`NewsAPI error: ${response.statusText} (Status: ${response.status})`);
    }
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error(`Failed to fetch fashion news for category "${categoryName}":`, error);
    return [];
  }
}