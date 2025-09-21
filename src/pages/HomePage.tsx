import React, { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import TrendCard from '@/components/TrendCard';
import { mockTrends } from '@/lib/mock-data';
import { Trend } from '@/lib/types';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState<'All' | 'TikTok' | 'Instagram' | 'Pinterest' | 'X'>('All');

  const filteredTrends = useMemo(() => {
    if (activeTab === 'All') {
      return mockTrends;
    }
    return mockTrends.filter(trend => trend.platform === activeTab);
  }, [activeTab]);

  const handleSpinTheRadar = () => {
    if (mockTrends.length > 0) {
      const randomIndex = Math.floor(Math.random() * mockTrends.length);
      const randomTrend = mockTrends[randomIndex];
      window.location.href = `/trend/${randomTrend.platform.toLowerCase()}/${encodeURIComponent(randomTrend.dress_type)}`;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-4xl font-bold text-charcoal">DrezRadar Trends</h1>
          <Button onClick={handleSpinTheRadar} className="bg-pastel-green hover:bg-pastel-green/80 text-charcoal font-bold py-2 px-4 rounded-full shadow-md flex items-center gap-2">
            <Sparkles className="h-5 w-5" /> Spin the Radar 🎡
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-pastel-purple/50 text-charcoal">
            <TabsTrigger value="All" className="data-[state=active]:bg-pastel-purple data-[state=active]:text-white">All</TabsTrigger>
            <TabsTrigger value="TikTok" className="data-[state=active]:bg-pastel-purple data-[state=active]:text-white">TikTok</TabsTrigger>
            <TabsTrigger value="Instagram" className="data-[state=active]:bg-pastel-purple data-[state=active]:text-white">Instagram</TabsTrigger>
            <TabsTrigger value="Pinterest" className="data-[state=active]:bg-pastel-purple data-[state=active]:text-white">Pinterest</TabsTrigger>
            <TabsTrigger value="X" className="data-[state=active]:bg-pastel-purple data-[state=active]:text-white">X</TabsTrigger>
          </TabsList>
          {['All', 'TikTok', 'Instagram', 'Pinterest', 'X'].map(platform => (
            <TabsContent key={platform} value={platform} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTrends.map((trend, index) => (
                  <TrendCard key={index} trend={trend} />
                ))}
                {filteredTrends.length === 0 && (
                  <p className="col-span-full text-center text-gray-600">No trends found for {platform}.</p>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
};

export default HomePage;