import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingBag, TrendingUp, Zap } from 'lucide-react';
import { AMAZON_SALE_KEYWORDS } from '@/lib/amazonSaleKeywords';
import { analytics } from '@/lib/analytics';

interface DealProduct {
  id: string;
  name: string;
  category: string;
  keyword: string;
  commission: 'high' | 'medium' | 'low';
  description: string;
  icon: string;
}

// High-commission deal products for Amazon India sale
const FEATURED_DEALS: DealProduct[] = [
  // Beauty & Personal Care (Highest Commission)
  {
    id: '1',
    name: 'Premium Lipstick Collections',
    category: 'Beauty',
    keyword: 'lipstick',
    commission: 'high',
    description: 'Limited edition lipsticks with up to 70% discount on premium brands',
    icon: '💄',
  },
  {
    id: '2',
    name: 'Skincare Essentials Bundle',
    category: 'Beauty',
    keyword: 'skincare',
    commission: 'high',
    description: 'Complete skincare sets: moisturizers, serums, and masks on mega sale',
    icon: '🧴',
  },
  {
    id: '3',
    name: 'Makeup Kits & Palettes',
    category: 'Beauty',
    keyword: 'makeup kit',
    commission: 'high',
    description: 'Professional makeup kits with eyeshadow palettes at unbeatable prices',
    icon: '🎨',
  },
  {
    id: '4',
    name: 'Hair Care Solutions',
    category: 'Beauty',
    keyword: 'hair oil',
    commission: 'high',
    description: 'Shampoos, conditioners, and hair oils from top brands',
    icon: '💇',
  },

  // Fashion & Accessories
  {
    id: '5',
    name: 'Ethnic Wear Collection',
    category: 'Fashion',
    keyword: 'sarees',
    commission: 'medium',
    description: 'Designer sarees, kurtis, and lehengas with massive discounts',
    icon: '👗',
  },
  {
    id: '6',
    name: 'Western Fashion Trends',
    category: 'Fashion',
    keyword: 'dresses',
    commission: 'medium',
    description: 'Latest dresses, tops, and jeans from popular fashion brands',
    icon: '👚',
  },
  {
    id: '7',
    name: 'Premium Footwear Sale',
    category: 'Fashion',
    keyword: 'heels',
    commission: 'medium',
    description: 'Designer heels, sneakers, and casual shoes with up to 60% off',
    icon: '👠',
  },
  {
    id: '8',
    name: 'Luxury Handbags',
    category: 'Fashion',
    keyword: 'handbag',
    commission: 'medium',
    description: 'Premium handbags and clutches from international brands',
    icon: '👜',
  },

  // Home & Kitchen
  {
    id: '9',
    name: 'Home Decor & Bedding',
    category: 'Home',
    keyword: 'bedsheet',
    commission: 'medium',
    description: 'Luxurious bedsheets, pillows, and home decor items',
    icon: '🛏️',
  },
  {
    id: '10',
    name: 'Kitchen Appliances',
    category: 'Kitchen',
    keyword: 'mixer grinder',
    commission: 'medium',
    description: 'Smart kitchen gadgets and cookware with special pricing',
    icon: '🍳',
  },

  // Electronics & Accessories
  {
    id: '11',
    name: 'Tech Accessories Bundle',
    category: 'Electronics',
    keyword: 'headphones',
    commission: 'low',
    description: 'Premium headphones, earbuds, and audio equipment',
    icon: '🎧',
  },
  {
    id: '12',
    name: 'Smart Gadgets Collection',
    category: 'Electronics',
    keyword: 'smartwatch',
    commission: 'low',
    description: 'Latest smartwatches, fitness bands, and wearables',
    icon: '⌚',
  },
];

