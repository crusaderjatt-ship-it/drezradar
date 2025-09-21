import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Share2, ArrowLeft } from "lucide-react";
import { getMockTrendDetails } from "@/lib/mock-data";
import { Platform, TrendPost } from "@/types/drezradar";
import PlatformIcon from "@/components/PlatformIcon";
import { toast } from "sonner";

const TrendDetails: React.FC = () => {
  const { platform, dress_type } = useParams<{ platform: Platform; dress_type: string }>();
  const [posts, setPosts] = React.useState<TrendPost[]>([]);

  React.useEffect(() => {
    if (platform && dress_type) {
      // In a real app, this would fetch data from Supabase
      setPosts(getMockTrendDetails(platform, dress_type.replace(/-/g, ' ')));
    }
  }, [platform, dress_type]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `DrezRadar: ${dress_type} on ${platform}`,
        text: `Check out the viral ${dress_type} trend on ${platform}!`,
        url: window.location.href,
      })
        .then(() => toast.success("Trend shared successfully!"))
        .catch((error) => toast.error(`Failed to share: ${error.message}`));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (!platform || !dress_type) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-drez-charcoal">Trend Not Found</h2>
        <p className="text-gray-600 mt-2">Please select a valid trend.</p>
        <Button asChild className="mt-4 bg-drez-pastel-purple text-drez-charcoal hover:bg-drez-pastel-purple/80">
          <Link to="/">Go to Home</Link>
        </Button>
      </div>
    );
  }

  const formattedDressType = dress_type.replace(/-/g, ' ');

  return (
    <div className="p-4 md:p-8 lg:p-12">
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" asChild className="text-drez-charcoal hover:bg-gray-100">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
        </Button>
        <Button onClick={handleShare} className="bg-drez-pastel-pink text-drez-charcoal hover:bg-drez-pastel-pink/80">
          <Share2 className="mr-2 h-4 w-4" /> Share Trend
        </Button>
      </div>

      <h1 className="text-4xl font-bold text-drez-charcoal mb-4 flex items-center gap-3">
        <PlatformIcon platform={platform} size={32} />
        {formattedDressType} on {platform}
      </h1>
      <p className="text-lg text-gray-600 mb-8">Sample posts for this viral trend.</p>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post, index) => (
            <a
              key={index}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="relative w-full aspect-[3/4] bg-gray-200">
                <img
                  src={post.image_url}
                  alt={post.caption}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 text-drez-charcoal dark:text-white">
                <p className="text-sm font-medium truncate">{post.caption}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Posted: {new Date(post.posted_at).toLocaleDateString()}
                </p>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="text-center p-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-xl text-gray-500">No sample posts available for this trend yet.</p>
        </div>
      )}
    </div>
  );
};

export default TrendDetails;