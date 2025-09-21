import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import TrendCard from '@/components/TrendCard';
import { Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { MadeWithDyad } from '@/components/made-with-dyad';

// Mock Data for demonstration
const mockTrends = {
  All: [
    { platform: 'TikTok', dress_type: 'Floral Maxi', score: 8.5, sample_posts: [{ image_url: 'https://picsum.photos/id/1018/300/300', permalink: '#' }, { image_url: 'https://picsum.photos/id/1015/300/300', permalink: '#' }] },
    { platform: 'Instagram', dress_type: 'Bodycon Mini', score: 7.9, sample_posts: [{ image_url: 'https://picsum.photos/id/1016/300/300', permalink: '#' }, { image_url: 'https://picsum.photos/id/1019/300/300', permalink: '#' }] },
    { platform: 'Pinterest', dress_type: 'Cottagecore Midi', score: 9.1, sample_posts: [{ image_url: 'https://picsum.photos/id/1020/300/300', permalink: '#' }, { image_url: 'https://picsum.photos/id/1021/300/300', permalink: '#' }, { image_url: 'https://picsum.photos/id/1022/300/300', permalink: '#' }] },
    { platform: 'X', dress_type: 'Vintage Slip', score: 6.8, sample_posts: [{ image_url: 'https://picsum.photos/id/1023/300/300', permalink: '#' }] },
    { platform: 'TikTok', dress_type: 'Denim Jumpsuit', score: 8.2, sample_posts: [{ image_url: 'https://picsum.photos/id/1024/300/300', permalink: '#' }, { image_url: 'https://picsum.photos/id/1025/300/300', permalink: '#' }] },
  ],
  TikTok: [
    { platform: 'TikTok', dress_type: 'Floral Maxi', score: 8.5, sample_posts: [{ image_url: 'https://picsum.photos/id/1018/300/300', permalink: '#' }, { image_url: 'https://picsum.photos/id/1015/300/300', permalink: '#' }] },
    { platform: 'TikTok', dress_type: 'Denim Jumpsuit', score: 8.2, sample_posts: [{ image_url: 'https://picsum.photos/id/1024/300/300', permalink: '#' }, { image_url: 'https://picsum.photos/id/1025/300/300', permalink: '#' }] },
    { platform: 'TikTok', dress_type: 'Ruffle Mini', score: 7.5, sample_posts: [{ image_url: 'https://picsum.photos/id/1026/300/300', permalink: '#' }] },
  ],
  Instagram: [
    { platform: 'Instagram', dress_type: 'Bodycon Mini', score: 7.9, sample_posts: [{ image_url: 'https://picsum.photos/id/1016/300/300', permalink: '#' }, { image_url: 'https://picsum.photos/id/1019/300/300', permalink: '#' }] },
    { platform: 'Instagram', dress_type: 'Boho Sundress', score: 8.8, sample_posts: [{ image_url: 'https://picsum.photos/id/1027/300/300', permalink: '#' }, { image_url: 'https://picsum.photos/id/1028/300/300', permalink: '#' }] },
  ],
  Pinterest: [
    { platform: 'Pinterest', dress_type: 'Cottagecore Midi', score: 9.1, sample_posts: [{ image_url: 'https://picsum.photos/id/1020/300/300', permalink: '#' }, { image_url: 'https://picsum.photos/id/1021/300/300', permalink: '#' }, { image_url: 'https://picsum.photos/id/1022/300/300', permalink: '#' }] },
    { platform: 'Pinterest', dress_type: 'Linen Shift', score: 7.2, sample_posts: [{ image_url: 'https://picsum.photos/id/1029/300/300', permalink: '#' }] },
  ],
  X: [
    { platform: 'X', dress_type: 'Vintage Slip', score: 6.8, sample_posts: [{ image_url: 'https://picsum.photos/id/1023/300/300', permalink: '#' }] },
    { platform: 'X', dress_type: 'Gothic Gown', score: 6.5, sample_posts: [{ image_url: 'https://picsum.photos/id/1030/300/300', permalink: '#' }] },
  ],
};

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');

  const handleSpinTheRadar = () => {
    const allTrends = Object.values(mockTrends).flat();
    if (allTrends.length > 0) {
      const randomIndex = Math.floor(Math.random() * allTrends.length);
      const randomTrend = allTrends[randomIndex];
      toast.info(`Spinning the Radar! You got: ${randomTrend.dress_type} on ${randomTrend.platform}`);
      // In a real app, you might navigate to the trend details page
      // navigate(`/trend/${randomTrend.platform.toLowerCase()}/${randomTrend.dress_type.toLowerCase().replace(/\s+/g, '-')}`);
    } else {
      toast.error("No trends available to spin the radar!");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-center text-drez-charcoal">DrezRadar</h1>
      <p className="text-lg text-center text-drez-charcoal/80">
        Discover what's viral in fashion across social media!
      </p>

      <div className="flex justify-center">
        <Button
          onClick={handleSpinTheRadar}
          className="bg-drez-pastel-purple text-drez-charcoal hover:bg-drez-pastel-purple/80 shadow-md"
        >
          <Sparkles className="mr-2 h-5 w-5" /> Spin the Radar 🎡
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-drez-pastel-green/50">
          {Object.keys(mockTrends).map((platform) => (
            <TabsTrigger key={platform} value={platform} className="text-drez-charcoal data-[state=active]:bg-drez-pastel-green data-[state=active]:text-drez-charcoal">
              {platform}
            </TabsTrigger>
          ))}
        </TabsList>
        {Object.entries(mockTrends).map(([platform, trends]) => (
          <TabsContent key={platform} value={platform} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trends.map((trend, index) => (
                <TrendCard key={index} {...trend} />
              ))}
            </div>
            {trends.length === 0 && (
              <p className="text-center text-drez-charcoal/70 mt-8">No trends found for {platform}.</p>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default HomePage;