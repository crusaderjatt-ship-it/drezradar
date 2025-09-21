import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Image } from 'lucide-react';

interface SamplePost {
  image_url: string;
  permalink: string;
}

interface TrendCardProps {
  platform: string;
  dress_type: string;
  score: number;
  sample_posts: SamplePost[];
}

const platformIcons: { [key: string]: React.ReactNode } = {
  TikTok: <img src="/public/tiktok.svg" alt="TikTok" className="h-4 w-4 inline-block mr-1" />,
  Instagram: <img src="/public/instagram.svg" alt="Instagram" className="h-4 w-4 inline-block mr-1" />,
  Pinterest: <img src="/public/pinterest.svg" alt="Pinterest" className="h-4 w-4 inline-block mr-1" />,
  X: <img src="/public/x.svg" alt="X" className="h-4 w-4 inline-block mr-1" />,
  All: <Sparkles className="h-4 w-4 inline-block mr-1" />, // Placeholder for 'All'
};

const TrendCard: React.FC<TrendCardProps> = ({ platform, dress_type, score, sample_posts }) => {
  const displayPlatform = platform === 'All' ? 'All Platforms' : platform;
  const platformIcon = platformIcons[platform] || <Image className="h-4 w-4 inline-block mr-1" />;

  return (
    <Link to={`/trend/${platform.toLowerCase()}/${dress_type.toLowerCase().replace(/\s+/g, '-')}`}>
      <Card className="w-full h-full flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg font-semibold text-charcoal flex items-center justify-between">
            <span className="capitalize">{dress_type.replace(/-/g, ' ')}</span>
            <Badge variant="secondary" className="bg-pastel-lavender text-charcoal">
              Score: {score.toFixed(1)}
            </Badge>
          </CardTitle>
          <p className="text-sm text-muted-foreground flex items-center mt-1">
            {platformIcon} {displayPlatform}
          </p>
        </CardHeader>
        <CardContent className="p-4 pt-0 flex-grow">
          {sample_posts && sample_posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
              {sample_posts.slice(0, 3).map((post, index) => (
                <div key={index} className="relative w-full aspect-square overflow-hidden rounded-md bg-gray-100">
                  <img
                    src={post.image_url}
                    alt={`Sample post for ${dress_type}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-24 bg-gray-100 rounded-md text-muted-foreground text-sm mt-2">
              No sample posts available
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default TrendCard;