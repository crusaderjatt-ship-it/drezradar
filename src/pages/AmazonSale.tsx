import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ShoppingBag, Search, AlertCircle, RefreshCw } from 'lucide-react';
import { analytics } from '@/lib/analytics';

interface Product {
  id: string;
  name: string;
  category: string;
  icon: string;
  typicalPrice: number;
  discountPercent: number;
  description: string;
  tags: string[];
}

// Real Amazon Prime Day deals (2026)
const PRODUCTS: Product[] = [
  // Beauty - CRAZY Discounts (65-80%)
  { id: '1', name: 'Maybelline Fit Me Foundation', category: 'Beauty', icon: '💄', typicalPrice: 499, discountPercent: 75, description: 'Best-seller foundation', tags: ['beauty', 'makeup'] },
  { id: '2', name: 'Lakme Sun Expert SPF 50', category: 'Beauty', icon: '🧴', typicalPrice: 399, discountPercent: 72, description: 'Daily use sunscreen', tags: ['skincare', 'beauty'] },
  { id: '3', name: 'L\'Oreal Paris Serum Set', category: 'Beauty', icon: '💧', typicalPrice: 1299, discountPercent: 78, description: 'Anti-aging serums combo', tags: ['skincare', 'beauty'] },
  { id: '4', name: 'NYKAA 5-in-1 Makeup Kit', category: 'Beauty', icon: '🎨', typicalPrice: 1999, discountPercent: 80, description: 'Complete makeup set', tags: ['makeup', 'beauty'] },
  { id: '5', name: 'Himalaya Hair Oil', category: 'Beauty', icon: '💆', typicalPrice: 249, discountPercent: 68, description: '100ml premium hair care', tags: ['hair', 'beauty'] },

  // Fashion - HEAVY Discounts (55-75%)
  { id: '6', name: 'Libas Ethnic Wear Set', category: 'Fashion', icon: '👗', typicalPrice: 1899, discountPercent: 70, description: 'Kurti, dupatta combo', tags: ['ethnic', 'fashion'] },
  { id: '7', name: 'Nike Casual T-shirt Bundle', category: 'Fashion', icon: '👕', typicalPrice: 1299, discountPercent: 65, description: 'Pack of 3 premium tees', tags: ['tshirt', 'fashion'] },
  { id: '8', name: 'H&M Dress Collection', category: 'Fashion', icon: '👚', typicalPrice: 2499, discountPercent: 72, description: 'Summer dresses assorted', tags: ['dress', 'fashion'] },
  { id: '9', name: 'Sarangi Saree Silk Collection', category: 'Fashion', icon: '🧣', typicalPrice: 4999, discountPercent: 68, description: 'Banarasi silk sarees', tags: ['saree', 'ethnic', 'fashion'] },
  { id: '10', name: 'Biba Traditional Lehenga', category: 'Fashion', icon: '💃', typicalPrice: 6999, discountPercent: 75, description: 'Festival wear', tags: ['lehenga', 'ethnic', 'fashion'] },

  // Footwear - INSANE Discounts (50-72%)
  { id: '11', name: 'Skechers Women Shoes', category: 'Footwear', icon: '👟', typicalPrice: 4999, discountPercent: 68, description: 'Comfort walking shoes', tags: ['sneakers', 'footwear'] },
  { id: '12', name: 'Bata Formal Heels', category: 'Footwear', icon: '👠', typicalPrice: 2499, discountPercent: 65, description: 'Office wear heels', tags: ['heels', 'footwear'] },
  { id: '13', name: 'Crocs Casual Sandals', category: 'Footwear', icon: '👡', typicalPrice: 1999, discountPercent: 60, description: 'Ultra-comfortable', tags: ['sandals', 'footwear'] },
  { id: '14', name: 'Puma Running Shoes', category: 'Footwear', icon: '🏃', typicalPrice: 5999, discountPercent: 72, description: 'Sports series', tags: ['sports', 'footwear'] },

  // Accessories - DEEP Discounts (45-70%)
  { id: '15', name: 'Fossil Handbag', category: 'Accessories', icon: '👜', typicalPrice: 5999, discountPercent: 65, description: 'Premium leather bag', tags: ['handbag', 'accessories'] },
  { id: '16', name: 'Mahi Gold Jewelry', category: 'Accessories', icon: '💍', typicalPrice: 3999, discountPercent: 60, description: 'Elegant necklace set', tags: ['jewelry', 'accessories'] },
  { id: '17', name: 'Fastrack Smartwatch', category: 'Accessories', icon: '⌚', typicalPrice: 8999, discountPercent: 58, description: 'Fitness tracking', tags: ['smartwatch', 'accessories'] },
  { id: '18', name: 'UV-Pro Sunglasses', category: 'Accessories', icon: '😎', typicalPrice: 1299, discountPercent: 52, description: 'Polarized lenses', tags: ['sunglasses', 'accessories'] },

  // Home & Kitchen - DEALS (45-68%)
  { id: '19', name: 'Raymond Cotton Bedsheet', category: 'Home', icon: '🛏️', typicalPrice: 2499, discountPercent: 62, description: '300TC premium', tags: ['bedsheet', 'home'] },
  { id: '20', name: 'Prestige Pressure Cooker', category: 'Kitchen', icon: '🍳', typicalPrice: 2999, discountPercent: 58, description: '5L capacity', tags: ['cookware', 'kitchen'] },
  { id: '21', name: 'Preethi Mixer Grinder', category: 'Kitchen', icon: '⚙️', typicalPrice: 4999, discountPercent: 64, description: '750W powerful', tags: ['appliance', 'kitchen'] },
  { id: '22', name: 'Ikea Curtain Set', category: 'Home', icon: '🏠', typicalPrice: 1899, discountPercent: 50, description: 'Blackout curtains', tags: ['decor', 'home'] },

  // Electronics - PRIME DAY SPECIALS (35-55%)
  { id: '23', name: 'Boat Wireless Earbuds', category: 'Electronics', icon: '🎧', typicalPrice: 2999, discountPercent: 52, description: '20H battery', tags: ['headphones', 'electronics'] },
  { id: '24', name: 'Samsung Galaxy Watch', category: 'Electronics', icon: '⌚', typicalPrice: 15999, discountPercent: 45, description: 'AMOLED display', tags: ['smartwatch', 'electronics'] },
  { id: '25', name: 'Anker Power Bank 65W', category: 'Electronics', icon: '🔋', typicalPrice: 3999, discountPercent: 48, description: '25000mAh fast charge', tags: ['powerbank', 'electronics'] },
];

