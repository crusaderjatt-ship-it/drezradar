// In a production environment, this API key should be stored in an environment variable (e.g., VITE_NEWS_API_KEY)
// and accessed via import.meta.env.VITE_NEWS_API_KEY for security.
const NEWS_API_KEY = "bbb976c973b84d29b49d447616e6b1df";

export async function fetchFashionNews() {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=fashion&sortBy=publishedAt&language=en&pageSize=6&apiKey=${NEWS_API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`NewsAPI error: ${response.statusText}`);
    }
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Failed to fetch fashion news:", error);
    return [];
  }
}