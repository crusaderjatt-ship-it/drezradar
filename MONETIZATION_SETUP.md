# DrezRadar Monetization Implementation Guide

This document outlines the monetization features that have been implemented and what needs to be configured to activate them.

## ✅ What's Been Implemented

### 1. Google AdSense Optimization
- **Status:** ✅ Implemented
- **Location:** 
  - `index.html` - Global AdSense script
  - `src/pages/Home.tsx` - Multiple ad placements
- **Features:**
  - Top banner ad (before articles)
  - Inline ads (between every 3 articles)
  - Bottom banner ad (after all articles)
  - Automatic ad refresh on tab change

**AdSense Publisher ID:** `ca-pub-7039562928200716`

### 2. Affiliate Links System
- **Status:** ✅ Implemented
- **Location:** 
  - `src/lib/affiliateLinks.ts` - Affiliate link logic
  - `src/components/ShopButton.tsx` - Shop button component
  - `src/pages/Home.tsx` - Integrated into article cards
- **Features:**
  - Brand detection in article titles and descriptions
  - Smart affiliate link suggestions
  - UTM parameter tracking
  - Dropdown menu for multiple retailers

**Brands Supported:** Sephora, Kate Spade, Zara, ASOS, Shein, Revolve, Gucci, Louis Vuitton, Prada, Chanel, Dior, Saint Laurent, Valentino, L'Oreal, MAC, Nykaa

---

## 🔧 Configuration Required

### Step 1: Update Google AdSense Ad Slot IDs

Google AdSense assigns unique slot IDs for different ad units. You need to update these in your AdSense account:

1. **Log in to Google AdSense:** https://www.google.com/adsense/
2. **Create ad units** for each location:
   - Top banner ad
   - Inline article ads
   - Bottom banner ad

3. **Update the slot IDs** in `src/lib/monetizationConfig.ts`:

```typescript
adSlots: {
  topBanner: '4536248322',      // Replace with your actual slot ID
  articleInline: '1234567890',  // Replace with your actual slot ID
  bottomBanner: '0987654321',   // Replace with your actual slot ID
},
```

**How to find your ad slot IDs:**
- In AdSense dashboard → Ads → By code
- Look for the `data-ad-slot` value in the generated code

### Step 2: Set Up Affiliate Programs

#### Amazon Associates (HIGHEST PRIORITY)
1. **Sign up:** https://associates.amazon.com/
2. **Get your Affiliate ID** (format: `drezradar-20`)
3. **Update in** `src/lib/monetizationConfig.ts`:

```typescript
amazon: {
  baseUrl: 'https://amazon.com/s',
  affiliateTag: 'tag=YOUR-ID-20', // Replace with your ID
  enabled: true,
},
```

#### Optional: Other Affiliates
- **ASOS:** https://www.asos.com/affiliate/
- **Sephora:** https://www.sephora.com/beauty/affiliate
- **Revolve:** https://www.revolve.com/affiliate
- **Shein:** https://www.shein.us/affiliate-program
- **Zara:** https://www.zara.com/us/

Update these in `monetizationConfig.ts` as you sign up for each program.

### Step 3: Verify Affiliate Links Are Working

Test the affiliate links:

1. **On your local dev server:** `npm run dev`
2. **Click "Shop Now" buttons** on articles that mention brands
3. **Check URL in browser:** Should contain your affiliate tags
4. **Example:** `https://amazon.com/s?k=Sephora&tag=drezradar-20`

---

## 📊 Expected Revenue

Based on typical fashion blog metrics:

| Channel | With 5K/mo visitors | With 10K/mo visitors | With 20K/mo visitors |
|---------|-------------------|-------------------|-------------------|
| Google AdSense | $50-100 | $100-200 | $200-400 |
| Affiliate Links | $100-200 | $200-400 | $400-800 |
| **Total Monthly** | **$150-300** | **$300-600** | **$600-1200** |

*Note: These are conservative estimates. Actual revenue depends on content quality, click-through rates, and conversion rates.*

---

## 🚀 Next Steps to Maximize Revenue

### Immediate (This Week)
1. ✅ Configure Google AdSense ad slot IDs
2. ✅ Sign up for Amazon Associates
3. ✅ Test affiliate links in production

### Short-term (Week 2-3)
1. Sign up for additional affiliate programs (ASOS, Sephora, etc.)
2. Add more brands to the affiliate links database
3. Monitor CTR and conversion rates in Google Analytics

### Medium-term (Month 1-2)
1. Implement email newsletter (for sponsored content opportunity)
2. Create B2B trend reports (high-value leads)
3. Set up premium tier subscription

### Long-term (Month 2-3)
1. API access for retailers
2. Trend forecasting reports
3. Brand partnerships for sponsored content

---

## 📈 Monitoring & Optimization

### Track Performance

1. **Google AdSense Dashboard:**
   - Monitor CPM (cost per mille)
   - Track impressions and clicks
   - Identify high-performing ad slots

2. **Affiliate Link Clicks:**
   - Use UTM parameters (already built in)
   - Check Google Analytics for affiliate traffic
   - Monitor conversion rates per retailer

3. **User Behavior:**
   - Which brands are most searched?
   - Which categories have highest engagement?
   - When do users click affiliate links?

### Optimization Tips

1. **Ad Placement:** Move low-performing ad slots to high-traffic areas
2. **Affiliate Links:** Promote top-converting retailers more
3. **Content:** Write articles about high-commission products
4. **Timing:** Post content when your audience is most active
5. **Engagement:** Improve article quality to increase time-on-page

---

## 🔐 Important Notes

### Google AdSense Policies
- ✅ DO NOT click your own ads (will get banned)
- ✅ DO NOT artificially inflate impressions
- ✅ DO NOT place ads in misleading locations
- ✅ DO create quality content (AdSense prefers high-quality sites)

### Affiliate Policies
- ✅ DO disclose affiliate links clearly (already implemented)
- ✅ DO recommend products honestly
- ✅ DO track compliance with each program's rules
- ✅ DO NOT mislead users about affiliate status

---

## 🆘 Troubleshooting

### Ads Not Showing
1. Check that AdSense script is in `index.html`
2. Verify publisher ID is correct
3. Check that you have approved ad units in AdSense
4. Clear browser cache and reload

### Affiliate Links Not Working
1. Verify affiliate tags in `monetizationConfig.ts`
2. Check that affiliate programs are still active
3. Test links in incognito mode
4. Check browser console for JavaScript errors

### Low Click-Through Rate
1. Improve article quality
2. Add more relevant brands to affiliate map
3. Increase visibility of "Shop Now" buttons
4. Test different button placements

---

## 📝 File Locations

Key files for monetization:

```
src/
├── lib/
│   ├── affiliateLinks.ts          # Affiliate link logic
│   └── monetizationConfig.ts       # Configuration file
├── components/
│   └── ShopButton.tsx              # Shop button component
└── pages/
    └── Home.tsx                    # Integrated affiliate + ads
    
index.html                          # AdSense script tag
public/ads.txt                      # AdSense verification
MONETIZATION_SETUP.md               # This file
```

---

## ✉️ Need Help?

If you encounter any issues:

1. Check Google AdSense documentation: https://support.google.com/adsense/
2. Check affiliate program FAQs
3. Review browser console for errors
4. Test on different devices/browsers
5. Check that your site traffic is coming from real users

---

**Last Updated:** 2026-07-02
**Status:** Ready for configuration
