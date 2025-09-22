// In a production environment, this API key should be stored in an environment variable (e.g., VITE_NEWS_API_KEY)
// and accessed via import.meta.env.VITE_NEWS_API_KEY for security.
const NEWS_API_KEY = "bbb976c973b84d29b49d447616e6b1df";

// Removed DRESSY_TERMS_IN_TITLE as it was too restrictive when combined with other filters.
// The dress-related terms will now be integrated directly into the category queries.

const FASHION_MAGAZINE_DOMAINS = [
  "vogue.com", "harpersbazaar.com", "elle.com", "instyle.com", "cosmopolitan.com",
  "glamour.com", "wmagazine.com", "marieclaire.com", "allure.com", "nylon.com",
  "teenvogue.com", "wwd.com", "papermag.com", "nymag.com", "seventeen.com",
  "vanityfair.com", "essence.com", "gq.com", "lofficielusa.com", "crfashionbook.com"
].join(',');

// Keeping these lists for potential future use or if a more complex query is needed,
// but they won't be directly used in the simplified 'q' parameters for now to avoid length issues.
const FAST_FASHION_BRANDS = [
  "Shein", "Zara", "H&M", "Uniqlo", "Primark", "Forever 21", "ASOS", "Mango",
  "Topshop", "Fashion Nova", "Brandy Melville", "Halara", "GU", "Boohoo",
  "PrettyLittleThing", "Missguided", "Bershka", "Pull&Bear", "Stradivarius",
  "C&A", "Charlotte Russe", "Rue21", "Cotton On", "New Look", "Monki", "Reserved",
  "Express", "Urban Outfitters", "Aeropostale", "Hollister", "American Eagle Outfitters",
  "PacSun", "Hot Topic", "Garage", "Dynamite", "Nasty Gal", "Windsor", "Princess Polly",
  "In The Style", "Temu"
].map(brand => `"${brand}"`).join(' OR ');

const LUXURY_FASHION_HOUSES = [
  "Ralph Lauren", "Calvin Klein", "Michael Kors", "Donna Karan", "DKNY", "Tom Ford",
  "Marc Jacobs", "Tory Burch", "Vera Wang", "Diane von Fürstenberg", "Oscar de la Renta",
  "Carolina Herrera", "Tommy Hilfiger", "Kate Spade", "Coach", "Stuart Weitzman",
  "Proenza Schouler", "The Row", "Rodarte", "Thom Browne", "Anna Sui"
].map(house => `"${house}"`).join(' OR ');

const CATEGORY_QUERIES: { [key: string]: string } = {
  "Gen Z Trending": `(viral OR "going viral" OR trending OR "sold out" OR "bestseller") AND (TikTok OR "Gen Z" OR GenZ OR Y2K OR coquette OR cottagecore OR "butter yellow" OR "Barbiecore" OR "Shein" OR "Temu" OR "Princess Polly" OR "Halara" OR "dress" OR "dresses")`,
  "Fast Fashion": `("fast fashion" OR "affordable fashion" OR "high street fashion" OR "Zara" OR "H&M" OR "Shein" OR "dress" OR "dresses" OR "trends")`,
  "Royal Classics": `("royal fashion" OR "classic fashion" OR "couture" OR "red carpet" OR "evening wear" OR "ball gown" OR "dress" OR "dresses")`,
  "Traditional": `("traditional dress" OR "ethnic fashion" OR lehenga OR "Punjabi suit" OR anarkali OR angrakha OR phulkari OR kaftan OR "Pakistani suit" OR saree OR "dress" OR "dresses")`,
  "All Fashion": `(fashion OR style OR trend OR "dress" OR "dresses" OR "gown" OR "maxi dress" OR "midi dress" OR "slip dress")`,
};

export async function fetchFashionNews(categoryName: string, pageSize: number = 12) {
  const query = CATEGORY_QUERIES[categoryName];
  if (!query) {
    console.warn(`No specific query defined for category: ${categoryName}. Falling back to generic "fashion".`);
    return [];
  }

  // Construct the URL with only q and the domains filter.
  // qInTitle has been removed to make the queries less restrictive.
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&domains=${FASHION_MAGAZINE_DOMAINS}&sortBy=publishedAt&language=en&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      // Attempt to parse error message from API response
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