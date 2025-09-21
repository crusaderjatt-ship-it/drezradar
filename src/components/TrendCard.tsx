import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PlatformIcon from "./PlatformIcon";
import { Trend } from "@/types/drezradar";
import { cn } from "@/lib/utils";

interface TrendCardProps {
  trend: Trend;
  className?: string;
}

const TrendCard: React.FC<TrendCardProps> = ({ trend, className }) => {
  const cardColors: Record<Trend["platform"], string> = {
    TikTok: "bg-drez-pastel-pink",
    Instagram: "bg-drez-pastel-purple",
    Pinterest: "bg-drez-pastel-green",
    X: "bg-drez-pastel-pink", // Reusing pink for X
    All: "bg-gray-100",
  };

  const backgroundColor = cardColors[trend.platform] || "bg-gray-100";

  return (
    <Link to={`/trend/${trend.platform}/${trend.dress_type.replace(/\s+/g, '-')}`}>
      <Card className={cn("overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full flex flex-col", backgroundColor, className)}>
        <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold text-drez-charcoal flex items-center gap-2">
            <PlatformIcon platform={trend.platform} size={20} />
            {trend.dress_type}
          </CardTitle>
          <Badge variant="secondary" className="bg-white text-drez-charcoal px-3 py-1 rounded-full text-sm font-medium">
            Score: {trend.score.toFixed(1)}
          </Badge>
        </CardHeader>
        <CardContent className="p-4 pt-0 flex-grow">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {trend.sample_posts.slice(0, 3).map((post, index) => (
              <div key={index} className="relative w-full aspect-[3/4] overflow-hidden rounded-md">
                <img
                  src={post.image_url}
                  alt={`Sample post for ${trend.dress_type}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 text-sm text-gray-600 dark:text-gray-400">
          <p className="truncate">#{trend.hashtags.join(" #")}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default TrendCard;