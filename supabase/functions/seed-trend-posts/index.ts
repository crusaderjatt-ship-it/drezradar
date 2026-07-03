import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return new Response(JSON.stringify({ error: 'Supabase service role credentials not set.' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      });
    }

    // Create Supabase client with the service role key to bypass RLS
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // --- Mock Data Generation (Replace with actual API calls in a real app) ---
    const mockTrendPosts = [
      {
        platform_post_id: `tiktok-post-${Date.now()}-1`,
        platform: 'TikTok',
        dress_type: 'Gen Z Trending',
        caption: 'Latest Gen Z street style vibes!',
        image_url: 'https://picsum.photos/seed/genz1/400/300',
        permalink: 'https://www.tiktok.com/@example/video/1',
        posted_at: new Date().toISOString(),
        views: Math.floor(Math.random() * 100000),
        likes: Math.floor(Math.random() * 5000),
        comments: Math.floor(Math.random() * 500),
        saves: Math.floor(Math.random() * 1000),
      },
      {
        platform_post_id: `instagram-post-${Date.now()}-1`,
        platform: 'Instagram',
        dress_type: 'Fast Fashion',
        caption: 'Affordable and chic new arrivals!',
        image_url: 'https://picsum.photos/seed/fastfashion1/400/300',
        permalink: 'https://www.instagram.com/p/1',
        posted_at: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        views: Math.floor(Math.random() * 80000),
        likes: Math.floor(Math.random() * 4000),
        comments: Math.floor(Math.random() * 400),
        saves: Math.floor(Math.random() * 800),
      },
      {
        platform_post_id: `tiktok-post-${Date.now()}-2`,
        platform: 'TikTok',
        dress_type: 'Royal Classics',
        caption: 'Elegant evening wear inspiration.',
        image_url: 'https://picsum.photos/seed/royal1/400/300',
        permalink: 'https://www.tiktok.com/@example/video/2',
        posted_at: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
        views: Math.floor(Math.random() * 120000),
        likes: Math.floor(Math.random() * 6000),
        comments: Math.floor(Math.random() * 600),
        saves: Math.floor(Math.random() * 1200),
      },
      {
        platform_post_id: `instagram-post-${Date.now()}-2`,
        platform: 'Instagram',
        dress_type: 'Traditional',
        caption: 'Celebrating cultural attire with modern twists.',
        image_url: 'https://picsum.photos/seed/traditional1/400/300',
        permalink: 'https://www.instagram.com/p/2',
        posted_at: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
        views: Math.floor(Math.random() * 90000),
        likes: Math.floor(Math.random() * 4500),
        comments: Math.floor(Math.random() * 450),
        saves: Math.floor(Math.random() * 900),
      },
      {
        platform_post_id: `tiktok-post-${Date.now()}-3`,
        platform: 'TikTok',
        dress_type: 'Gen Z Trending',
        caption: 'New season, new looks!',
        image_url: 'https://picsum.photos/seed/genz2/400/300',
        permalink: 'https://www.tiktok.com/@example/video/3',
        posted_at: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
        views: Math.floor(Math.random() * 70000),
        likes: Math.floor(Math.random() * 3500),
        comments: Math.floor(Math.random() * 350),
        saves: Math.floor(Math.random() * 700),
      },
      {
        platform_post_id: `instagram-post-${Date.now()}-3`,
        platform: 'Instagram',
        dress_type: 'Fast Fashion',
        caption: 'Weekend outfit inspo!',
        image_url: 'https://picsum.photos/seed/fastfashion2/400/300',
        permalink: 'https://www.instagram.com/p/3',
        posted_at: new Date(Date.now() - 18000000).toISOString(), // 5 hours ago
        views: Math.floor(Math.random() * 60000),
        likes: Math.floor(Math.random() * 3000),
        comments: Math.floor(Math.random() * 300),
        saves: Math.floor(Math.random() * 600),
      },
    ];
    // --- End Mock Data Generation ---

    let totalPostsProcessed = 0;
    for (const post of mockTrendPosts) {
      const { data, error } = await supabase
        .from('trend_posts')
        .upsert(post, {
          onConflict: 'platform_post_id',
          ignoreDuplicates: true  // Skip duplicates instead of inserting them
        })
        .select();

      if (error) {
        console.error(`Error upserting trend post ${post.platform_post_id}:`, error);
      } else {
        console.log(`Successfully processed trend post ${post.platform_post_id}.`);
        totalPostsProcessed += data?.length || 0;
      }
    }

    return new Response(JSON.stringify({ message: `Successfully processed ${totalPostsProcessed} trend posts.` }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Edge Function error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});