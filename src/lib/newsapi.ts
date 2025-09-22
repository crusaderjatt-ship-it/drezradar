// In a production environment, this API key should be stored in an environment variable (e.g., VITE_NEWS_API_KEY)
// and accessed via import.meta.env.VITE_NEWS_API_KEY for security.
const NEWS_API_KEY = "bbb976c973b84d29b49d447616e6b1df";

// news.ts
const NEWS_API_KEY = process.env.NEWS_API_KEY!;

// Force dressy words to appear in TITLE to avoid generic fashion news
const DRESSY_TITLE = `"dress" OR dresses OR gown OR "maxi dress" OR "midi dress" OR "mini dress" OR "bodycon" OR "wrap dress" OR "slip dress" OR "shirt dress" OR lehenga OR anarkali OR kaftan`;

// Generic trending verbs to keep articles about virality/velocity
const TREND_VERBS = `viral OR "going viral" OR trending OR "sold out" OR bestseller OR "selling fast"`;

// Optional noisy topics to exclude (tune as you test)
const EXCLUDES = `-wedding -bride -kids -toddler -costume -Halloween -DIY`;

// High-quality fashion domains only
const FASHION_MAGAZINE_DOMAINS = [
  "vogue.com","harpersbazaar.com","elle.com","instyle.com","cosmopolitan.com",
  "glamour.com","wmagazine.com","marieclaire.com","allure.com","nylon.com",
  "teenvogue.com","wwd.com","papermag.com","nymag.com","seventeen.com",
  "vanityfair.com","essence.com","gq.com","lofficielusa.com","crfashionbook.com"
].join(",");

// Helper: ISO date N days ago
function isoDaysAgo(days = 7) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 19); // NewsAPI expects ISO8601
}

// Category-specific MUST terms (in addition to TREND_VERBS)
const CATEGORY_MUST: Record<string, string> = {
  "Gen Z Trending":
    `(${TREND_VERBS}) AND (TikTok OR "Gen Z" OR GenZ OR Y2K OR coquette OR cottagecore OR Barbiecore OR "milkmaid dress" OR "corset dress" OR "sheer" OR "puff-sleeve" OR "cut-out" OR "ruched" OR "metallic" OR "satin slip")`,
  "Fast Fashion":
    `(${TREND_VERBS}) AND (Zara OR "H&M" OR Shein OR ASOS OR Boohoo OR "PrettyLittleThing" OR "Fashion Nova" OR Primark OR Uniqlo OR Mango OR "Little Black Dress" OR "wrap dress" OR "shirt dress" OR "floral midi")`,
  "Royal Classics":
    `(${TREND_VERBS}) AND ("red carpet" OR couture OR "evening gown" OR "ball gown" OR "A-line evening dress" OR "mermaid gown" OR velvet OR satin OR "duchess" OR "royal")`,
  "Traditional":
    `(${TREND_VERBS}) AND (lehenga OR "lehenga choli" OR anarkali OR angrakha OR phulkari OR kaftan OR saree OR "Punjabi suit" OR "Pakistani suit" OR "Indo-Western gown")`,
  "All Fashion":
    `(${TREND_VERBS}) AND (fashion OR style OR runway OR "new collection" OR "most-wanted")`
};

// Build NewsAPI query parts
function buildQuery(categoryName: string) {
  const must = CATEGORY_MUST[categoryName];
  if (!must) throw new Error(`Unknown category: ${categoryName}`);

  // q: category focus + excludes
  const q = `${must} ${EXCLUDES}`.trim();

  // qInTitle makes sure it’s truly about dresses
  const qInTitle = DRESSY_TITLE;

  return { q, qInTitle };
}

export async function fetchFashionNews(
  categoryName: string,
  pageSize: number = 12,
  daysBack: number = 10,          // tweak window per your needs
  sortBy: "relevancy" | "popularity" = "relevancy"
) {
  const { q, qInTitle } = buildQuery(categoryName);
  const from = isoDaysAgo(daysBack);

  const params = new URLSearchParams({
    q,
    qInTitle,
    from,
    language: "en",
    sortBy,                       // "relevancy" or "popularity"
    searchIn: "title,description",
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

    // Optional de-dupe (same title across domains)
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
