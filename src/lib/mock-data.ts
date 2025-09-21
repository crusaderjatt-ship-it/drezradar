import { Trend, TrendPost } from './types';

export const mockTrends: Trend[] = [
  {
    platform: 'TikTok',
    dress_type: 'Cottagecore Dress',
    hashtags: ['#cottagecore', '#fairydress', '#vintagefashion'],
    geo: 'Global',
    score: 95.2,
    sample_posts: [
      { image_url: 'https://picsum.photos/seed/tiktok1/300/400', permalink: 'https://tiktok.com/p1' },
      { image_url: 'https://picsum.photos/seed/tiktok2/300/400', permalink: 'https://tiktok.com/p2' },
      { image_url: 'https://picsum.photos/seed/tiktok3/300/400', permalink: 'https://tiktok.com/p3' },
    ],
    updated_at: new Date().toISOString(),
  },
  {
    platform: 'Instagram',
    dress_type: 'Slip Dress',
    hashtags: ['#slipdress', '#90sfashion', '#minimaliststyle'],
    geo: 'Global',
    score: 88.1,
    sample_posts: [
      { image_url: 'https://picsum.photos/seed/insta1/300/400', permalink: 'https://instagram.com/p1' },
      { image_url: 'https://picsum.photos/seed/insta2/300/400', permalink: 'https://instagram.com/p2' },
    ],
    updated_at: new Date().toISOString(),
  },
  {
    platform: 'Pinterest',
    dress_type: 'Boho Maxi Dress',
    hashtags: ['#bohodress', '#maxidress', '#summerstyle'],
    geo: 'Global',
    score: 79.5,
    sample_posts: [
      { image_url: 'https://picsum.photos/seed/pinterest1/300/400', permalink: 'https://pinterest.com/p1' },
      { image_url: 'https://picsum.photos/seed/pinterest2/300/400', permalink: 'https://pinterest.com/p2' },
      { image_url: 'https://picsum.photos/seed/pinterest3/300/400', permalink: 'https://pinterest.com/p3' },
    ],
    updated_at: new Date().toISOString(),
  },
  {
    platform: 'X',
    dress_type: 'Bodycon Dress',
    hashtags: ['#bodycondress', '#nightout', '#fashiontrends'],
    geo: 'Global',
    score: 72.3,
    sample_posts: [
      { image_url: 'https://picsum.photos/seed/x1/300/400', permalink: 'https://x.com/p1' },
    ],
    updated_at: new Date().toISOString(),
  },
  {
    platform: 'TikTok',
    dress_type: 'Y2K Mini Dress',
    hashtags: ['#y2kfashion', '#minidress', '#throwback'],
    geo: 'Global',
    score: 91.0,
    sample_posts: [
      { image_url: 'https://picsum.photos/seed/tiktok4/300/400', permalink: 'https://tiktok.com/p4' },
      { image_url: 'https://picsum.photos/seed/tiktok5/300/400', permalink: 'https://tiktok.com/p5' },
    ],
    updated_at: new Date().toISOString(),
  },
  {
    platform: 'Instagram',
    dress_type: 'Linen Sundress',
    hashtags: ['#linendress', '#sundress', '#vacationmode'],
    geo: 'Global',
    score: 85.0,
    sample_posts: [
      { image_url: 'https://picsum.photos/seed/insta3/300/400', permalink: 'https://instagram.com/p3' },
      { image_url: 'https://picsum.photos/seed/insta4/300/400', permalink: 'https://instagram.com/p4' },
      { image_url: 'https://picsum.photos/seed/insta5/300/400', permalink: 'https://instagram.com/p5' },
    ],
    updated_at: new Date().toISOString(),
  },
];

export const mockTrendPosts: TrendPost[] = [
  {
    platform_post_id: 'tiktok_p1',
    platform: 'TikTok',
    dress_type: 'Cottagecore Dress',
    caption: 'Feeling like a fairy in this cottagecore dream!',
    image_url: 'https://picsum.photos/seed/tiktok1/600/800',
    permalink: 'https://tiktok.com/p1',
    posted_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    metrics: { views: 120000, likes: 15000, comments: 500, saves: 200 },
  },
  {
    platform_post_id: 'tiktok_p2',
    platform: 'TikTok',
    dress_type: 'Cottagecore Dress',
    caption: 'My favorite new cottagecore find!',
    image_url: 'https://picsum.photos/seed/tiktok2/600/800',
    permalink: 'https://tiktok.com/p2',
    posted_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    metrics: { views: 90000, likes: 10000, comments: 300, saves: 150 },
  },
  {
    platform_post_id: 'insta_p1',
    platform: 'Instagram',
    dress_type: 'Slip Dress',
    caption: 'Effortlessly chic in a classic slip dress.',
    image_url: 'https://picsum.photos/seed/insta1/600/800',
    permalink: 'https://instagram.com/p1',
    posted_at: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(), // 20 hours ago
    metrics: { likes: 8000, comments: 120, saves: 80 },
  },
  {
    platform_post_id: 'pinterest_p1',
    platform: 'Pinterest',
    dress_type: 'Boho Maxi Dress',
    caption: 'Boho vibes all summer long with this maxi dress.',
    image_url: 'https://picsum.photos/seed/pinterest1/600/800',
    permalink: 'https://pinterest.com/p1',
    posted_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    metrics: { pins: 500, saves: 100 },
  },
  {
    platform_post_id: 'x_p1',
    platform: 'X',
    dress_type: 'Bodycon Dress',
    caption: 'Ready for the night in this stunning bodycon!',
    image_url: 'https://picsum.photos/seed/x1/600/800',
    permalink: 'https://x.com/p1',
    posted_at: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
    metrics: { retweets: 200, likes: 1500, comments: 30 },
  },
];