const AmazonSale: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [deals, setDeals] = useState<DealProduct[]>(FEATURED_DEALS);

  useEffect(() => {
    // Track page view
    analytics.trackPageView('amazon-sale', 'Amazon Sale Landing Page');

    // Filter deals by category
    if (selectedCategory === 'All') {
      setDeals(FEATURED_DEALS);
    } else {
      setDeals(FEATURED_DEALS.filter(deal => deal.category === selectedCategory));
    }
  }, [selectedCategory]);

  const handleDealClick = (keyword: string) => {
    analytics.trackAffiliateClick('amazon-sale', keyword, 'amazon');
    const url = `https://amazon.in/s?k=${encodeURIComponent(keyword)}&tag=randhawa-21`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const categories = ['All', ...new Set(FEATURED_DEALS.map(d => d.category))];
  const commissionColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-blue-100 text-blue-800',
  };

  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Amazon India Mega Sale - Fashion, Beauty & Electronics',
    description:
      'Exclusive Amazon India sale featuring high-commission deals on fashion, beauty, electronics, and home goods with up to 70% discount.',
    url: 'https://drezradar.com/amazon-sale',
    image: 'https://drezradar.com/logo.png',
    datePublished: new Date().toISOString(),
    mainEntity: {
      '@type': 'OfferCatalog',
      name: 'Amazon Sale Deals',
      itemListElement: FEATURED_DEALS.map((deal, idx) => ({
        '@type': 'OfferCatalog',
        name: deal.name,
        description: deal.description,
        position: idx + 1,
      })),
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <Helmet>
        <title>Amazon India Mega Sale 2026 - Fashion, Beauty & Electronics Deals</title>
        <meta
          name="description"
          content="Exclusive Amazon India sale with up to 70% off on fashion, beauty, electronics, and home goods. Best deals on lipsticks, sarees, headphones, and more!"
        />
        <meta name="keywords" content="Amazon sale, fashion sale, beauty sale, electronics sale, India deals, discounts" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <link rel="canonical" href="https://drezradar.com/amazon-sale" />

        {/* Open Graph for social sharing */}
        <meta property="og:title" content="Amazon India Mega Sale 2026 - Exclusive Deals" />
        <meta property="og:description" content="Up to 70% off on fashion, beauty, electronics. Shop now!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://drezradar.com/amazon-sale" />

        {/* Schema markup for AI search engines */}
        <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>

      </Helmet>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-600 to-red-600 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-8 h-8" />
            <span className="text-sm font-semibold uppercase tracking-wider">MEGA SALE LIVE</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Amazon India Sale 2026</h1>
          <p className="text-lg md:text-xl text-orange-100 mb-6">
            Discover exclusive deals on fashion, beauty, electronics, and home goods with up to 70% discount
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/20 backdrop-blur p-4 rounded-lg">
              <div className="text-3xl font-bold">70%</div>
              <div className="text-orange-100">Max Discount</div>
            </div>
            <div className="bg-white/20 backdrop-blur p-4 rounded-lg">
              <div className="text-3xl font-bold">1000+</div>
              <div className="text-orange-100">Product Deals</div>
            </div>
            <div className="bg-white/20 backdrop-blur p-4 rounded-lg">
              <div className="text-3xl font-bold">24H</div>
              <div className="text-orange-100">Flash Sales</div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
            {categories.map(cat => (
              <TabsTrigger key={cat} value={cat} className="text-xs md:text-sm">
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Featured Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {deals.map(deal => (
            <Card key={deal.id} className="hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardHeader className="pb-4">
                <div className="text-4xl mb-3">{deal.icon}</div>
                <CardTitle className="text-xl mb-2">{deal.name}</CardTitle>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline">{deal.category}</Badge>
                  <Badge className={`${commissionColors[deal.commission]} border-0`}>
                    {deal.commission === 'high' ? '💰 High Earn' : deal.commission === 'medium' ? '💵 Medium Earn' : '📊 Earn'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">{deal.description}</p>
                <Button
                  onClick={() => handleDealClick(deal.keyword)}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white"
                  size="lg"
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Shop on Amazon
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  Keyword: <span className="font-semibold">{deal.keyword}</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Best Sellers Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-6 h-6 text-orange-600" />
            <h2 className="text-2xl font-bold">Why This Sale Matters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">🎯 Best Time to Buy</h3>
              <p className="text-gray-700">
                Amazon India's mega sale offers the lowest prices of the year on fashion, beauty, and electronics. Perfect time to refresh your wardrobe and home.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">✨ Trending Categories</h3>
              <p className="text-gray-700">
                From luxury sarees to premium beauty products, electronics to home decor - find everything on sale with guaranteed authenticity.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">🚚 Fast Delivery</h3>
              <p className="text-gray-700">
                Prime members get same-day or next-day delivery on most items. Free shipping on orders above ₹500.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">🛡️ Buyer Protection</h3>
              <p className="text-gray-700">
                100% authentic products with Amazon's A-to-Z guarantee. Easy returns within 30 days. Zero risk shopping.
              </p>
            </div>
          </div>
        </div>

        {/* All Keywords Section - for SEO and AI search engines */}
        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Popular Search Terms</h2>
          <div className="space-y-6">
            {Object.entries(AMAZON_SALE_KEYWORDS).map(([category, keywords]) => (
              <div key={category}>
                <h3 className="font-semibold text-lg capitalize mb-3 text-gray-800">
                  {category.replace(/_/g, ' ')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {keywords.map(keyword => (
                    <button
                      key={keyword}
                      onClick={() => handleDealClick(keyword)}
                      className="px-3 py-2 bg-white border border-gray-300 rounded-full text-sm hover:bg-orange-50 hover:border-orange-500 transition-colors cursor-pointer"
                    >
                      {keyword}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg p-8 text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Don't Miss Out!</h2>
          <p className="text-lg mb-6 text-orange-100">
            These deals are limited and selling fast. Start shopping now on Amazon India.
          </p>
          <Button
            onClick={() => window.open('https://amazon.in/?tag=randhawa-21', '_blank')}
            size="lg"
            className="bg-white text-orange-600 hover:bg-gray-100 font-bold"
          >
            Browse All Amazon Deals
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AmazonSale;
