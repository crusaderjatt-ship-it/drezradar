import React from 'react';
import { Link } from 'react-router-dom';
import { Trend } from '@/lib/types';
import PlatformIcon from './PlatformIcon';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Sparkles } from 'lucide-react';

interface TrendCardProps {
  trend: Trend;
}

const TrendCard: React.FC<TrendCardProps> = ({ trend }) => {
  const cardColors: { [key: string]: string } = {
    TikTok: 'bg-pastel-green',
    Instagram: 'bg-pastel-pink',
    Pinterest: 'bg-pastel-purple',
    X: 'bg-gray-200', // A neutral color for X
    All: 'bg-pastel-purple',
  };

  const bgColor = cardColors[trend.platform] || 'bg-gray-100';

  return (
    <Link to={`/trend/${trend.platform.toLowerCase()}/${encodeURIComponent(trend.dress_type)}`}>
      <Card className={`overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ${bgColor} text-charcoal`}>
        <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <PlatformIcon platform={trend.platform} className="h-6 w-6" />
            {trend.dress_type}
          </CardTitle>
          <Badge className="bg-charcoal text-white px-3 py-1 rounded-full text-sm">
            Score: {trend.score.toFixed(1)}
          </Badge>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="grid grid-cols-3 gap-2">
            {trend.sample_posts.slice(0, 3).map((post, index) => (
              <AspectRatio key={index} ratio={3 / 4} className="bg-muted rounded-md overflow-hidden">
                <img
                  src={post.image_url}
                  alt={`${trend.dress_type} sample post ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </AspectRatio>
            ))}
            {trend.sample_posts.length === 0 && (
              <div className="col-span-3 flex items-center justify-center h-32 bg-muted rounded-md text-muted-foreground">
                No sample posts
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 text-sm text-gray-600">
          <div className="flex flex-wrap gap-2">
            {trend.hashtags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="bg-charcoal/10 text-charcoal">
                {tag}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default TrendCard;