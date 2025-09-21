import { Platform, Trend, TrendPost } from "@/types/drezradar";

const generateRandomDate = () => {
  const now = new Date();
  const randomMinutesAgo = Math.floor(Math.random() * 120); // Up to 2 hours ago
  now.setMinutes(now.getMinutes() - randomMinutesAgo);
  return now.toISOString();
};

const mockTrends: Trend[] = [
  {
    platform: "TikTok",
    dress_type: "Cottagecore Dress",
    hashtags: ["#cottagecore", "#fairydress", "#vintagefashion"],
    geo: "Global",
    score: 85.2,
    sample_posts: [
      { image_url: "https://picsum.photos/seed/tiktok1/300/400", permalink: "https://tiktok.com/post/1" },
      { image_url: "https://picsum.photos/seed/tiktok2/300/400", permalink: "https://tiktok.com/post/2" },
      { image_url: "https://picsum.photos/seed/tiktok3/300/400", permalink: "https://tiktok.com/post/3" },
    ],
    updated_at: generateRandomDate(),
  },
  {
    platform: "Instagram",
    dress_type: "Slip Dress",
    hashtags: ["#slipdress", "#90sfashion", "#minimaliststyle"],
    geo: "Global",
    score: 78.9,
    sample_posts: [
      { image_url: "https://picsum.photos/seed/insta1/300/400", permalink: "https://instagram.com/p/1" },
      { image_url: "https://picsum.photos/seed/insta2/300/400", permalink: "https://instagram.com/p/2" },
    ],
    updated_at: generateRandomDate(),
  },
  {
    platform: "Pinterest",
    dress_type: "Boho Maxi Dress",
    hashtags: ["#bohodress", "#maxidress", "#summerstyle"],
    geo: "Global",
    score: 91.5,
    sample_posts: [
      { image_url: "https://picsum.photos/seed/pinterest1/300/400", permalink: "https://pinterest.com/pin/1" },
      { image_url: "https://picsum.photos/seed/pinterest2/300/400", permalink: "https://pinterest.com/pin/2" },
      { image_url: "https://picsum.photos/seed/pinterest3/300/400", permalink: "https://pinterest.com/pin/3" },
    ],
    updated_at: generateRandomDate(),
  },
  {
    platform: "X",
    dress_type: "Bodycon Dress",
    hashtags: ["#bodycondress", "#nightout", "#fashiontrends"],
    geo: "Global",
    score: 65.1,
    sample_posts: [
      { image_url: "https://picsum.photos/seed/x1/300/400", permalink: "https://x.com/status/1" },
    ],
    updated_at: generateRandomDate(),
  },
  {
    platform: "TikTok",
    dress_type: "Milkmaid Dress",
    hashtags: ["#milkmaiddress", "#vintageinspired", "#romanticstyle"],
    geo: "Global",
    score: 72.3,
    sample_posts: [
      { image_url: "https://picsum.photos/seed/tiktok4/300/400", permalink: "https://tiktok.com/post/4" },
      { image_url: "https://picsum.photos/seed/tiktok5/300/400", permalink: "https://tiktok.com/post/5" },
    ],
    updated_at: generateRandomDate(),
  },
  {
    platform: "Instagram",
    dress_type: "Cut-out Dress",
    hashtags: ["#cutoutdress", "#partydress", "#fashionista"],
    geo: "Global",
    score: 88.0,
    sample_posts: [
      { image_url: "https://picsum.photos/seed/insta3/300/400", permalink: "https://instagram.com/p/3" },
      { image_url: "https://picsum.photos/seed/insta4/300/400", permalink: "https://instagram.com/p/4" },
      { image_url: "https://picsum.photos/seed/insta5/300/400", permalink: "https://instagram.com/p/5" },
    ],
    updated_at: generateRandomDate(),
  },
  {
    platform: "Pinterest",
    dress_type: "Linen Dress",
    hashtags: ["#linendress", "#summerdress", "#sustainablefashion"],
    geo: "Global",
    score: 70.5,
    sample_posts: [
      { image_url: "https://picsum.photos/seed/pinterest4/300/400", permalink: "https://pinterest.com/pin/4" },
    ],
    updated_at: generateRandomDate(),
  },
  {
    platform: "X",
    dress_type: "Sweater Dress",
    hashtags: ["#sweaterdress", "#winterfashion", "#cozystyle"],
    geo: "Global",
    score: 55.9,
    sample_posts: [
      { image_url: "https://picsum.photos/seed/x2/300/400", permalink: "https://x.com/status/2" },
      { image_url: "https://picsum.photos/seed/x3/300/400", permalink: "https://x.com/status/3" },
    ],
    updated_at: generateRandomDate(),
  },
  {
    platform: "TikTok",
    dress_type: "Denim Dress",
    hashtags: ["#denimdress", "#casualstyle", "#streetwear"],
    geo: "Global",
    score: 68.7,
    sample_posts: [
      { image_url: "https://picsum.photos/seed/tiktok6/300/400", permalink: "https://tiktok.com/post/6" },
    ],
    updated_at: generateRandomDate(),
  },
  {
    platform: "Instagram",
    dress_type: "Blazer Dress",
    hashtags: ["#blazerdress", "#officestyle", "#powerdressing"],
    geo: "Global",
    score: 75.0,
    sample_posts: [
      { image_url: "https://picsum.photos/seed/insta6/300/400", permalink: "https://instagram.com/p/6" },
      { image_url: "https://picsum.photos/seed/insta7/300/400", permalink: "https://instagram.com/p/7" },
    ],
    updated_at: generateRandomDate(),
  },
];

