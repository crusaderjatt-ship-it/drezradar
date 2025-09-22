// In a production environment, this API key should be stored in an environment variable (e.g., VITE_NEWS_API_KEY)
// and accessed via import.meta.env.VITE_NEWS_API_KEY for security.
// For now, the key is hardcoded to resolve the declaration error.
const NEWS_API_KEY = "bbb976c973b84d29b49d447616e6b1df";

// const NEWS_API_KEY = process.env.NEWS_API_KEY!;

// Trend verbs
const TREND = `viral OR "going viral" OR trending OR "sold out" OR bestseller OR "selling fast"`;

// Premium fashion domains (strict pass)
const CORE_DOMAINS = [
  "vogue.com","harpersbazaar.com","elle.com","instyle.com","cosmopolitan.com",
  "glamour.com","wmagazine.com","marieclaire.com","allure.com","nylon.com",
  "teenvogue.com","wwd.com","papermag.com","nymag.com","seventeen.com",
  "vanityfair.com","essence.com","gq.com","lofficielusa.com","crfashionbook.com"
].join(",");

// Broader lifestyle/regional fashion (fallback pass, esp. for Traditional)
const REGIONAL_DOMAINS = [
  "vogue.in","vogue.co.uk","graziaindia.com","thehindu.com","hindustantimes.com",
  "indianexpress.com","timesofindia.indiatimes.com","tribune.com.pk","dawn.com",
  "thenationalnews.com","gulfnews.com","khaleejtimes.com","harpersbazaararabia.com"
].join(",");

// Category-specific anchors (STRICT)
const CATEGORY_STRICT: Record<string, { q: string; qInTitle?: string }> = {
  "Gen Z Trending": {
    q: `(${TREND}) AND (TikTok OR "Gen Z" OR Y2K OR coquette OR cottagecore OR Barbiecore OR "milkmaid dress" OR "corset dress")`,
    qInTitle: `"dress" OR mini OR slip OR corset`
  },
  "Fast Fashion": {
    q: `(${TREND}) AND (Zara OR "H&M" OR Shein OR ASOS OR Boohoo OR FashionNova OR PrettyLittleThing OR Missguided OR Bershka OR "Pull&Bear" OR Stradivarius OR "C&A" OR "New Look" OR Uniqlo OR Mango)`,
    qInTitle: `"dress" OR midi OR maxi OR wrap OR bodycon`
  },
  "Royal Classics": {
    q: `(${TREND}) AND ("red carpet" OR couture OR "royal fashion" OR "evening wear" OR "ball gown" OR "timeless elegance" OR "Oscar de la Renta" OR "Carolina Herrera")`,
    qInTitle: `"gown" OR evening OR couture OR satin OR velvet`
  },
  "Traditional": {
    q: `(${TREND}) AND (lehenga OR "lehenga choli" OR anarkali OR angrakha OR sharara OR gharara OR phulkari OR bandhani OR chikankari OR kaftan OR saree OR "Punjabi suit" OR "Salwar Kameez" OR "Indo-Western gown")`,
    qInTitle: `lehenga OR anarkali OR saree OR kaftan OR suit`
  },
  "All Fashion": {
    q: `(${TREND}) AND (fashion OR style OR runway OR "new collection" OR designers OR "Maxi Dress" OR "Midi Dress" OR "Mini Dress")`,
    qInTitle: `"dress" OR gown OR outfit OR attire`
  }
};

