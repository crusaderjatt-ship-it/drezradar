// In a production environment, this API key should be stored in an environment variable (e.g., VITE_NEWS_API_KEY)
// and accessed via import.meta.env.VITE_NEWS_API_KEY for security.
const NEWS_API_KEY = "bbb976c973b84d29b49d447616e6b1df";

// Broadened DRESSY_TERMS to include more general clothing-related keywords
const DRESSY_TERMS = `"dress" OR "dresses" OR "gown" OR "maxi dress" OR "midi dress" OR "bodycon" OR "wrap dress" OR "slip dress" OR "blazer dress" OR "lehenga" OR "anarkali" OR "kaftan" OR "punjabi suit" OR "saree" OR "skirt" OR "attire" OR "outfit"`;

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
  "Gen Z Trending": `("Gen Z fashion" OR Y2K OR coquette OR cottagecore OR Barbiecore OR "micro-trends" OR "viral fashion" OR "Milkmaid" OR "Corset" OR "Sheer Mesh" OR "Puff-Sleeve" OR "Cut-Out" OR "Ruched" OR "Denim Corset" OR "Tube" OR "Tulle" OR "Sequin Halter" OR "Metallic Mini" OR "Butterfly Print" OR "Lace-Up" OR "Satin Slip" OR "Feather Trim" OR "Rhinestone") AND (${DRESSY_TERMS})`,
  "Fast Fashion": `("fast fashion" OR "affordable fashion" OR "high street fashion" OR Zara OR H&M OR Shein OR ASOS OR "Little Black Dress" OR "Floral Midi" OR "Wrap Dress" OR "Shirt Dress" OR "T-Shirt Dress" OR "Bodycon Midi" OR "Knit Sweater" OR "Slip Satin" OR "Smocked Maxi" OR "Babydoll" OR "Off-Shoulder Midi" OR "Maxi Sundress" OR "Denim Shirt" OR "Lace Mini" OR "Pleated Midi" OR "Fit-and-Flare" OR "Ribbed Knit" OR "Faux Leather" OR "Linen Sundress") AND (${DRESSY_TERMS})`,
  "Royal Classics": `("royal fashion" OR "classic elegance" OR couture OR "red carpet" OR "evening wear" OR "ball gown" OR "designer fashion" OR "timeless style" OR "Empire Waist Gown" OR "A-Line Evening" OR "Sheath Gown" OR "Mermaid Gown" OR "Column Dress" OR "Princess Gown" OR "Beaded Gown" OR "Velvet Gown" OR "Satin Gown" OR "Lace Appliqué" OR "One-Shoulder Gown" OR "Strapless Gown" OR "Embroidered Gown" OR "Off-Shoulder Satin" OR "Brocade Gown" OR "Cape Dress" OR "High-Neck Gown" OR "Sequined Gown" OR "Chiffon Grecian" OR "Silk Organza" OR "Crystal-Studded" OR "Draped Satin" OR "Feather-Detail" OR "Metallic Lame" OR "Duchess Satin" OR "Silk Crepe" OR "Silk Jacquard" OR "Classic Black Evening") AND (${DRESSY_TERMS})`,
  "Traditional": `("traditional dress" OR "ethnic fashion" OR lehenga OR anarkali OR kaftan OR saree OR "cultural attire" OR "folk dress" OR "Punjabi Suit" OR "Patiala Suit" OR "Angrakha" OR "Sharara" OR "Gharara" OR "Palazzo Suit" OR "Churidar Kurta" OR "Phulkari" OR "Salwar Kameez" OR "Indo-Western Gown" OR "Lehenga Choli" OR "Embroidered Lehenga" OR "Banarasi Lehenga" OR "Zardozi Lehenga" OR "Chikankari" OR "Kashmiri Suit" OR "Pakistani Suit" OR "Lucknowi Anarkali" OR "Saree Dress" OR "Cape Lehenga") AND (${DRESSY_TERMS})`,
  "All Fashion": `(fashion OR style OR trend OR "new collection" OR runway OR designers OR "Maxi" OR "Midi" OR "Mini" OR "Bodycon" OR "A-Line" OR "Wrap" OR "Slip" OR "Shirt" OR "Halter" OR "Off-Shoulder" OR "Cocktail" OR "Evening" OR "Party" OR "Sweater" OR "Tunic" OR "Kaftan" OR "Shift" OR "Empire Waist" OR "Sheath" OR "Mermaid" OR "Denim" OR "Sequin" OR "Metallic" OR "Velvet" OR "Satin" OR "Lace" OR "Knit" OR "Blazer" OR "Corset" OR "Skater" OR "Fit-and-Flare" OR "Ruffled" OR "Fringe" OR "Pleated" OR "Cape" OR "Faux Leather" OR "Beaded") OR (${DRESSY_TERMS})`,
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