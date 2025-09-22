// IMPORTANT: In a production environment, this API key MUST be stored in an environment variable (e.g., VITE_NEWS_API_KEY)
// and accessed via import.meta.env.VITE_NEWS_API_KEY for security.
// Please obtain your own API key from NewsAPI.org and add it to a .env.local file like:
// VITE_NEWS_API_KEY=YOUR_ACTUAL_API_KEY_HERE
const NEWS_API_KEY = "bbb976c973b84d29b49d447616e6b1df"; // Using a placeholder key for now.

//const NEWS_API_KEY = process.env.NEWS_API_KEY!;

// Shared verbs to capture virality
const TREND_VERBS = `viral OR "going viral" OR trending OR "sold out" OR bestseller OR "selling fast"`;

// High-quality fashion sources
const FASHION_MAGAZINE_DOMAINS = [
  "vogue.com","harpersbazaar.com","elle.com","instyle.com","cosmopolitan.com",
  "glamour.com","wmagazine.com","marieclaire.com","allure.com","nylon.com",
  "teenvogue.com","wwd.com","papermag.com","nymag.com","seventeen.com",
  "vanityfair.com","essence.com","gq.com","lofficielusa.com","crfashionbook.com"
].join(",");

// Category-specific queries
const CATEGORY_QUERIES: { [key: string]: { q: string; qInTitle?: string } } = {
  "Gen Z Trending": {
    q: `(${TREND_VERBS}) AND (TikTok OR "Gen Z" OR Y2K OR coquette OR cottagecore OR Barbiecore OR "Milkmaid Dress" OR "Corset Dress" OR "Puff-Sleeve" OR "Cut-Out" OR "Sheer Mesh")`,
    qInTitle: `"dress" OR mini OR slip OR corset OR puff`
  },
  "Fast Fashion": {
    q: `(${TREND_VERBS}) AND (Zara OR "H&M" OR Shein OR ASOS OR Boohoo OR FashionNova OR PrettyLittleThing OR Primark OR Uniqlo OR Mango)`,
    qInTitle: `"dress" OR midi OR maxi OR wrap OR bodycon`
  },
  "Royal Classics": {
    q: `(${TREND_VERBS}) AND ("red carpet" OR couture OR "royal fashion" OR "evening wear" OR "ball gown" OR "timeless elegance" OR "Oscar de la Renta" OR "Carolina Herrera")`,
    qInTitle: `"gown" OR evening OR couture OR satin OR velvet`
  },
  "Traditional": {
    q: `(${TREND_VERBS}) AND (lehenga OR anarkali OR kaftan OR saree OR "Punjabi Suit" OR "Salwar Kameez" OR "Indo-Western Gown" OR phulkari OR angrakha)`,
    qInTitle: `lehenga OR anarkali OR saree OR kaftan OR suit`
  },
  "All Fashion": {
    q: `(${TREND_VERBS}) AND (fashion OR style OR runway OR "new collection" OR designers OR "Maxi Dress" OR "Midi Dress" OR "Mini Dress")`,
    qInTitle: `"dress" OR gown OR outfit OR attire`
  }
};

// Helper: ISO date N days ago
function isoDaysAgo(days = 7) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 19);
}

export async function fetchFashionNews(
  categoryName: string,
  pageSize: number = 12,
  daysBack: number = 10,
  sortBy: "relevancy" | "popularity" = "relevancy"
) {
  const category = CATEGORY_QUERIES[categoryName];
  if (!category) {
    console.warn(`No query defined for category: ${categoryName}`);
    return [];
  }

  const { q, qInTitle } = category;
  const from = isoDaysAgo(daysBack);

  const params = new URLSearchParams({
    q,
    ...(qInTitle ? { qInTitle } : {}),
    from,
    language: "en",
    sortBy,
    pageSize: String(pageSize),
    domains: FASHION_MAGAZINE_DOMAINS,
    apiKey: NEWS_API_KEY
  });

  const url = `https://newsapi.org/v2/everything?${params.toString()}`;

  try {
    const resp = await fetch(url);
    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      throw new Error(`NewsAPI error ${resp.status}: ${resp.statusText} — ${err.message ?? "unknown"}`);
    }
    const data = await resp.json();

    // De-dupe by title
    const seen = new Set<string>();
    const articles = (data.articles || []).filter((a: any) => {
      const key = (a?.title || "").toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    return articles;
  } catch (e) {
    console.error(`[NewsAPI:${categoryName}]`, e);
    return [];
  }
}
