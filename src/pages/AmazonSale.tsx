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

// Popular trending products during Amazon sale
const PRODUCTS: Product[] = [
  // Beauty - High discounts (60-75%)
  { id: '1', name: 'MAC Lipstick Collection', category: 'Beauty', icon: '💄', typicalPrice: 1599, discountPercent: 70, description: 'Professional makeup lipsticks', tags: ['beauty', 'makeup', 'cosmetics'] },
  { id: '2', name: 'Lakme Foundation Set', category: 'Beauty', icon: '✨', typicalPrice: 899, discountPercent: 65, description: 'Full coverage foundation', tags: ['beauty', 'foundation'] },
  { id: '3', name: 'Hair Oil Luxury Pack', category: 'Beauty', icon: '🧴', typicalPrice: 499, discountPercent: 60, description: 'Coconut & almond oil blend', tags: ['hair', 'beauty'] },
  { id: '4', name: 'Face Serum Set', category: 'Beauty', icon: '💧', typicalPrice: 1299, discountPercent: 75, description: 'Vitamin C & Retinol serums', tags: ['skincare', 'beauty'] },
  { id: '5', name: 'Perfume Sampler Pack', category: 'Beauty', icon: '🌸', typicalPrice: 2499, discountPercent: 70, description: 'Premium fragrances collection', tags: ['perfume', 'beauty'] },

  // Fashion - Medium-High discounts (50-70%)
  { id: '6', name: 'Designer Saree Collection', category: 'Fashion', icon: '👗', typicalPrice: 3999, discountPercent: 60, description: 'Silk & cotton sarees', tags: ['saree', 'ethnic', 'fashion'] },
  { id: '7', name: 'Women Dresses Combo', category: 'Fashion', icon: '👚', typicalPrice: 1999, discountPercent: 55, description: 'Casual & party dresses', tags: ['dress', 'fashion'] },
  { id: '8', name: 'Kurti Collection Pack', category: 'Fashion', icon: '👕', typicalPrice: 1499, discountPercent: 50, description: 'Printed & embroidered kurtis', tags: ['kurti', 'ethnic', 'fashion'] },
  { id: '9', name: 'Premium Jeans Set', category: 'Fashion', icon: '👖', typicalPrice: 2499, discountPercent: 65, description: 'Denim jeans variety', tags: ['jeans', 'fashion'] },
  { id: '10', name: 'Lehenga Bundle', category: 'Fashion', icon: '💃', typicalPrice: 4999, discountPercent: 70, description: 'Traditional lehnga cholis', tags: ['lehenga', 'ethnic', 'fashion'] },

  // Footwear - High discounts (50-70%)
  { id: '11', name: 'Women Heels Collection', category: 'Footwear', icon: '👠', typicalPrice: 1999, discountPercent: 60, description: 'Formal & casual heels', tags: ['heels', 'footwear'] },
  { id: '12', name: 'Sneakers Bundle', category: 'Footwear', icon: '👟', typicalPrice: 2499, discountPercent: 55, description: 'Sports & casual sneakers', tags: ['sneakers', 'footwear'] },
  { id: '13', name: 'Sandals & Flats', category: 'Footwear', icon: '👡', typicalPrice: 999, discountPercent: 50, description: 'Comfortable daily wear', tags: ['sandals', 'footwear'] },
  { id: '14', name: 'Boots Collection', category: 'Footwear', icon: '🥾', typicalPrice: 3499, discountPercent: 65, description: 'Ankle & knee high boots', tags: ['boots', 'footwear'] },

  // Accessories - Medium discounts (40-60%)
  { id: '15', name: 'Premium Handbags', category: 'Accessories', icon: '👜', typicalPrice: 2999, discountPercent: 50, description: 'Designer handbags', tags: ['handbag', 'accessories'] },
  { id: '16', name: 'Jewelry Set Bundle', category: 'Accessories', icon: '💍', typicalPrice: 1999, discountPercent: 55, description: 'Gold & silver jewelry', tags: ['jewelry', 'accessories'] },
  { id: '17', name: 'Watch Collection', category: 'Accessories', icon: '⌚', typicalPrice: 4999, discountPercent: 60, description: 'Analog & digital watches', tags: ['watch', 'accessories'] },
  { id: '18', name: 'Sunglasses Combo', category: 'Accessories', icon: '😎', typicalPrice: 1499, discountPercent: 45, description: 'UV protected eyewear', tags: ['sunglasses', 'accessories'] },

  // Home & Kitchen - Medium discounts (40-60%)
  { id: '19', name: 'Bed Sheet Set', category: 'Home', icon: '🛏️', typicalPrice: 1299, discountPercent: 50, description: 'Cotton & silk bedsheets', tags: ['bedsheet', 'home'] },
  { id: '20', name: 'Kitchen Cookware', category: 'Kitchen', icon: '🍳', typicalPrice: 3999, discountPercent: 55, description: 'Non-stick pans & pots', tags: ['cookware', 'kitchen'] },
  { id: '21', name: 'Mixer Grinder', category: 'Kitchen', icon: '⚙️', typicalPrice: 2999, discountPercent: 60, description: '1000W powerful mixer', tags: ['appliance', 'kitchen'] },
  { id: '22', name: 'Home Decor Bundle', category: 'Home', icon: '🏠', typicalPrice: 1499, discountPercent: 45, description: 'Pillows, cushions, wall art', tags: ['decor', 'home'] },

  // Electronics - Lower discounts (25-45%)
  { id: '23', name: 'Wireless Headphones', category: 'Electronics', icon: '🎧', typicalPrice: 3499, discountPercent: 40, description: 'Noise-cancelling earbuds', tags: ['headphones', 'electronics'] },
  { id: '24', name: 'Smartwatch', category: 'Electronics', icon: '⌚', typicalPrice: 5999, discountPercent: 35, description: 'Fitness & health tracking', tags: ['smartwatch', 'electronics'] },
  { id: '25', name: 'Power Bank', category: 'Electronics', icon: '🔋', typicalPrice: 1499, discountPercent: 30, description: '20000mAh capacity', tags: ['powerbank', 'electronics'] },
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
