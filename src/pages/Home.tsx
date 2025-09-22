import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { fetchFashionNews } from "@/lib/newsapi"; // Import the news API utility
import { ThemeToggle } from "@/components/ThemeToggle"; // Import ThemeToggle

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  source: {
    name: string;
  };
  publishedAt: string;
}

const fashionCategories = [
  { name: "All Fashion", query: "fashion" },
  { name: "Gen Z Trending", query: "gen z fashion trends" },
  { name: "Fast Fashion", query: "fast fashion industry" },
  { name: "Royal Classics", query: "royal family fashion" },
  { name: "Traditional", query: "traditional ethnic fashion" },
];

const Home = () => {
  const [fashionNews, setFashionNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(fashionCategories[0].name);

  useEffect(() => {
    const getFashionNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const selectedCategory = fashionCategories.find(cat => cat.name === activeTab);
        const news = await fetchFashionNews(selectedCategory?.query || "fashion", 12);
        setFashionNews(news);
      } catch (err) {
        setError("Failed to load fashion news. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getFashionNews();
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <header className="flex items-center justify-between mb-8"> {/* Adjusted header for toggle */}
        <div className="flex-grow flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">DrezRadar News</h1>
          <p className="text-lg text-charcoal-light text-center max-w-2xl">
            Stay updated with the latest in fashion from around the globe.
          </p>
        </div>
        <ThemeToggle /> {/* Add ThemeToggle here */}
      </header>

      <Tabs defaultValue={fashionCategories[0].name} className="w-full max-w-6xl mx-auto" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 bg-muted p-1 rounded-lg mb-8 h-auto">
          {fashionCategories.map((category) => (
            <TabsTrigger key={category.name} value={category.name} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md text-charcoal-light py-2">
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {fashionCategories.map((category) => (
          <TabsContent key={category.name} value={category.name}>
            {loading ? (
              <div className="text-center text-charcoal-light">Loading news...</div>
            ) : error ? (
              <div className="text-center text-destructive">{error}</div>
            ) : fashionNews.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {fashionNews.map((article, index) => (
                  <Card key={index} className="bg-card text-card-foreground rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden flex flex-col">
                    {/* JSON-LD Schema Markup for NewsArticle */}
                    <script type="application/ld+json">
                      {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "NewsArticle",
                        "headline": article.title,
                        "image": [
                          article.urlToImage,
                        ],
                        "datePublished": article.publishedAt,
                        "dateModified": article.publishedAt, // Assuming no modification date from API
                        "author": {
                          "@type": "Organization",
                          "name": article.source.name
                        },
                        "publisher": {
                          "@type": "Organization",
                          "name": "DrezRadar News",
                          "logo": {
                            "@type": "ImageObject",
                            "url": "https://www.dyad.sh/favicon.ico" // Placeholder, replace with actual logo URL
                          }
                        },
                        "description": article.description,
                        "mainEntityOfPage": {
                          "@type": "WebPage",
                          "@id": article.url
                        },
                        "url": article.url
                      })}
                    </script>
                    {article.urlToImage && (
                      <img src={article.urlToImage} alt={`Image for ${article.title}`} className="w-full h-48 object-cover" />
                    )}
                    <CardHeader className="flex-grow">
                      <CardTitle className="text-lg font-semibold text-charcoal line-clamp-2">{article.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{article.source.name} - {new Date(article.publishedAt).toLocaleDateString()}</p>
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
            ) : (
              <div className="text-center text-charcoal-light">No news found for this category.</div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      <MadeWithDyad />
    </div>
  );
};

export default Home;