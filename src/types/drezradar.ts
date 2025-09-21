export type Platform = "All" | "TikTok" | "Instagram" | "Pinterest" | "X";

export interface SamplePost {
  image_url: string;
  permalink: string;
}

export interface Trend {
  platform: Platform;
  dress_type: string;
  hashtags: string[];
  geo: string;
  score: number;
  sample_posts: SamplePost[];
  updated_at: string;
}

export interface TrendPost {
  platform_post_id: string;
  platform: Platform;
  dress_type: string;
  caption: string;
  image_url: string;
  permalink: string;
  posted_at: string;
  metrics: Record<string, number>; // e.g., { views: 100000, likes: 5000, comments: 200 }
}

export interface PlatformConfig {
  platform: Platform;
  active: boolean;
  queries: string[];
  geo_list: string[];
  window_minutes: number;
}

export interface ViewsTop {
  platform: Platform;
  top_trends: Trend[];
  updated_at: string;
}