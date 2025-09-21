import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Share2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async'; // For SEO
import { toast } from 'sonner';

// Mock data for demonstration
const mockTrendDetails = {
  tiktok: {
    'cottagecore-dress': {
      dress_type: 'Cottagecore Dress',
      platform: 'TikTok',
      hashtags: ['#cottagecore', '#cottagecoredress', '#fairydress'],
      geo: 'Global',
      score: 9.2,
      posts: [
        { platform_post_id: '1', image_url: '/public/placeholder.svg', permalink: '#', caption: 'Dreamy cottagecore vibes!', posted_at: '2023-10-26T10:00:00Z', metrics: { views: '1.2M', likes: '150K', comments: '5K' } },
        { platform_post_id: '2', image_url: '/public/placeholder.svg', permalink: '#', caption: 'My favorite summer dress!', posted_at: '2023-10-25T14:30:00Z', metrics: { views: '900K', likes: '100K', comments: '3K' } },
        { platform_post_id: '3', image_url: '/public/placeholder.svg', permalink: '#', caption: 'Flowy and fabulous!', posted_at: '2023-10-24T18:00:00Z', metrics: { views: '750K', likes: '80K', comments: '2.5K' } },
        { platform_post_id: '4', image_url: '/public/placeholder.svg', permalink: '#', caption: 'Embrace the aesthetic.', posted_at: '2023-10-23T09:00:00Z', metrics: { views: '600K', likes: '70K', comments: '2K' } },
      ],
    },
  },
  instagram: {
    'slip-dress': {
      dress_type: 'Slip Dress',
      platform: 'Instagram',
      hashtags: ['#slipdress', '#silkdress', '#fashioninspo'],
      geo: 'Global',
      score: 8.8,
      posts: [
        { platform_post_id: '5', image_url: '/public/placeholder.svg', permalink: '#', caption: 'Effortlessly chic.', posted_at: '2023-10-26T11:00:00Z', metrics: { likes: '20K', comments: '800' } },
        { platform_post_id: '6', image_url: '/public/placeholder.svg', permalink: '#', caption: 'Perfect for any occasion.', posted_at: '2023-10-25T15:00:00Z', metrics: { likes: '18K', comments: '700' } },
      ],
    },
  },
  pinterest: {
    'boho-maxi-dress': {
      dress_type: 'Boho Maxi Dress',
      platform: 'Pinterest',
      hashtags: ['#bohomaxi', '#summerdress', '#pinterestfashion'],
      geo: 'Global',
      score: 7.5,
      posts: [
        { platform_post_id: '7', image_url: '/public/placeholder.svg', permalink: '#', caption: 'Boho dreams come true.', posted_at: '2023-10-26T12:00:00Z', metrics: { pins: '5K', saves: '1K' } },
      ],
    },
  },
  x: {
    'bodycon-dress': {
      dress_type: 'Bodycon Dress',
      platform: 'X',
      hashtags: ['#bodycondress', '#partydress', '#fashiontrends'],
      geo: 'Global',
      score: 6.1,
      posts: [
        { platform_post_id: '8', image_url: '/public/placeholder.svg', permalink: '#', caption: 'Ready for the night out!', posted_at: '2023-10-26T13:00:00Z', metrics: { retweets: '500', likes: '2K' } },
      ],
    },
  },
};

const TrendDetails = () => {
  const { platform, dress_type } = useParams<{ platform: string; dress_type: string }>();

  // In a real app, you would fetch this data from your Supabase backend
  const trend = mockTrendDetails[platform as keyof typeof mockTrendDetails]?.[dress_type as keyof typeof mockTrendDetails['tiktok']];

  if (!trend) {
    return (
      <div className="text-center py-12">
        <h2 className="text-3xl font-bold text-charcoal mb-4">Trend Not Found</h2>
        <p className="text-lg text-gray-700 mb-6">
          The trend you are looking for does not exist or has not been updated yet.
        </p>
        <Link to="/">
          <Button className="bg-charcoal hover:bg-gray-700 text-white">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `DrezRadar: ${trend.dress_type} on ${trend.platform}`,
        text: `Check out the viral ${trend.dress_type} trend on ${trend.platform}!`,
        url: window.location.href,
      })
      .then(() => toast.success('Shared successfully!'))
      .catch((error) => toast.error(`Error sharing: ${error.message}`));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <>
      <Helmet>
        <title>{`DrezRadar - ${trend.dress_type} on ${trend.platform}`}</title>
        <meta name="description" content={`Explore the viral ${trend.dress_type} trend on ${trend.platform}, including sample posts and metrics.`} />
        <meta property="og:title" content={`DrezRadar - ${trend.dress_type} on ${trend.platform}`} />
        <meta property="og:description" content={`Explore the viral ${trend.dress_type} trend on ${trend.platform}, including sample posts and metrics.`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        {trend.posts && trend.posts.length > 0 && (
          <meta property="og:image" content={trend.posts[0].image_url} />
        )}
      </Helmet>

      <div className="flex items-center justify-between mb-6">
        <Link to="/">
          <Button variant="outline" className="text-charcoal border-charcoal hover:bg-pastel-lavender">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>
        <Button onClick={handleShare} className="bg-pastel-mint text-charcoal hover:bg-pastel-mint/80">
          <Share2 className="mr-2 h-4 w-4" /> Share
        </Button>
      </div>

      <h1 className="text-4xl font-bold mb-4 text-charcoal capitalize">{trend.dress_type.replace(/-/g, ' ')}</h1>
      <p className="text-xl text-gray-700 mb-6">
        Platform: <span className="font-semibold">{trend.platform}</span> | Score: <span className="font-semibold">{trend.score.toFixed(1)}</span>
      </p>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3 text-charcoal">Hashtags</h2>
        <div className="flex flex-wrap gap-2">
          {trend.hashtags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="bg-pastel-lavender text-charcoal text-base px-3 py-1">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-3 text-charcoal">Sample Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {trend.posts.map((post, index) => (
          <a key={index} href={post.permalink} target="_blank" rel="noopener noreferrer" className="block">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative w-full aspect-square">
                <img src={post.image_url} alt={post.caption} className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-800 mb-2 line-clamp-2">{post.caption}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  {post.metrics.views && <span>Views: {post.metrics.views}</span>}
                  {post.metrics.likes && <span>Likes: {post.metrics.likes}</span>}
                  {post.metrics.comments && <span>Comments: {post.metrics.comments}</span>}
                  {post.metrics.saves && <span>Saves: {post.metrics.saves}</span>}
                  {post.metrics.pins && <span>Pins: {post.metrics.pins}</span>}
                  {post.metrics.retweets && <span>Retweets: {post.metrics.retweets}</span>}
                </div>
                <p className="text-xs text-muted-foreground mt-2">Posted: {new Date(post.posted_at).toLocaleDateString()}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
};

export default TrendDetails;