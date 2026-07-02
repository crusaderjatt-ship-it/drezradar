// Affiliate links configuration for fashion retailers
// This module helps monetize articles by adding affiliate links to mentioned products/brands

export interface AffiliateLink {
  retailer: 'amazon' | 'asos' | 'sephora' | 'revolve' | 'shein' | 'zara';
  url: string;
  label: string;
}

// Brand-to-affiliate mapping
// When an article mentions these brands, we can suggest affiliate links
const BRAND_AFFILIATE_MAP: Record<string, AffiliateLink[]> = {
  'sephora': [
    {
      retailer: 'amazon',
      url: 'https://amazon.in/s?k=Sephora&tag=randhawa-21',
      label: 'View on Amazon'
    }
  ],
  'kate spade': [
    {
      retailer: 'amazon',
      url: 'https://amazon.in/s?k=Kate+Spade&tag=randhawa-21',
      label: 'View on Amazon'
    }
  ],
  'zara': [
    {
      retailer: 'zara',
      url: 'https://www.zara.com',
      label: 'Shop Zara'
    }
  ],
  'asos': [
    {
      retailer: 'asos',
      url: 'https://www.asos.com',
      label: 'Shop ASOS'
    }
  ],
  'shein': [
    {
      retailer: 'shein',
      url: 'https://www.shein.com',
      label: 'Shop Shein'
    }
  ],
  'revolve': [
    {
      retailer: 'revolve',
      url: 'https://www.revolve.com',
      label: 'Shop Revolve'
    }
  ],
  'gucci': [
    {
      retailer: 'amazon',
      url: 'https://amazon.in/s?k=Gucci&tag=randhawa-21',
      label: 'View on Amazon'
    }
  ],
  'louis vuitton': [
    {
      retailer: 'amazon',
      url: 'https://amazon.in/s?k=Louis+Vuitton&tag=randhawa-21',
      label: 'View on Amazon'
    }
  ],
  'prada': [
    {
      retailer: 'amazon',
      url: 'https://amazon.in/s?k=Prada&tag=randhawa-21',
      label: 'View on Amazon'
    }
  ],
  'chanel': [
    {
      retailer: 'amazon',
      url: 'https://amazon.in/s?k=Chanel&tag=randhawa-21',
      label: 'View on Amazon'
    }
  ],
  'dior': [
    {
      retailer: 'amazon',
      url: 'https://amazon.in/s?k=Dior&tag=randhawa-21',
      label: 'View on Amazon'
    }
  ],
  'saint laurent': [
    {
      retailer: 'amazon',
      url: 'https://amazon.in/s?k=Saint+Laurent&tag=randhawa-21',
      label: 'View on Amazon'
    }
  ],
  'valentino': [
    {
      retailer: 'amazon',
      url: 'https://amazon.in/s?k=Valentino&tag=randhawa-21',
      label: 'View on Amazon'
    }
  ],
  'loreal': [
    {
      retailer: 'amazon',
      url: 'https://amazon.in/s?k=LOreal&tag=randhawa-21',
      label: 'View on Amazon'
    }
  ],
  'mac': [
    {
      retailer: 'amazon',
      url: 'https://amazon.in/s?k=MAC+Cosmetics&tag=randhawa-21',
      label: 'View on Amazon'
    }
  ],
  'nykaa': [
    {
      retailer: 'amazon',
      url: 'https://amazon.in/s?k=beauty&tag=randhawa-21',
      label: 'View on Amazon'
    }
  ]
};

// Find affiliate links mentioned in article text
export function extractBrandMentions(text: string): string[] {
  if (!text) return [];

  const lowerText = text.toLowerCase();
  const mentions: string[] = [];

  Object.keys(BRAND_AFFILIATE_MAP).forEach(brand => {
    if (lowerText.includes(brand.toLowerCase())) {
      mentions.push(brand);
    }
  });

  return [...new Set(mentions)]; // Remove duplicates
}

// Get affiliate links for mentioned brands
export function getAffiliateLinksForBrands(brands: string[]): AffiliateLink[] {
  const links: AffiliateLink[] = [];

  brands.forEach(brand => {
    const brandLinks = BRAND_AFFILIATE_MAP[brand.toLowerCase()];
    if (brandLinks) {
      links.push(...brandLinks);
    }
  });

  return [...new Set(links)]; // Remove duplicates
}

// Generate a "Shop" button data based on article content
export function getShopSuggestions(articleTitle: string, articleDescription: string): AffiliateLink[] {
  const content = `${articleTitle} ${articleDescription}`.toLowerCase();
  const mentions = extractBrandMentions(content);
  return getAffiliateLinksForBrands(mentions);
}

// Add UTM parameters to affiliate link for tracking
export function addTrackingParams(url: string, source = 'drezradar', medium = 'referral', campaign = 'article'): string {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}utm_source=${source}&utm_medium=${medium}&utm_campaign=${campaign}`;
}
