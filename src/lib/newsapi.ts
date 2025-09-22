// In a production environment, this API key should be stored in an environment variable (e.g., VITE_NEWS_API_KEY)
// and accessed via import.meta.env.VITE_NEWS_API_KEY for security.
const NEWS_API_KEY = "bbb976c973b84d29b49d447616e6b1df";

const DRESSY_TERMS_IN_TITLE = `"dress" OR "dresses" OR "gown" OR "maxi dress" OR "midi dress" OR "bodycon" OR "wrap dress" OR "slip dress" OR "blazer dress" OR "lehenga" OR "anarkali" OR "kaftan" OR "punjabi suit"`;

const FASHION_MAGAZINE_DOMAINS = [
  "vogue.com", "harpersbazaar.com", "elle.com", "instyle.com", "cosmopolitan.com",
  "glamour.com", "wmagazine.com", "marieclaire.com", "allure.com", "nylon.com",
  "teenvogue.com", "wwd.com", "papermag.com", "nymag.com", "seventeen.com",
  "vanityfair.com", "essence.com", "gq.com", "lofficielusa.com", "crfashionbook.com"
].join(',');

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
  "Gen Z Trending": `(viral OR "going viral" OR trending OR "sold out" OR "bestseller") AND (TikTok OR "Gen Z" OR GenZ OR Y2K OR coquette OR cottagecore OR "butter yellow" OR "Barbiecore" OR "Shein" OR "Temu" OR "Princess Polly" OR "Halara")`,
  "Fast Fashion": `(${FAST_FASHION_BRANDS}) AND (fashion OR style OR trend OR viral OR trending OR "selling fast" OR "sold out" OR bestseller)`,
  "Royal Classics": `("evening gown" OR "ball gown" OR couture OR "red carpet" OR "royal" OR "princess" OR "duchess" OR "Kate Middleton" OR "Meghan Markle" OR "timeless" OR "classic" OR ${LUXURY_FASHION_HOUSES}) AND (fashion OR style OR trend OR viral OR trending OR "sold out" OR "most-wanted")`,
  "Traditional": `(lehenga OR "Punjabi suit" OR anarkali OR angrakha OR phulkari OR kaftan OR "Pakistani suit" OR saree) AND (fashion OR style OR trend OR viral OR trending OR "sold out" OR "bestseller" OR "going viral")`,
  "All Fashion": `(fashion OR style OR trend OR viral OR "going viral" OR trending OR "sold out" OR bestseller OR "most-wanted") AND ("dress" OR "dresses" OR "gown" OR "maxi dress" OR "midi dress" OR "slip dress" OR "wrap dress" OR "bodycon" OR "blazer dress" OR lehenga OR anarkali OR kaftan OR ${FAST_FASHION_BRANDS} OR ${LUXURY_FASHION_HOUSES})`,
};

export async function fetchFashionNews(categoryName: string, pageSize: number = 12) {
  const query = CATEGORY_QUERIES[categoryName];
  if (!query) {
    console.warn(`No specific query defined for category: ${categoryName}. Falling back to generic "fashion".`);
    return [];
  }

  // Construct the URL with both q and qInTitle, and the domains filter
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&qInTitle=${encodeURIComponent(DRESSY_TERMS_IN_TITLE)}&domains=${FASHION_MAGAZINE_DOMAINS}&sortBy=publishedAt&language=en&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`;

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