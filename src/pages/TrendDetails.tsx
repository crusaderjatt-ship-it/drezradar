import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react"; // For social share icon

// Mock data for demonstration
const mockTrendPosts = [
  {
    platform_post_id: "1",
    platform: "tiktok",
    dress_type: "cottagecore-dress",
    caption: "Loving this cottagecore vibe! #cottagecore #dress #fashion",
    image_url: "https://via.placeholder.com/300/F8EAF1/000000?text=Post1",
    permalink: "https://tiktok.com/post/1",
    posted_at: "2023-10-26T10:00:00Z",
    metrics: { views: 120000, likes: 15000, comments: 500, saves: 1200 },
  },
  {
    platform_post_id: "2",
    platform: "tiktok",
    dress_type: "cottagecore-dress",
    caption: "Dreamy dress for a dreamy day. #cottagecorefashion #ootd",
    image_url: "https://via.placeholder.com/300/EEE8FF/000000?text=Post2",
    permalink: "https://tiktok.com/post/2",
    posted_at: "2023-10-26T11:30:00Z",
    metrics: { views: 95000, likes: 10000, comments: 300, saves: 800 },
  },
  {
    platform_post_id: "3",
    platform: "instagram",
    dress_type: "slip-dress",
    caption: "Effortless elegance with a classic slip dress. #slipdress #style",
    image_url: "https://via.placeholder.com/300/E8FAF2/000000?text=Post3",
    permalink: "https://instagram.com/post/3",
    posted_at: "2023-10-25T14:00:00Z",
    metrics: { views: 80000, likes: 8000, comments: 200, saves: 600 },
  },
  {
    platform_post_id: "4",
    platform: "instagram",
    dress_type: "slip-dress",
    caption: "Date night ready in my favorite slip. #fashionista #datenight",
    image_url: "https://via.placeholder.com/300/F8EAF1/000000?text=Post4",
    permalink: "https://instagram.com/post/4",
    posted_at: "2023-10-25T16:45:00Z",
    metrics: { views: 70000, likes: 7500, comments: 180, saves: 550 },
  },
  {
    platform_post_id: "5",
    platform: "pinterest",
    dress_type: "boho-maxi-dress",
    caption: "Boho vibes all summer long. #maxidress #bohostyle",
    image_url: "https://via.placeholder.com/300/EEE8FF/000000?text=Post5",
    permalink: "https://pinterest.com/pin/5",
    posted_at: "2023-10-24T09:00:00Z",
    metrics: { views: 60000, likes: 6000, comments: 100, saves: 400 },
  },
];

const TrendDetails = () => {
  const { platform, dress_type } = useParams<{ platform: string; dress_type: string }>();

  const filteredPosts = mockTrendPosts.filter(
    (post) =>
      post.platform === platform && post.dress_type === dress_type
  );

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
      // Fallback for browsers that don't support Web Share API
      alert(`You can share this link: ${shareUrl}`);
      // You could also open a new window with specific share links for Twitter, Facebook, etc.
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Link to="/" className="text-primary hover:underline mb-4 inline-block">
          &larr; Back to Home
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-charcoal mb-2 capitalize">
          {dress_type?.replace(/-/g, ' ')}
        </h1>
        <p className="text-lg text-charcoal-light mb-6 capitalize">
          Trending on {platform}
        </p>

        <Button
          onClick={handleShare}
          className="mb-8 bg-secondary text-secondary-foreground hover:bg-secondary/80"
        >
          <Share2 className="mr-2 h-4 w-4" /> Share Trend
        </Button>

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPosts.map((post, index) => (
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
          <p className="text-charcoal-light">No posts found for this trend on {platform}.</p>
        )}
      </div>
    </div>
  );
};

export default TrendDetails;