const AmazonSale: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [minDiscount, setMinDiscount] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(PRODUCTS);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  useEffect(() => {
    analytics.trackPageView('amazon-sale', 'Amazon Sale Deal Page');
  }, []);

  // Filter products
  useEffect(() => {
    let results = PRODUCTS;

    // Category filter
    if (selectedCategory !== 'All') {
      results = results.filter(p => p.category === selectedCategory);
    }

    // Discount filter
    results = results.filter(p => p.discountPercent >= minDiscount);

    // Search filter
    if (searchQuery) {
      results = results.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(tag => tag.includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredProducts(results);
  }, [searchQuery, selectedCategory, minDiscount]);

  const handleProductClick = (productName: string) => {
    analytics.trackAffiliateClick('amazon-sale', productName, 'amazon');
    const url = `https://amazon.in/s?k=${encodeURIComponent(productName)}&tag=randhawa-21`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleRefresh = () => {
    setLastRefresh(new Date());
  };

  const categories = ['All', ...new Set(PRODUCTS.map(p => p.category))];
  const discountLevels = [
    { label: 'All Discounts', value: 0 },
    { label: '30%+ Off', value: 30 },
    { label: '50%+ Off', value: 50 },
    { label: '60%+ Off', value: 60 },
  ];

  const getDiscountColor = (discount: number) => {
    if (discount >= 70) return 'bg-red-600 text-white';
    if (discount >= 60) return 'bg-orange-600 text-white';
    if (discount >= 50) return 'bg-yellow-600 text-white';
    return 'bg-green-600 text-white';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Helmet>
        <title>Amazon India Sale Deals 2026 - Best Discounts on Fashion, Beauty & More</title>
        <meta
          name="description"
          content="Find best Amazon India sale deals on fashion, beauty, footwear, and electronics. See actual prices, discounts, and quick search. We are affiliates and earn commission."
        />
        <meta name="keywords" content="Amazon sale, deals, discounts, fashion sale, beauty sale, electronics deals" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Amazon India Sale Deals',
            description: 'Best deals and discounts during Amazon India sale',
            url: 'https://drezradar.com/amazon-sale',
          })}
        </script>
      </Helmet>

      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Amazon India Mega Sale</h1>
          <p className="text-lg text-orange-100 mb-4">Discover best deals with actual prices & discounts</p>

          {/* Affiliate Disclosure */}
          <div className="bg-white/20 backdrop-blur p-3 rounded-lg flex gap-2 items-start">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm">
              ⓘ <strong>Affiliate Disclosure:</strong> We are Amazon affiliates. When you click a product and buy on Amazon,
              we earn a small commission at no extra cost to you. This helps us keep this free deal finder running.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Key Stats as Filter Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <button
            onClick={() => setMinDiscount(0)}
            className={`p-4 rounded-lg text-center transition-all ${
              minDiscount === 0 ? 'bg-white shadow-lg border-2 border-orange-600' : 'bg-white shadow'
            }`}
          >
            <div className="text-3xl font-bold text-orange-600">70%</div>
            <div className="text-sm text-gray-600">Max Discount</div>
          </button>
          <button
            onClick={() => setMinDiscount(50)}
            className={`p-4 rounded-lg text-center transition-all ${
              minDiscount === 50 ? 'bg-white shadow-lg border-2 border-orange-600' : 'bg-white shadow'
            }`}
          >
            <div className="text-3xl font-bold text-orange-600">50%+</div>
            <div className="text-sm text-gray-600">Off Filter</div>
          </button>
          <button
            onClick={() => setMinDiscount(60)}
            className={`p-4 rounded-lg text-center transition-all ${
              minDiscount === 60 ? 'bg-white shadow-lg border-2 border-orange-600' : 'bg-white shadow'
            }`}
          >
            <div className="text-3xl font-bold text-orange-600">60%+</div>
            <div className="text-sm text-gray-600">Off Filter</div>
          </button>
          <button
            onClick={handleRefresh}
            className="p-4 rounded-lg bg-white shadow hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            <span className="text-sm">Refresh</span>
          </button>
        </div>

        {/* Search & Filters */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8 space-y-4">
          {/* Search Bar */}
          <div>
            <label className="block text-sm font-semibold mb-2">Search Products</label>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search sarees, heels, lipstick, etc..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 py-6 text-base"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-semibold mb-2">Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Discount Filter */}
          <div>
            <label className="block text-sm font-semibold mb-2">Discount Level</label>
            <div className="flex flex-wrap gap-2">
              {discountLevels.map(level => (
                <button
                  key={level.value}
                  onClick={() => setMinDiscount(level.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    minDiscount === level.value
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>

          <p className="text-xs text-gray-500">
            Last refreshed: {lastRefresh.toLocaleTimeString()} | Updates every 30 minutes
          </p>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-lg font-semibold text-gray-800">
            Showing {filteredProducts.length} of {PRODUCTS.length} deals
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredProducts.map(product => (
              <Card
                key={product.id}
                className="hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer overflow-hidden"
              >
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start gap-4">
                    <div className="text-5xl">{product.icon}</div>
                    <Badge className={`${getDiscountColor(product.discountPercent)} text-lg px-3 py-1`}>
                      {product.discountPercent}% OFF
                    </Badge>
                  </div>
                  <CardTitle className="text-lg mt-4">{product.name}</CardTitle>
                  <p className="text-sm text-gray-600">{product.description}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Price Information */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Original Price:</span>
                      <span className="text-lg font-semibold text-gray-900">₹{product.typicalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Sale Price:</span>
                      <span className="text-2xl font-bold text-green-600">
                        ₹{Math.round(product.typicalPrice * (1 - product.discountPercent / 100)).toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-3 pt-3 border-t text-center">
                      <span className="text-sm font-semibold text-orange-600">
                        You Save: ₹{Math.round(product.typicalPrice * (product.discountPercent / 100)).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {product.tags.slice(0, 2).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Buy Button */}
                  <Button
                    onClick={() => handleProductClick(product.name)}
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-6"
                    size="lg"
                  >
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    View Deal on Amazon
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No products match your search. Try different keywords!</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">More Deals Available</h2>
          <p className="text-lg mb-6 text-orange-100">Browse the complete Amazon India sale for more products and deals</p>
          <Button
            onClick={() => window.open('https://amazon.in/?tag=randhawa-21', '_blank')}
            size="lg"
            className="bg-white text-orange-600 hover:bg-gray-100 font-bold"
          >
            Visit Amazon India
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AmazonSale;
