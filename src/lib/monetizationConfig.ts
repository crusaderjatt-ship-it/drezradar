// Monetization Configuration
// Update these values based on your actual affiliate IDs and ad slots

export const MONETIZATION_CONFIG = {
  // Google AdSense Configuration
  adsense: {
    publisherId: 'ca-pub-7039562928200716', // Your AdSense publisher ID
    adSlots: {
      topBanner: '4536248322',       // Top banner ad
      articleInline: '1471700627',   // Inline article ads (in-article fluid format)
      bottomBanner: '4536248322',    // Bottom banner ad
    },
    // Enable/disable ads in specific regions
    enableTopAd: true,
    enableInlineAds: true,
    enableBottomAd: true,
  },

  // Affiliate Links Configuration
  affiliates: {
    amazon: {
      baseUrl: 'https://amazon.com/s',
      affiliateTag: 'tag=randhawa-21', // Your Amazon Associates tracking ID
      enabled: true,
    },
    asos: {
      baseUrl: 'https://www.asos.com',
      affiliateId: '', // Add ASOS affiliate ID if available
      enabled: true,
    },
    sephora: {
      baseUrl: 'https://www.sephora.com',
      affiliateId: '', // Add Sephora affiliate ID if available
      enabled: true,
    },
    revolve: {
      baseUrl: 'https://www.revolve.com',
      affiliateId: '', // Add Revolve affiliate ID if available
      enabled: true,
    },
    shein: {
      baseUrl: 'https://www.shein.com',
      affiliateId: '', // Add Shein affiliate ID if available
      enabled: true,
    },
    zara: {
      baseUrl: 'https://www.zara.com',
      affiliateId: '', // Add Zara affiliate ID if available
      enabled: true,
    },
  },

  // UTM Parameters for tracking
  tracking: {
    source: 'drezradar',
    mediums: {
      shopButton: 'shop_button',
      newsletter: 'email_newsletter',
      sidebar: 'sidebar_ad',
      recommendation: 'recommendation',
    },
  },

  // Feature Flags
  features: {
    showShopButtons: true,        // Show shop buttons on articles
    showInlineAds: true,          // Show ads between articles
    trackAffiliateClicks: true,   // Track affiliate link clicks
    enableNativeAds: false,       // Enable native ad format (future)
  },
};

// Helper function to get affiliate URL with tracking
export function buildAffiliateUrl(
  retailer: string,
  searchTerm: string,
  source: string = 'article'
): string {
  const config = MONETIZATION_CONFIG.affiliates[retailer as keyof typeof MONETIZATION_CONFIG.affiliates];

  if (!config || !config.enabled) {
    return '';
  }

  let url = '';

  if (retailer === 'amazon') {
    const amazonConfig = config as typeof MONETIZATION_CONFIG.affiliates.amazon;
    url = `${amazonConfig.baseUrl}?k=${encodeURIComponent(searchTerm)}&${amazonConfig.affiliateTag}`;
  } else {
    url = `${config.baseUrl}`;
  }

  // Add tracking parameters
  const separator = url.includes('?') ? '&' : '?';
  url += `${separator}utm_source=${MONETIZATION_CONFIG.tracking.source}`;
  url += `&utm_medium=${MONETIZATION_CONFIG.tracking.mediums.shopButton}`;
  url += `&utm_campaign=${source}`;

  return url;
}
