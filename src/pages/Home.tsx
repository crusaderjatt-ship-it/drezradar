import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Image as ImageIcon } from "lucide-react"; // Renamed to avoid conflict with HTML Image element
import { fetchFashionNews } from "@/lib/newsapi"; // Import the news API utility

// Mock data for demonstration, updated to include a main_image_url
const mockTrends = [
  {
    platform: "TikTok",
    dress_type: "Cottagecore Dress",
    score: 92,
    main_image_url: "https://via.placeholder.com/400x300/F8EAF1/000000?text=Cottagecore",
    sample_posts: [
      { image_url: "https://via.placeholder.com/150/F8EAF1/000000?text=TikTok1", permalink: "#" },
      { image_url: "https://via.placeholder.com/150/F8EAF1/000000?text=TikTok2", permalink: "#" },
    ],
  },
  {
    platform: "Instagram",
    dress_type: "Slip Dress",
    score: 88,
    main_image_url: "https://via.placeholder.com/400x300/EEE8FF/000000?text=Slip+Dress",
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
    main_image_url: "https://via.placeholder.com/400x300/E8FAF2/000000?text=Boho+Maxi",
    sample_posts: [
      { image_url: "https://via.placeholder.com/150/E8FAF2/000000?text=Pin1", permalink: "#" },
    ],
  },
  {
    platform: "X",
    dress_type: "Bodycon Dress",
    score: 60,
    main_image_url: "https://via.placeholder.com/400x300/F8EAF1/000000?text=Bodycon",
    sample_posts: [
      { image_url: "https://via.placeholder.com/150/F8EAF1/000000?text=X1", permalink: "#" },
    ],
  },
  {
    platform: "TikTok",
    dress_type: "Vintage Floral Dress",
    score: 85,
    main_image_url: "https://via.placeholder.com/400x300/EEE8FF/000000?text=Vintage+Floral",
    sample_posts: [
      { image_url: "https://via.placeholder.com/150/EEE8FF/000000?text=TikTok3", permalink: "#" },
      { image_url: "https://via.placeholder.com/150/EEE8FF/000000?text=TikTok4", permalink: "#" },
    ],
  },
  {
    platform: "Instagram",
    dress_type: "A-Line Dress",
    score: 78,
    main_image_url: "https://via.placeholder.com/400x300/E8FAF2/000000?text=A-Line",
    sample_posts: [
      { image_url: "https://via.placeholder.com/150/E8FAF2/000000?text=Insta4", permalink: "#" },
    ],
  },
  {
    platform: "Pinterest",
    dress_type: "Sweater Dress",
    score: 70,
    main_image_url: "https://via.placeholder.com/400x300/F8EAF1/000000?text=Sweater+Dress",
    sample_posts: [
      { image_url: "https://via.placeholder.com/150/F8EAF1/000000?text=Pin2", permalink: "#" },
    ],
  },
  {
    platform: "TikTok",
    dress_type: "Mini Dress",
    score: 90,
    main_image_url: "https://via.placeholder.com/400x300/EEE8FF/000000?text=Mini+Dress",
    sample_posts: [
      { image_url: "https://via.placeholder.com/150/EEE8FF/000000?text=TikTok5", permalink: "#" },
    ],
  },
  {
    platform: "Instagram",
    dress_type: "Cocktail Dress",
    score: 82,
    main_image_url: "https://via.placeholder.com/400x300/E8FAF2/000000?text=Cocktail",
    sample_posts: [
      { image_url: "https://via.placeholder.com/150/E8FAF2/000000?text=Insta5", permalink: "#" },
    ],
  },
  {
    platform: "X",
    dress_type: "Shirt Dress",
    score: 65,
    main_image_url: "https://via.placeholder.com/400x300/F8EAF1/000000?text=Shirt+Dress",
    sample_posts: [
      { image_url: "https://via.placeholder.com/150/F8EAF1/000000?text=X2", permalink: "#" },
    ],
  },
  {
    platform: "TikTok",
    dress_type: "Denim Dress",
    score: 80,
    main_image_url: "https://via.placeholder.com/400x300/EEE8FF/000000?text=Denim+Dress",
    sample_posts: [
      { image_url: "https://via.placeholder.com/150/EEE8FF/000000?text=TikTok6", permalink: "#" },
    ],
  },
  {
    platform: "Pinterest",
    dress_type: "Wrap Dress",
    score: 72,
    main_image_url: "https://via.placeholder.com/400x300/E8FAF2/000000?text=Wrap+Dress",
    sample_posts: [
      { image_url: "https://via.placeholder.com/150/E8FAF2/000000?text=Pin3", permalink: "#" },
    ],
  },
];

const Home = () => {
  const allPlatforms = ["All", "TikTok", "Instagram", "Pinterest", "X"];
  const [fashionNews, setFashionNews] = useState<any[]>([]);

  useEffect(() => {
    const getFashionNews = async () => {
      const news = await fetchFashionNews();
      setFashionNews(news);
    };
    getFashionNews();
  }, []);

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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {(platform === "All"
                ? mockTrends
                : mockTrends.filter((trend) => trend.platform === platform)
              ).slice(0, 10).map((trend, index) => ( // Apply slice(0, 10) here
                <Link
                  key={index}
                  to={`/trend/${trend.platform.toLowerCase()}/${trend.dress_type.toLowerCase().replace(/\s/g, '-')}`}
                  className="block"
                >
                  <Card className="p-0 bg-card text-card-foreground rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden h-full flex flex-col">
                    <div className="relative w-full h-60 bg-muted flex items-center justify-center">
                      {trend.main_image_url ? (
                        <img
                          src={trend.main_image_url}
                          alt={`${trend.dress_type} trend`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="text-muted-foreground" size={48} />
                      )}
                    </div>
                    <CardContent className="p-4 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h2 className="text-2xl font-bold text-charcoal leading-tight">{trend.dress_type}</h2>
                        <Badge className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-base font-semibold">
                          {trend.score}
                        </Badge>
                      </div>
                      <p className="text-sm text-charcoal-light mb-4">{trend.platform}</p>
                      <Button asChild className="mt-auto w-full bg-pastel-purple text-charcoal hover:bg-pastel-purple/80">
                        <Link to={`/trend/${trend.platform.toLowerCase()}/${trend.dress_type.toLowerCase().replace(/\s/g, '-')}`}>
                          View Details
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <section className="mt-12 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-charcoal mb-6 text-center">Latest Fashion News</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fashionNews.map((article, index) => (
            <Card key={index} className="bg-card text-card-foreground rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden">
              {article.urlToImage && (
                <img src={article.urlToImage} alt={article.title} className="w-full h-48 object-cover" />
              )}
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-charcoal line-clamp-2">{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-charcoal-light line-clamp-3 mb-3">{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-primary text-sm hover:underline">
                  Read More
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <MadeWithDyad />
    </div>
  );
};

export default Home;