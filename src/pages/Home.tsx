import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchFashionNews } from "@/lib/newsapi";
import { Helmet } from "react-helmet-async"; // Import Helmet
import Header from "@/components/Header"; // Import the new Header component

// Updated interface to match Supabase 'news_articles' table schema
interface Article {
  title: string;
  description: string;
  url: string;
  image_url: string;
  source_name: string;
  published_at: string;
  category: string;
}

const fashionCategories = [
  { name: "Gen Z Trending" },
  { name: "Fast Fashion" },
  { name: "Royal Classics" },
  { name: "Traditional" },
  { name: "All Fashion" },
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
        const news = await fetchFashionNews(activeTab, 20);
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

  // Effect to push AdSense ads after component mounts
  useEffect(() => {
    try {
      // Check if adsbygoogle is defined before pushing
      if (window.adsbygoogle && process.env.NODE_ENV === 'production') {
        (window.adsbygoogle as any[]).push({});
      }
    } catch (e) {
      console.error("Adsense script failed to load:", e);
    }
  }, []);

  const pageTitle = activeTab === "All Fashion"
    ? "DrezRadar News: Top Fashion Trends & Global Updates"
    : `${activeTab} Fashion News | DrezRadar`;
  const pageDescription = "Stay updated with the latest fashion news, trends, and insights from around the globe, including Gen Z, Fast Fashion, Royal Classics, and Traditional styles. Your go-to source for all things fashion.";


  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={`https://drezradar.com/${activeTab === "All Fashion" ? "" : `?category=${encodeURIComponent(activeTab)}`}`} />
      </Helmet>
      <Header />

      {/* Google AdSense Ad Unit Placeholder - REPLACE YOUR_ADSENSE_AD_SLOT_ID with your actual ID */}
      <div className="my-8 text-center">
        <ins className="adsbygoogle"
             style={{ display: "block" }}
             data-ad-client="ca-pub-7039562928200716"
             data-ad-slot="4536248322"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>

      <Tabs defaultValue={fashionCategories[0].name} className="w-full max-w-6xl mx-auto px-4 md:px-8 py-4 md:py-8" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 bg-muted p-1 rounded-lg mb-8 h-auto">
          {fashionCategories.map((category) => (
            <TabsTrigger
              key={category.name}
              value={category.name}
              className="rounded-md py-2 transition-all duration-300 ease-in-out
                         text-charcoal-light hover:text-white
                         hover:scale-[1.02] hover:shadow-md
                         hover:bg-gradient-to-br hover:from-gray-800 hover:to-gray-700
                         data-[state=active]:bg-primary data-[state=active]:text-primary-foreground
                         data-[state=active]:hover:bg-primary/90 data-[state=active]:hover:text-primary-foreground"
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Corrected TabsContent usage */}
        <TabsContent value={activeTab}>
            {loading ? (
              <div className="text-center text-charcoal-light">Loading news...</div>
            ) : error ? (
              <div className="text-center text-destructive">{error}</div>
            ) : fashionNews.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {fashionNews.map((article, index) => (
                  <Card
                    key={index}
                    className="bg-card text-card-foreground rounded-lg shadow-md
                               transition-all duration-300 ease-in-out
                               hover:shadow-xl hover:scale-[1.02]
                               hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100
                               dark:hover:from-gray-800 dark:hover:to-gray-700
                               hover:border-2 hover:border-primary
                               overflow-hidden flex flex-col"
                  >
                    {/* JSON-LD Schema Markup for NewsArticle */}
                    <script type="application/ld+json">
                      {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "NewsArticle",
                        "headline": article.title,
                        "image": [
                          article.image_url,
                        ],
                        "datePublished": article.published_at,
                        "dateModified": article.published_at,
                        "author": {
                          "@type": "Organization",
                          "name": article.source_name
                        },
                        "publisher": {
                          "@type": "Organization",
                          "name": "DrezRadar News",
                          "logo": {
                            "@type": "ImageObject",
                            "url": "https://www.dyad.sh/favicon.ico"
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
                    {article.image_url && (
                      <img src={article.image_url} alt={`Image for ${article.title}`} className="w-full h-48 object-cover" />
                    )}
                    <CardHeader className="flex-grow">
                      <CardTitle className="text-lg font-semibold text-charcoal line-clamp-2">{article.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{article.source_name} - {new Date(article.published_at).toLocaleDateString()}</p>
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
      </Tabs>
    </div>
  );
};

export default Home;