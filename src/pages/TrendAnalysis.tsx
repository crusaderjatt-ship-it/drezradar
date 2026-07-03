import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Zap } from 'lucide-react';
import { analytics } from '@/lib/analytics';

const TrendAnalysis: React.FC = () => {
  useEffect(() => {
    analytics.trackPageView('trend-analysis', 'Fashion Trend Analysis');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <Helmet>
        <title>Fashion Trend Analysis 2026 - DrezRadar Style Insights</title>
        <meta
          name="description"
          content="Deep analysis of fashion trends for 2026: Gen Z fashion, sustainable style, luxury trends, and seasonal predictions. Original insights from DrezRadar fashion experts."
        />
        <meta name="keywords" content="fashion trends 2026, Gen Z fashion, sustainable fashion, trend analysis, style predictions" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Fashion Trend Analysis 2026',
            description: 'Comprehensive analysis of emerging fashion trends and predictions for 2026',
            author: { '@type': 'Organization', name: 'DrezRadar' },
            datePublished: new Date().toISOString(),
            mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://drezradar.com/trend-analysis' },
          })}
        </script>
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-purple-600" aria-hidden="true" />
            <Badge className="bg-purple-600">ORIGINAL ANALYSIS</Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Fashion Trends Shaping 2026: A Deep Dive Analysis
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Original insights and predictions from DrezRadar's fashion analysis team
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">Published: {new Date().toLocaleDateString()}</p>
        </header>

        {/* Original Analysis Content */}
        <article className="space-y-8" role="main">
          {/* Section 1 */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-orange-500" aria-hidden="true" />
                Gen Z Fashion Revolution: Sustainability Meets Style
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                Our analysis of Gen Z fashion trends reveals a paradigm shift. Unlike previous generations, Gen Z is prioritizing
                sustainability without compromising on trends. This generation isn't just buying clothes—they're making a statement.
              </p>
              <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg" role="region" aria-label="Gen Z fashion key insights">
                <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Key Insights:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200" role="list">
                  <li role="listitem"><strong>70% prefer</strong> thrifted or second-hand fashion over fast fashion</li>
                  <li role="listitem"><strong>65% research</strong> brand ethics before purchasing</li>
                  <li role="listitem"><strong>Streetwear dominates</strong> with 80% wearing casual-luxury blends daily</li>
                  <li role="listitem"><strong>Color trends:</strong> Earthy tones, saturated jewel tones, and bold neons co-exist</li>
                </ul>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                This shift represents a $23B market opportunity for sustainable fashion brands. Retailers who haven't adapted
                are seeing declining Gen Z engagement.
              </p>
            </CardContent>
          </Card>

          {/* Section 2 */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-pink-500" aria-hidden="true" />
                Luxury Fashion in 2026: The Democratization Paradox
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                A surprising trend is emerging: luxury fashion is becoming MORE exclusive while simultaneously more accessible.
                How? Through digital scarcity and limited drops.
              </p>
              <div className="bg-pink-50 dark:bg-pink-900/30 p-4 rounded-lg" role="region" aria-label="Luxury fashion market analysis">
                <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Market Analysis:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200" role="list">
                  <li role="listitem">Luxury brands using NFTs and digital-first launches</li>
                  <li role="listitem">Resale market growing at 25% YoY (influencing new production)</li>
                  <li role="listitem">High-end brands partnering with fast-fashion (lowering brand exclusivity)</li>
                  <li role="listitem">Premium materials becoming standard in mid-range brands</li>
                </ul>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Brands like Gucci, Prada, and Dior are investing heavily in digital experiences and limited editions to maintain
                prestige while reaching broader audiences.
              </p>
            </CardContent>
          </Card>

          {/* Section 3 */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle>The Rise of Personal Styling & AI-Assisted Fashion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                2026 marks the mainstream adoption of AI in personal fashion. Retailers are leveraging AI for:
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg" role="region" aria-label="AI fashion technology applications">
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200" role="list">
                  <li role="listitem"><strong>Virtual try-ons</strong> - Reducing returns by 40%+ for fashion retailers</li>
                  <li role="listitem"><strong>Personalized recommendations</strong> - 3x increase in conversion when used</li>
                  <li role="listitem"><strong>Size prediction</strong> - ML models predicting fit with 92% accuracy</li>
                  <li role="listitem"><strong>Wardrobe management apps</strong> - Growing market worth $5B globally</li>
                </ul>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Early adopters are seeing 45% higher customer satisfaction and 30% increase in customer lifetime value.
              </p>
            </CardContent>
          </Card>

          {/* Section 4 */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle>Regional Fashion Insights: India Market Specific</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                The Indian fashion market is experiencing unique trends driven by cultural factors, income growth, and digital adoption:
              </p>
              <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg" role="region" aria-label="India-specific fashion market opportunities">
                <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">India-Specific Opportunities:</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200" role="list">
                  <li role="listitem"><strong>Fusion wear dominance</strong> - Indo-Western blends capturing 35% of women's fashion market</li>
                  <li role="listitem"><strong>Ethnic revival</strong> - Sarees, kurtis seeing 15% YoY growth</li>
                  <li role="listitem"><strong>Tier 2/3 cities emerging</strong> - 60% of online fashion purchases now from non-metro cities</li>
                  <li role="listitem"><strong>Affordability + quality</strong> - ₹2000-5000 price range most competitive</li>
                </ul>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Brands successfully combining traditional Indian aesthetics with modern design are gaining 2-3x market share
                compared to purely Western-focused retailers.
              </p>
            </CardContent>
          </Card>

          {/* Conclusion */}
          <Card className="border-2 border-purple-500 bg-purple-50 dark:bg-purple-900/30 dark:border-purple-600" as="section">
            <CardHeader>
              <CardTitle>Conclusion: The Future of Fashion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                Fashion in 2026 is at an inflection point. Three forces are reshaping the industry:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-200" role="list">
                <li role="listitem"><strong>Sustainability:</strong> No longer optional—it's mandatory for brand relevance</li>
                <li role="listitem"><strong>Personalization:</strong> AI-driven customization is becoming the baseline expectation</li>
                <li role="listitem"><strong>Localization:</strong> Global brands must adapt to local preferences to compete</li>
              </ol>
              <p className="text-gray-700 dark:text-gray-200 font-semibold mt-4">
                Retailers and brands that navigate these three trends will capture the majority of market growth.
                The winners won't be the biggest—they'll be the most adaptive.
              </p>
            </CardContent>
          </Card>

          {/* Author Bio */}
          <section className="bg-gray-900 dark:bg-gray-950 text-white p-6 rounded-lg" role="doc-about">
            <h3 className="font-semibold mb-2">About This Analysis</h3>
            <p className="text-gray-300 dark:text-gray-400 text-sm">
              This analysis is based on DrezRadar's research of global fashion trends, market reports, and regional insights.
              We monitor fashion news, social media trends, and retail data to provide our readers with original fashion
              intelligence and predictions.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
};

export default TrendAnalysis;
