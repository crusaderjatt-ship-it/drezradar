// In a production environment, this API key should be stored in an environment variable (e.g., VITE_NEWS_API_KEY)
// and accessed via import.meta.env.VITE_NEWS_API_KEY for security.
// For now, the key is hardcoded to resolve the declaration error.
const NEWS_API_KEY = "bbb976c973b84d29b49d447616e6b1df";

// Simplified DRESSY_TERMS to be more concise
const DRESSY_TERMS = `"dress" OR "dresses" OR "gown" OR "skirt" OR "attire" OR "outfit"`;

const FASHION_MAGAZINE_DOMAINS = [
  "vogue.com", "harpersbazaar.com", "elle.com", "instyle.com", "cosmopolitan.com",
  "glamour.com", "wmagazine.com", "marieclaire.com", "allure.com", "nylon.com",
  "teenvogue.com", "wwd.com", "papermag.com", "nymag.com", "seventeen.com",
  "vanityfair.com", "essence.com", "gq.com", "lofficielusa.com", "crfashionbook.com"
].join(',');

const CATEGORY_QUERIES: { [key: string]: string } = {
  "Gen Z Trending": `("Gen Z fashion" OR Y2K OR coquette OR cottagecore OR Barbiecore OR TikTok OR "Milkmaid Dress" OR "Corset Dress" OR "Sheer Mesh Dress" OR "Puff-Sleeve Dress" OR "Cut-Out Mini Dress" OR "Ruched Bodycon Dress" OR "Metallic Mini Dress" OR "Satin Slip Dress") OR (${DRESSY_TERMS})`,
  "Fast Fashion": `("fast fashion" OR "affordable fashion" OR Zara OR H&M OR Shein OR ASOS OR "Little Black Dress" OR "Floral Midi Dress" OR "Wrap Dress" OR "Shirt Dress" OR "Bodycon Midi Dress" OR "Knit Sweater Dress" OR "Slip Satin Midi" OR "Maxi Sundress") OR (${DRESSY_TERMS})`,
  "Royal Classics": `("royal fashion" OR "classic elegance" OR couture OR "red carpet" OR "evening wear" OR "ball gown" OR "designer fashion" OR "timeless style" OR "Empire Waist Gown" OR "A-Line Evening Dress" OR "Sheath Gown" OR "Mermaid Gown" OR "Velvet Evening Gown" OR "Satin Floor-Length Dress") OR (${DRESSY_TERMS})`,
  "Traditional": `("traditional dress" OR "ethnic fashion" OR lehenga OR anarkali OR kaftan OR saree OR "cultural attire" OR "folk dress" OR "Punjabi Suit" OR "Patiala Suit" OR "Salwar Kameez" OR "Indo-Western Gown" OR "Lehenga Choli") OR (${DRESSY_TERMS})`,
  "All Fashion": `(fashion OR style OR trend OR "new collection" OR runway OR designers OR "Maxi Dress" OR "Midi Dress" OR "Mini Dress" OR "Bodycon Dress" OR "A-Line Dress" OR "Wrap Dress" OR "Slip Dress" OR "Shirt Dress" OR "Halter Dress" OR "Off-Shoulder Dress") OR (${DRESSY_TERMS})`,
};

export async function fetchFashionNews(categoryName: string, pageSize: number = 12) {
  const query = CATEGORY_QUERIES[categoryName];
  if (!query) {
    console.warn(`No specific query defined for category: ${categoryName}. Falling back to generic "fashion".`);
    return [];
  }

  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&domains=${FASHION_MAGAZINE_DOMAINS}&sortBy=publishedAt&language=en&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`;

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