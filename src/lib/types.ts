export interface SamplePost {
  image_url: string;
  permalink: string;
}

export interface Trend {
  platform: 'TikTok' | 'Instagram' | 'Pinterest' | 'X' | 'All';
  dress_type: string;
  hashtags: string[];
  geo: string;
  score: number;
  sample_posts: SamplePost[];
  updated_at: string;
}

export interface TrendPost {
  platform_post_id: string;
  platform: 'TikTok' | 'Instagram' | 'Pinterest' | 'X';
  dress_type: string;
  caption: string;
  image_url: string;
  permalink: string;
  posted_at: string;
  metrics: {
    views?: number;
    likes?: number;
    comments?: number;
    saves?: number;
    pins?: number;
    retweets?: number;
  };
}

export interface PlatformConfig {
  platform: 'TikTok' | 'Instagram' | 'Pinterest' | 'X';
  active: boolean;
  queries: string[];
  geo_list: string[];
  window_minutes: number;
}