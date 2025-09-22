// IMPORTANT: For production, it's highly recommended to store API keys in environment variables.
// For this session, the provided key is directly used.
const NEWS_API_KEY = "bbb976c973b84d29b49d447616e6b1df";

// Simplified DRESSY_TERMS to be very concise
const DRESSY_TERMS = `"fashion" OR "dress"`;

const FASHION_MAGAZINE_DOMAINS = [
  "vogue.com", "harpersbazaar.com", "elle.com", "instyle.com", "cosmopolitan.com",
  "glamour.com", "wmagazine.com", "marieclaire.com", "allure.com", "nylon.com",
  "teenvogue.com", "wwd.com", "papermag.com", "nymag.com", "seventeen.com",
  "vanityfair.com", "essence.com", "gq.com", "lofficielusa.com", "crfashionbook.com"
].join(',');

const CATEGORY_QUERIES: { [key: string]: string } = {
  "Gen Z Trending": `("Gen Z fashion" OR Y2K OR TikTok) OR (${DRESSY_TERMS})`,
  "Fast Fashion": `("fast fashion" OR Zara OR H&M) OR (${DRESSY_TERMS})`,
  "Royal Classics": `("royal fashion" OR couture OR "red carpet") OR (${DRESSY_TERMS})`,
  "Traditional": `("traditional dress" OR "ethnic fashion" OR saree) OR (${DRESSY_TERMS})`,
  "All Fashion": `(fashion OR style OR trend) OR (${DRESSY_TERMS})`,
};

export async function fetchFashionNews(categoryName: string, pageSize: number = 12) {
  const query = CATEGORY_QUERIES[categoryName];
  if (!query) {
    console.warn(`No specific query defined for category: ${categoryName}. Falling back to generic "fashion".`);
    return [];
  }

  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&domains=${FASHION_MAGAZINE_DOMAINS}&sortBy=publishedAt&language=en&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`;
  console.log("Fetching NewsAPI URL:", url); // Log the full URL for debugging

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`NewsAPI error: ${response.statusText} (Status: ${response.status}) - ${errorData.message || 'Unknown error'}`);
    }
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error(`Failed to fetch fashion news for category "${categoryName}":`, error);
    return [];
  }
}