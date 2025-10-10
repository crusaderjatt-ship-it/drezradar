import { supabase } from './supabaseClient'; // Import the Supabase client

interface SupabaseTrendPost {
  platform_post_id: string;
  platform: string;
  dress_type: string;
  caption: string;
  image_url: string;
  permalink: string;
  posted_at: string;
  views: number;
  likes: number;
  comments: number;
  saves: number;
}

export async function fetchTrendPosts(platform: string, dressType: string, pageSize: number = 12): Promise<SupabaseTrendPost[]> {
  // In a real scenario, you would have a 'trend_posts' table in Supabase.
  // For now, this function will return an empty array, but it's ready for integration.
  let queryBuilder = supabase
    .from('trend_posts') // Assuming you will create a 'trend_posts' table
    .select('platform_post_id, platform, dress_type, caption, image_url, permalink, posted_at, views, likes, comments, saves')
    .eq('platform', platform)
    .eq('dress_type', dressType)
    .order('posted_at', { ascending: false })
    .limit(pageSize);

  try {
    const { data, error } = await queryBuilder;

    if (error) {
      // Log the error but don't throw, so the page can still render with a "no posts found" message
      console.error(`Supabase fetch error for trends (${platform}/${dressType}): ${error.message}`);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error(`Failed to fetch trend posts from Supabase for ${platform}/${dressType}:`, error);
    return [];
  }
}