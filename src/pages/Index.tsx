import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TrendCard from '@/components/TrendCard';
import SpinRadarButton from '@/components/SpinRadarButton';
import { MadeWithDyad } from "@/components/made-with-dyad"; // Keep this if needed, but Layout already includes it.
import { Helmet } from 'react-helmet-async'; // For SEO

// Mock data for demonstration
const mockTrends = [
  {
    platform: 'TikTok',
    dress_type: 'Cottagecore Dress',
    score: 9.2,
    sample_posts: [
      { image_url: '/public/placeholder.svg', permalink: '#' },
      { image_url: '/public/placeholder.svg', permalink: '#' },
      { image_url: '/public/placeholder.svg', permalink: '#' },
    ],
  },
  {
    platform: 'Instagram',
    dress_type: 'Slip Dress',
    score: 8.8,
    sample_posts: [
      { image_url: '/public/placeholder.svg', permalink: '#' },
      { image_url: '/public/placeholder.svg', permalink: '#' },
    ],
  },
  {
    platform: 'Pinterest',
    dress_type: 'Boho Maxi Dress',
    score: 7.5,
    sample_posts: [
      { image_url: '/public/placeholder.svg', permalink: '#' },
    ],
  },
  {
    platform: 'X',
    dress_type: 'Bodycon Dress',
    score: 6.1,
    sample_posts: [
      { image_url: '/public/placeholder.svg', permalink: '#' },
      { image_url: '/public/placeholder.svg', permalink: '#' },
      { image_url: '/public/placeholder.svg', permalink: '#' },
    ],
  },
  {
    platform: 'TikTok',
    dress_type: 'Vintage Floral Dress',
    score: 8.5,
    sample_posts: [
      { image_url: '/public/placeholder.svg', permalink: '#' },
      { image_url: '/public/placeholder.svg', permalink: '#' },
    ],
  },
  {
    platform: 'Instagram',
    dress_type: 'Linen Sundress',
    score: 7.9,
    sample_posts: [
      { image_url: '/public/placeholder.svg', permalink: '#' },
    ],
  },
  {
    platform: 'Pinterest',
    dress_type: 'A-line Skirt Dress',
    score: 7.0,
    sample_posts: [
      { image_url: '/public/placeholder.svg', permalink: '#' },
      { image_url: '/public/placeholder.svg', permalink: '#' },
      { image_url: '/public/placeholder.svg', permalink: '#' },
    ],
  },
  {
    platform: 'X',
    dress_type: 'Mini Dress',
    score: 6.8,
    sample_posts: [
      { image_url: '/public/placeholder.svg', permalink: '#' },
    ],
  },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('all');

  const filteredTrends = activeTab === 'all'
    ? mockTrends
    : mockTrends.filter(trend => trend.platform.toLowerCase() === activeTab);

  return (
    <>
      <Helmet>
        <title>DrezRadar - Viral Dress Trends</title>
        <meta name="description" content="Discover the hottest viral dress trends on TikTok, Instagram, Pinterest, and X with DrezRadar." />
        <meta property="og:title" content="DrezRadar - Viral Dress Trends" />
        <meta property="og:description" content="Discover the hottest viral dress trends on TikTok, Instagram, Pinterest, and X with DrezRadar." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        {/* Add more meta tags as needed, e.g., og:image */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": [
                ${mockTrends.map((trend, index) => `
                  {
                    "@type": "ListItem",
                    "position": ${index + 1},
                    "item": {
                      "@type": "Thing",
                      "name": "${trend.dress_type} on ${trend.platform}",
                      "url": "/trend/${trend.platform.toLowerCase()}/${trend.dress_type.toLowerCase().replace(/\s+/g, '-')}"
                    }
                  }
                `).join(',')}
              ]
            }
          `}
        </script>
      </Helmet>

      <div className="flex flex-col items-center justify-center text-center mb-8">
        <h1 className="text-5xl font-extrabold mb-4 text-charcoal">DrezRadar</h1>
        <p className="text-xl text-gray-700 mb-6 max-w-2xl">
          Your go-to source for the latest viral dress trends across TikTok, Instagram, Pinterest, and X.
        </p>
        <SpinRadarButton trends={mockTrends} />
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 bg-pastel-lavender text-charcoal">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="tiktok">TikTok</TabsTrigger>
          <TabsTrigger value="instagram">Instagram</TabsTrigger>
          <TabsTrigger value="pinterest">Pinterest</TabsTrigger>
          <TabsTrigger value="x">X</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTrends.map((trend, index) => (
              <TrendCard key={index} {...trend} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="tiktok" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTrends.map((trend, index) => (
              <TrendCard key={index} {...trend} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="instagram" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTrends.map((trend, index) => (
              <TrendCard key={index} {...trend} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="pinterest" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTrends.map((trend, index) => (
              <TrendCard key={index} {...trend} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="x" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTrends.map((trend, index) => (
              <TrendCard key={index} {...trend} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Index;