import { supabase } from './supabaseClient'; // Import the Supabase client

// The CATEGORY_QUERIES are still useful for filtering by category in Supabase
const CATEGORY_QUERIES: { [key: string]: string } = {
  "Gen Z Trending": "Gen Z Trending", // Match the category name stored in Supabase
  "Fast Fashion": "Fast Fashion",
  "Royal Classics": "Royal Classics",
  "Traditional": "Traditional",
  "All Fashion": "All Fashion", // This will fetch all articles, as 'All Fashion' is a category
};

interface SupabaseArticle {
  title: string;
  description: string;
  url: string;
  image_url: string; // Matches Supabase column name
  source_name: string; // Matches Supabase column name
  published_at: string;
  category: string;
}

export async function fetchFashionNews(categoryName: string, pageSize: number = 12): Promise<SupabaseArticle[]> {
  let queryBuilder = supabase
    .from('news_articles')
    .select('title, description, url, image_url, source_name, published_at, category')
    .order('published_at', { ascending: false })
    .limit(pageSize);

  // If the category is not "All Fashion", filter by category
  if (categoryName !== "All Fashion") {
    queryBuilder = queryBuilder.eq('category', categoryName);
  }

  try {
    const { data, error } = await queryBuilder;

    if (error) {
      throw new Error(`Supabase fetch error: ${error.message}`);
    }

    return data || [];
  } catch (error) {
    console.error(`Failed to fetch fashion news from Supabase for category "${categoryName}":`, error);
    return [];
  }
}