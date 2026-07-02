import React from 'react';
import { TrendingUp, Users, Zap, Heart } from 'lucide-react';

interface TrendStatProps {
  icon: React.ReactNode;
  stat: string;
  label: string;
  color: string;
}

const TrendStat: React.FC<TrendStatProps> = ({ icon, stat, label, color }) => (
  <div className={`p-4 rounded-xl ${color} text-white backdrop-blur-sm hover:scale-105 transition-transform shadow-lg dark:shadow-xl`}>
    <div className="flex items-center gap-3">
      <div className="text-3xl">{icon}</div>
      <div>
        <div className="text-2xl font-bold">{stat}</div>
        <div className="text-sm opacity-90">{label}</div>
      </div>
    </div>
  </div>
);

// Category-specific trends
export const CATEGORY_TRENDS = {
  'Gen Z Trending': [
    { icon: '👗', trend: 'Vintage Streetwear', growth: '↑ 145%' },
    { icon: '🎨', trend: 'Oversized Fits', growth: '↑ 128%' },
    { icon: '✨', trend: 'Sustainable Fashion', growth: '↑ 156%' },
  ],
  'Fast Fashion': [
    { icon: '⚡', trend: 'Flash Sales', growth: '↑ 200%' },
    { icon: '🛍️', trend: 'Quick Drops', growth: '↑ 178%' },
    { icon: '💨', trend: 'Same-day Delivery', growth: '↑ 142%' },
  ],
  'Royal Classics': [
    { icon: '👑', trend: 'Luxury Sarees', growth: '↑ 89%' },
    { icon: '✨', trend: 'Heritage Designs', growth: '↑ 94%' },
    { icon: '💎', trend: 'Premium Materials', growth: '↑ 76%' },
  ],
  'Traditional': [
    { icon: '🎭', trend: 'Ethnic Wear', growth: '↑ 112%' },
    { icon: '🌺', trend: 'Handcrafted Items', growth: '↑ 135%' },
    { icon: '🪡', trend: 'Artisan Collections', growth: '↑ 98%' },
  ],
  'All Fashion': [
    { icon: '📈', trend: 'All Categories', growth: '↑ 125%' },
    { icon: '🌍', trend: 'Global Trends', growth: '↑ 114%' },
    { icon: '🔥', trend: 'Hot Items', growth: '↑ 189%' },
  ],
};

export const TrendStats: React.FC<{ category: string }> = ({ category }) => {
  const trends = CATEGORY_TRENDS[category as keyof typeof CATEGORY_TRENDS] || CATEGORY_TRENDS['All Fashion'];

  return (
    <div className="space-y-6">
      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <TrendStat
          icon={<TrendingUp className="w-6 h-6" />}
          stat="47%"
          label="Trend Growth"
          color="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <TrendStat
          icon={<Users className="w-6 h-6" />}
          stat="2.4M+"
          label="Fashion Lovers"
          color="bg-gradient-to-br from-purple-500 to-purple-600"
        />
        <TrendStat
          icon={<Zap className="w-6 h-6" />}
          stat="15K+"
          label="Daily Trends"
          color="bg-gradient-to-br from-orange-500 to-orange-600"
        />
        <TrendStat
          icon={<Heart className="w-6 h-6" />}
          stat="3.8★"
          label="User Rating"
          color="bg-gradient-to-br from-pink-500 to-pink-600"
        />
      </div>

      {/* Category Trends */}
      <div>
        <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">🔥 Top Trends in {category}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {trends.map((item, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900
                         p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700
                         hover:border-pink-500 hover:shadow-lg dark:hover:shadow-pink-500/20 transition-all"
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <div className="font-semibold text-gray-900 dark:text-white">{item.trend}</div>
              <div className="text-sm text-green-600 dark:text-green-400 font-bold mt-1">{item.growth}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendStats;
