import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockTrends, mockTrendPosts } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import PlatformIcon from '@/components/PlatformIcon';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Share2 } from 'lucide-react';
import Layout from '@/components/Layout';
import { toast } from 'sonner';

const TrendDetailsPage = () => {
  const { platform, dress_type } = useParams<{ platform: string; dress_type: string }>();

  const decodedDressType = decodeURIComponent(dress_type || '');

  const trend = useMemo(() => {
    return mockTrends.find(
      t => t.platform.toLowerCase() === platform?.toLowerCase() && t.dress_type === decodedDressType
    );
  }, [platform, decodedDressType]);

  const trendPosts = useMemo(() => {
    return mockTrendPosts.filter(
      post => post.platform.toLowerCase() === platform?.toLowerCase() && post.dress_type === decodedDressType
    );
  }, [platform, decodedDressType]);

  if (!trend) {
    return (
      <Layout>
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-charcoal">Trend Not Found</h2>
          <p className="text-gray-600 mt-2">The trend you are looking for does not exist.</p>
          <Button asChild className="mt-4 bg-pastel-purple hover:bg-pastel-purple/80 text-white">
            <Link to="/">Go to Home</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `DrezRadar: ${trend.dress_type} on ${trend.platform}`,
        text: `Check out the viral ${trend.dress_type} trend on ${trend.platform}!`,
        url: window.location.href,
      })
      .then(() => toast.success('Trend shared successfully!'))
      .catch((error) => toast.error(`Failed to share: ${error.message}`));
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => toast.success('Link copied to clipboard!'))
        .catch(() => toast.error('Failed to copy link.'));
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" asChild className="text-charcoal hover:text-charcoal/80">
            <Link to="/">
              <ArrowLeft className="h-5 w-5 mr-2" /> Back to Home
            </Link>
          </Button>
          <Button onClick={handleShare} className="bg-pastel-green hover:bg-pastel-green/80 text-charcoal flex items-center gap-2">
            <Share2 className="h-4 w-4" /> Share
          </Button>
        </div>

        <Card className="bg-pastel-purple text-charcoal shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-3xl font-bold flex items-center gap-3">
              <PlatformIcon platform={trend.platform} className="h-8 w-8" />
              {trend.dress_type}
            </CardTitle>
            <Badge className="bg-charcoal text-white px-4 py-2 rounded-full text-lg">
              Score: {trend.score.toFixed(1)}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg">
              Platform: <span className="font-semibold">{trend.platform}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {trend.hashtags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="bg-charcoal/10 text-charcoal text-md">
                  {tag}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-gray-700">Last updated: {new Date(trend.updated_at).toLocaleString()}</p>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold text-charcoal mt-8">Sample Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {trendPosts.length > 0 ? (
            trendPosts.map((post, index) => (
              <Card key={index} className="bg-white text-charcoal shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <AspectRatio ratio={3 / 4} className="bg-muted rounded-t-md overflow-hidden">
                    <img
                      src={post.image_url}
                      alt={post.caption}
                      className="h-full w-full object-cover"
                    />
                  </AspectRatio>
                  <div className="p-4">
                    <p className="text-sm font-medium line-clamp-2">{post.caption}</p>
                    <a
                      href={post.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline text-xs mt-2 block"
                    >
                      View Post
                    </a>
                    <div className="flex flex-wrap gap-1 text-xs text-gray-500 mt-2">
                      {Object.entries(post.metrics).map(([key, value]) => (
                        <span key={key} className="capitalize">
                          {key}: {value}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">No sample posts available for this trend.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default TrendDetailsPage;