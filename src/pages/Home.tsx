import React from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Image } from "lucide-react"; // Using a generic image icon for now

// Mock data for demonstration
const mockTrends = [
  {
    platform: "TikTok",
    dress_type: "Cottagecore Dress",
    score: 92,
    sample_posts: [
      { image_url: "https://via.placeholder.com/150/F8EAF1/000000?text=TikTok1", permalink: "#" },
      { image_url: "https://via.placeholder.com/150/F8EAF1/000000?text=TikTok2", permalink: "#" },
    ],
  },
  {
    platform: "Instagram",
    dress_type: "Slip Dress",
    score: 88,
    sample_posts: [
      { image_url: "https://via.placeholder.com/150/EEE8FF/000000?text=Insta1", permalink: "#" },
      { image_url: "https://via.placeholder.com/150/EEE8FF/000000?text=Insta2", permalink: "#" },
      { image_url: "https://via.placeholder.com/150/EEE8FF/000000?text=Insta3", permalink: "#" },
    ],
  },
  {
    platform: "Pinterest",
    dress_type: "Boho Maxi Dress",
    score: 75,
    sample_posts: [
      { image_url: "https://via.placeholder.com/150/E8FAF2/000000?text=Pin1", permalink: "#" },
    ],
  },
  {
    platform: "X",
    dress_type: "Bodycon Dress",
    score: 60,
    sample_posts: [
      { image_url: "https://via.placeholder.com/150/F8EAF1/000000?text=X1", permalink: "#" },
    ],
  },
  {
    platform: "TikTok",
    dress_type: "Vintage Floral Dress",
    score: 85,
    sample_posts: [
      { image_url: "https://via.placeholder.com/150/EEE8FF/000000?text=TikTok3", permalink: "#" },
      { image_url: "https://via.placeholder.com/150/EEE8FF/000000?text=TikTok4", permalink: "#" },
    ],
  },
];

const Home = () => {
  const allPlatforms = ["All", "TikTok", "Instagram", "Pinterest", "X"];

  const getRandomTrend = () => {
    const randomIndex = Math.floor(Math.random() * mockTrends.length);
    const randomTrend = mockTrends[randomIndex];
    alert(`Spin the Radar! You got: ${randomTrend.dress_type} on ${randomTrend.platform}`);
    // In a real app, you might navigate to the trend details page
    // navigate(`/trend/${randomTrend.platform.toLowerCase()}/${randomTrend.dress_type.toLowerCase().replace(/\s/g, '-')}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <header className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">DrezRadar</h1>
        <p className="text-lg text-charcoal-light text-center max-w-2xl">
          Discover the hottest dress trends sweeping TikTok, Instagram, Pinterest, and X right now.
        </p>
        <Button
          onClick={getRandomTrend}
          className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-full shadow-lg text-lg"
        >
          Spin the Radar 🎡
        </Button>
      </header>

      <Tabs defaultValue="All" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-5 bg-muted p-1 rounded-lg mb-8">
          {allPlatforms.map((platform) => (
            <TabsTrigger key={platform} value={platform} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md text-charcoal-light">
              {platform}
            </TabsTrigger>
          ))}
        </TabsList>

        {allPlatforms.map((platform) => (
          <TabsContent key={platform} value={platform}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(platform === "All"
                ? mockTrends
                : mockTrends.filter((trend) => trend.platform === platform)
              ).map((trend, index) => (
                <Link
                  key={index}
                  to={`/trend/${trend.platform.toLowerCase()}/${trend.dress_type.toLowerCase().replace(/\s/g, '-')}`}
                  className="block"
                >
                  <Card className="p-4 bg-card text-card-foreground rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-3">
                      <h2 className="text-xl font-semibold text-charcoal">{trend.dress_type}</h2>
                      <Badge className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
                        Score: {trend.score}
                      </Badge>
                    </div>
                    <p className="text-sm text-charcoal-light mb-4">{trend.platform}</p>
                    <div className="grid grid-cols-3 gap-2 mt-auto">
                      {trend.sample_posts.slice(0, 3).map((post, postIndex) => (
                        <div key={postIndex} className="w-full h-24 bg-muted rounded-md overflow-hidden flex items-center justify-center">
                          {post.image_url ? (
                            <img
                              src={post.image_url}
                              alt={`${trend.dress_type} sample post`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Image className="text-muted-foreground" size={32} />
                          )}
                        </div>
                      ))}
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      <MadeWithDyad />
    </div>
  );
};

export default Home;