const mockTrendPosts: TrendPost[] = [
  {
    platform_post_id: "tiktok1",
    platform: "TikTok",
    dress_type: "Cottagecore Dress",
    caption: "Feeling like a fairy in this cottagecore dream! 🌸 #cottagecore #fairydress",
    image_url: "https://picsum.photos/seed/tiktok1/600/800",
    permalink: "https://tiktok.com/post/1",
    posted_at: generateRandomDate(),
    metrics: { views: 1200000, likes: 80000, comments: 1500, saves: 5000 },
  },
  {
    platform_post_id: "tiktok2",
    platform: "TikTok",
    dress_type: "Cottagecore Dress",
    caption: "My favorite vintage-inspired look. So comfy and chic! #vintagefashion #cottagecore",
    image_url: "https://picsum.photos/seed/tiktok2/600/800",
    permalink: "https://tiktok.com/post/2",
    posted_at: generateRandomDate(),
    metrics: { views: 900000, likes: 60000, comments: 1000, saves: 3000 },
  },
  {
    platform_post_id: "insta1",
    platform: "Instagram",
    dress_type: "Slip Dress",
    caption: "Effortless elegance with this classic slip dress. #slipdress #90sfashion",
    image_url: "https://picsum.photos/seed/insta1/600/800",
    permalink: "https://instagram.com/p/1",
    posted_at: generateRandomDate(),
    metrics: { likes: 45000, comments: 300, saves: 1200 },
  },
  {
    platform_post_id: "pinterest1",
    platform: "Pinterest",
    dress_type: "Boho Maxi Dress",
    caption: "Dreaming of summer in this beautiful boho maxi. Perfect for beach days! #bohodress #maxidress",
    image_url: "https://picsum.photos/seed/pinterest1/600/800",
    permalink: "https://pinterest.com/pin/1",
    posted_at: generateRandomDate(),
    metrics: { pins: 15000, saves: 800 },
  },
  {
    platform_post_id: "x1",
    platform: "X",
    dress_type: "Bodycon Dress",
    caption: "Ready for a night out! This bodycon dress is everything. #bodycondress #nightout",
    image_url: "https://picsum.photos/seed/x1/600/800",
    permalink: "https://x.com/status/1",
    posted_at: generateRandomDate(),
    metrics: { retweets: 500, likes: 2000, comments: 50 },
  },
];

export const getMockTrends = (platform?: Platform): Trend[] => {
  if (platform && platform !== "All") {
    return mockTrends.filter((trend) => trend.platform === platform);
  }
  return mockTrends;
};

export const getMockTrendDetails = (platform: Platform, dress_type: string): TrendPost[] => {
  return mockTrendPosts.filter(
    (post) => post.platform === platform && post.dress_type === dress_type,
  );
};

export const getMockRandomTrend = (): Trend => {
  const randomIndex = Math.floor(Math.random() * mockTrends.length);
  return mockTrends[randomIndex];
};