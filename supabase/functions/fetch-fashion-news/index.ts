import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.44.4'
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

// IMPORTANT: For production, ensure NEWS_API_KEY is set as a Supabase Secret.
const NEWS_API_KEY = Deno.env.get('NEWS_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY');

if (!NEWS_API_KEY) {
  console.error('NEWS_API_KEY is not set in environment variables.');
  // In a real scenario, you might want to throw an error or exit
}
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('SUPABASE_URL or SUPABASE_ANON_KEY is not set in environment variables.');
  // In a real scenario, you might want to throw an error or exit
}

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

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  source: {
    name: string;
  };
  publishedAt: string;
}

async function fetchFashionNews(categoryName: string, pageSize: number = 12): Promise<Article[]> {
  const query = CATEGORY_QUERIES[categoryName];
  if (!query) {
    console.warn(`No specific query defined for category: ${categoryName}.`);
    return [];
  }

  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&domains=${FASHION_MAGAZINE_DOMAINS}&sortBy=publishedAt&language=en&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`NewsAPI error for category "${categoryName}": ${response.statusText} (Status: ${response.status}) - ${errorData.message || 'Unknown error'}`);
    }
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error(`Failed to fetch fashion news for category "${categoryName}":`, error);
    return [];
  }
}

serve(async (req) => {
  try {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      return new Response(JSON.stringify({ error: 'Supabase credentials not set.' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const allCategories = Object.keys(CATEGORY_QUERIES);
    let totalArticlesProcessed = 0;

    for (const category of allCategories) {
      console.log(`Fetching news for category: ${category}`);
      const articles = await fetchFashionNews(category, 20); // Fetch 20 articles per category

      if (articles.length > 0) {
        const articlesToInsert = articles.map(article => ({
          title: article.title,
          description: article.description,
          url: article.url,
          image_url: article.urlToImage,
          source_name: article.source.name,
          published_at: article.publishedAt,
          category: category,
        }));

        // Changed onConflict to use both 'url' and 'category'
        const { data, error } = await supabase
          .from('news_articles')
          .upsert(articlesToInsert, { onConflict: ['url', 'category'], ignoreDuplicates: false })
          .select(); // Select the inserted/updated data

        if (error) {
          console.error(`Error upserting articles for category ${category}:`, error);
        } else {
          console.log(`Successfully upserted ${data?.length || 0} articles for category ${category}.`);
          totalArticlesProcessed += data?.length || 0;
        }
      } else {
        console.log(`No articles found for category: ${category}`);
      }
    }

    return new Response(JSON.stringify({ message: `Successfully processed ${totalArticlesProcessed} articles across all categories.` }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Edge Function error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});