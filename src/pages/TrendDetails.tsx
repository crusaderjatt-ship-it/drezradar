import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { fetchTrendPosts } from "@/lib/trendsapi"; // Import the new API utility

// Define the interface for a trend post, matching the expected Supabase schema
interface TrendPost {
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

const TrendDetails = () => {
  const { platform, dress_type } = useParams<{ platform: string; dress_type: string }>();
  const [trendPosts, setTrendPosts] = useState<TrendPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTrendPosts = async () => {
      if (!platform || !dress_type) {
        setError("Invalid trend parameters.");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const posts = await fetchTrendPosts(platform, dress_type, 20); // Fetch 20 posts
        setTrendPosts(posts);
      } catch (err) {
        setError("Failed to load trend posts. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getTrendPosts();
  }, [platform, dress_type]);

  const handleShare = () => {
    const shareUrl = window.location.href;
    const shareText = `Check out the ${dress_type} trend on ${platform} via DrezRadar!`;

    if (navigator.share) {
      navigator.share({
        title: 'DrezRadar Trend',
        text: shareText,
        url: shareUrl,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
    } else {
      alert(`You can share this link: ${shareUrl}`);
    }
  };

  const formattedDressType = dress_type?.replace(/-/g, ' ') || 'Fashion Trend';
  const formattedPlatform = platform?.charAt(0).toUpperCase() + platform?.slice(1) || 'Various Platforms';

  const pageTitle = `${formattedDressType} Trend on ${formattedPlatform} | DrezRadar`;
  const pageDescription = `Explore the latest ${formattedDressType} trends on ${formattedPlatform}. See trending posts and insights from DrezRadar.`;

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={`https://drezradar.com/trend/${platform}/${dress_type}`} />
      </Helmet>
      <div className="max-w-6xl mx-auto">
        <Link to="/" className="text-primary hover:underline mb-4 inline-block">
          &larr; Back to Home
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-charcoal mb-2 capitalize">
          {formattedDressType}
        </h1>
        <p className="text-lg text-charcoal-light mb-6 capitalize">
          Trending on {formattedPlatform}
        </p>

        <Button
          onClick={handleShare}
          className="mb-8 bg-secondary text-secondary-foreground hover:bg-secondary/80"
        >
          <Share2 className="mr-2 h-4 w-4" /> Share Trend
        </Button>

        {loading ? (
          <div className="text-center text-charcoal-light">Loading trend posts...</div>
        ) : error ? (
          <div className="text-center text-destructive">{error}</div>
        ) : trendPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {trendPosts.map((post, index) => (
              <Card key={index} className="p-4 bg-card text-card-foreground rounded-lg shadow-md flex flex-col">
                <a href={post.permalink} target="_blank" rel="noopener noreferrer" className="block">
                  <img
                    src={post.image_url}
                    alt={post.caption}
                    className="w-full h-48 object-cover rounded-md mb-3"
                  />
                </a>
                <p className="text-sm text-charcoal-light mb-2 flex-grow">{post.caption}</p>
                <div className="text-xs text-muted-foreground">
                  Posted: {new Date(post.posted_at).toLocaleDateString()}
                </div>
                <a href={post.permalink} target="_blank" rel="noopener noreferrer" className="text-primary text-sm mt-2 hover:underline">
                  View Post
                </a>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-charcoal-light">No posts found for this trend on {formattedPlatform}.</p>
        )}
      </div>
    </div>
  );
};

export default TrendDetails;