// Category-specific RELAXED variants (looser title filter, broader anchors)
const CATEGORY_RELAXED: Record<string, { q: string; qInTitle?: string }> = {
  "Gen Z Trending": {
    q: `(TikTok OR "Gen Z" OR Y2K OR coquette OR cottagecore OR Barbiecore) AND (dress OR mini OR slip OR corset)`,
    qInTitle: `"dress" OR mini OR slip`
  },
  "Fast Fashion": {
    q: `(Zara OR "H&M" OR Shein OR ASOS OR Boohoo OR FashionNova OR PrettyLittleThing OR Missguided OR Bershka OR "Pull&Bear" OR Stradivarius OR "C&A" OR "New Look" OR Uniqlo OR Mango) AND (dress OR midi OR maxi OR wrap OR bodycon)`,
    qInTitle: `dress OR midi OR maxi`
  },
  "Royal Classics": {
    q: `("red carpet" OR couture OR "evening wear" OR gown) AND (dress OR gown OR evening)`,
    qInTitle: `gown OR evening`
  },
  "Traditional": {
    q: `(lehenga OR "lehenga choli" OR anarkali OR kaftan OR saree OR "Punjabi suit" OR "Salwar Kameez") AND (trend OR viral OR dress OR outfit)`,
    qInTitle: `lehenga OR anarkali OR saree OR kaftan`
  },
  "All Fashion": {
    q: `(fashion OR style OR runway) AND (dress OR gown)`,
    qInTitle: `dress OR gown`
  }
};

function isoDaysAgo(days = 7) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
}

async function callNewsApi(params: Record<string, string>) {
  const url = `https://newsapi.org/v2/everything?${new URLSearchParams(params).toString()}`;
  const resp = await fetch(url);
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(`NewsAPI ${resp.status}: ${resp.statusText} — ${err.message ?? "unknown"}`);
  }
  const data = await resp.json();
  return (data.articles ?? []) as any[];
}

function dedupeByTitle(articles: any[]) {
  const seen = new Set<string>();
  return articles.filter(a => {
    const t = (a?.title || "").trim().toLowerCase();
    if (!t || seen.has(t)) return false;
    seen.add(t);
    return true;
  });
}

/**
 * Progressive fetching:
 * 1) STRICT: core domains, 10 days, relevancy, strict qInTitle
 * 2) RELAXED: core + regional domains, 14 days, popularity, looser qInTitle
 * 3) WIDE: remove domains, 21 days, popularity, no qInTitle (still dress anchors in q)
 */
export async function fetchFashionNews(
  categoryName: string,
  pageSize = 12,
  minResults = 8
) {
  const strict = CATEGORY_STRICT[categoryName];
  const relaxed = CATEGORY_RELAXED[categoryName];
  if (!strict || !relaxed) return [];

  // PASS 1: STRICT
  const p1 = {
    q: strict.q,
    ...(strict.qInTitle ? { qInTitle: strict.qInTitle } : {}),
    from: isoDaysAgo(10),
    language: "en",
    sortBy: "relevancy",
    searchIn: "title,description",
    pageSize: String(pageSize),
    domains: CORE_DOMAINS,
    apiKey: NEWS_API_KEY
  };
  let articles = dedupeByTitle(await callNewsApi(p1));
  if (articles.length >= minResults) return articles.slice(0, pageSize);

  // PASS 2: RELAXED (broader domains, longer window, popularity)
  const p2 = {
    q: relaxed.q,
    ...(relaxed.qInTitle ? { qInTitle: relaxed.qInTitle } : {}),
    from: isoDaysAgo(14),
    language: "en",
    sortBy: "popularity",
    searchIn: "title,description",
    pageSize: String(pageSize),
    domains: `${CORE_DOMAINS},${REGIONAL_DOMAINS}`,
    apiKey: NEWS_API_KEY
  };
  articles = dedupeByTitle(await callNewsApi(p2));
  if (articles.length >= minResults) return articles.slice(0, pageSize);

  // PASS 3: WIDE (no domain filter, longest window, no qInTitle)
  const p3 = {
    q: relaxed.q,                 // still anchored to dresses per category
    from: isoDaysAgo(21),
    language: "en",
    sortBy: "popularity",
    searchIn: "title,description",
    pageSize: String(pageSize),
    apiKey: NEWS_API_KEY
  };
  articles = dedupeByTitle(await callNewsApi(p3));
  return articles.slice(0, pageSize);
}
