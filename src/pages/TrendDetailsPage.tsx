import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const TrendDetailsPage: React.FC = () => {
  const { platform, dress_type } = useParams<{ platform: string; dress_type: string }>();

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-drez-charcoal">
      <Button variant="ghost" asChild className="mb-4 text-drez-charcoal hover:text-drez-charcoal/80">
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
      </Button>
      <h1 className="text-3xl font-bold mb-4 capitalize">
        {dress_type?.replace(/-/g, ' ')} Trends on {platform}
      </h1>
      <p className="text-lg mb-6">
        This page will show a grid of sample posts and more details about the "{dress_type?.replace(/-/g, ' ')}" trend on {platform}.
      </p>

      {/* Placeholder for grid of sample posts */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-square bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
            <span className="text-sm">Post {i + 1}</span>
          </div>
        ))}
      </div>

      {/* Placeholder for social share buttons */}
      <div className="mt-8 text-center">
        <p className="text-md text-drez-charcoal/70">Share this trend:</p>
        <div className="flex justify-center space-x-4 mt-2">
          <Button variant="outline" className="bg-drez-pastel-pink text-drez-charcoal hover:bg-drez-pastel-pink/80">Share on X</Button>
          <Button variant="outline" className="bg-drez-pastel-purple text-drez-charcoal hover:bg-drez-pastel-purple/80">Share on Instagram</Button>
        </div>
      </div>
    </div>
  );
};

export default TrendDetailsPage;