import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrendCard from "@/components/TrendCard";
import SpinRadarButton from "@/components/SpinRadarButton";
import { getMockTrends } from "@/lib/mock-data";
import { Platform, Trend } from "@/types/drezradar";
import { MadeWithDyad } from "@/components/made-with-dyad"; // Keep MadeWithDyad for the main page

const platforms: Platform[] = ["All", "TikTok", "Instagram", "Pinterest", "X"];

const Home: React.FC = () => {
  const [activePlatform, setActivePlatform] = React.useState<Platform>("All");
  const [trends, setTrends] = React.useState<Trend[]>([]);

  React.useEffect(() => {
    // In a real app, this would fetch data from Supabase based on activePlatform
    setTrends(getMockTrends(activePlatform));
  }, [activePlatform]);

  return (
    <div className="space-y-8 p-4 md:p-8 lg:p-12">
      <h1 className="text-5xl font-extrabold text-center text-drez-charcoal mb-8 leading-tight">
        DrezRadar
        <span className="block text-xl font-medium text-gray-600 mt-2">
          Your daily dose of viral dress trends.
        </span>
      </h1>

      <div className="flex justify-center mb-8">
        <SpinRadarButton />
      </div>

      <Tabs value={activePlatform} onValueChange={(value) => setActivePlatform(value as Platform)} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-drez-pastel-purple/30">
          {platforms.map((platform) => (
            <TabsTrigger key={platform} value={platform} className="text-drez-charcoal data-[state=active]:bg-drez-pastel-purple data-[state=active]:text-drez-charcoal">
              {platform}
            </TabsTrigger>
          ))}
        </TabsList>
        {platforms.map((platform) => (
          <TabsContent key={platform} value={platform} className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {trends.map((trend) => (
                <TrendCard key={`${trend.platform}-${trend.dress_type}`} trend={trend} />
              ))}
            </div>
            {trends.length === 0 && (
              <p className="text-center text-gray-500 mt-8">No trends found for {platform}.</p>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Home;