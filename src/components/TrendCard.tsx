import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Image } from 'lucide-react'; // Using a generic icon for now

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
  TikTok: <img src="/public/tiktok.svg" alt="TikTok" className="h-5 w-5" />,
  Instagram: <img src="/public/instagram.svg" alt="Instagram" className="h-5 w-5" />,
  Pinterest: <img src="/public/pinterest.svg" alt="Pinterest" className="h-5 w-5" />,
  X: <img src="/public/x.svg" alt="X" className="h-5 w-5" />,
  All: <Sparkles className="h-5 w-5 text-yellow-500" />, // Generic icon for 'All'
};

const TrendCard: React.FC<TrendCardProps> = ({ platform, dress_type, score, sample_posts }) => {
  const cardBackgroundColor = {
    TikTok: 'bg-drez-pastel-pink',
    Instagram: 'bg-drez-pastel-purple',
    Pinterest: 'bg-drez-pastel-green',
    X: 'bg-white', // Using white for X for contrast
    All: 'bg-white',
  }[platform] || 'bg-white';

  return (
    <Link to={`/trend/${platform.toLowerCase()}/${dress_type.toLowerCase().replace(/\s+/g, '-')}`}>
      <Card className={`w-full overflow-hidden shadow-lg transition-transform duration-200 hover:scale-[1.02] ${cardBackgroundColor}`}>
        <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
          <CardTitle className="text-lg font-semibold text-drez-charcoal capitalize">
            {dress_type}
          </CardTitle>
          <div className="flex items-center space-x-2">
            {platformIcons[platform] || <Image className="h-5 w-5 text-gray-500" />}
            <Badge variant="secondary" className="bg-drez-charcoal text-white">Score: {score.toFixed(1)}</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
            {sample_posts.slice(0, 3).map((post, index) => (
              <div key={index} className="relative w-full aspect-square rounded-md overflow-hidden bg-gray-200">
                <img
                  src={post.image_url}
                  alt={`Sample post for ${dress_type}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            ))}
            {sample_posts.length === 0 && (
              <div className="w-full aspect-square rounded-md bg-gray-200 flex items-center justify-center text-gray-500">
                No images
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default TrendCard;