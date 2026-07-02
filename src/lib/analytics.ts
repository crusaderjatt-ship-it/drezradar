// Analytics tracking for monetization pages and affiliate links
// Tracks: page visits, affiliate clicks, conversions, user engagement

interface PageView {
  pageId: string;
  pageName: string;
  timestamp: string;
  userAgent: string;
  referrer: string;
}

interface AffiliateClick {
  pageId: string;
  keyword: string;
  retailer: string;
  timestamp: string;
  sessionId: string;
}

interface PageAnalytics {
  pageId: string;
  pageName: string;
  totalViews: number;
  uniqueVisits: number;
  avgTimeOnPage: number;
  bounceRate: number;
  affiliateClicks: number;
  topKeywords: Array<{ keyword: string; clicks: number }>;
}

// Simple session-based analytics (for demo; use Supabase for production)
class AnalyticsTracker {
  private sessionId: string;
  private pageViews: PageView[] = [];
  private affiliateClicks: AffiliateClick[] = [];
  private pageStartTime: number = 0;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.loadFromStorage();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private loadFromStorage(): void {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('drezradar_analytics');
      if (stored) {
        try {
          const data = JSON.parse(stored);
          this.pageViews = data.pageViews || [];
          this.affiliateClicks = data.affiliateClicks || [];
        } catch (e) {
          console.error('Failed to load analytics from storage', e);
        }
      }
    }
  }

  private saveToStorage(): void {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(
          'drezradar_analytics',
          JSON.stringify({
            pageViews: this.pageViews,
            affiliateClicks: this.affiliateClicks,
          })
        );
      } catch (e) {
        console.error('Failed to save analytics to storage', e);
      }
    }
  }

  trackPageView(pageId: string, pageName: string): void {
    this.pageStartTime = Date.now();

    const pageView: PageView = {
      pageId,
      pageName,
      timestamp: new Date().toISOString(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
      referrer: typeof document !== 'undefined' ? document.referrer : 'direct',
    };

    this.pageViews.push(pageView);
    this.saveToStorage();

    // Also send to server for persistence (optional)
    this.sendToServer('pageView', pageView);
  }

  trackAffiliateClick(pageId: string, keyword: string, retailer: string = 'amazon'): void {
    const click: AffiliateClick = {
      pageId,
      keyword,
      retailer,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
    };

    this.affiliateClicks.push(click);
    this.saveToStorage();

    // Send to server for persistence
    this.sendToServer('affiliateClick', click);
  }

  getPageMetrics(pageId: string): PageAnalytics {
    const pageViewsForPage = this.pageViews.filter(pv => pv.pageId === pageId);
    const clicksForPage = this.affiliateClicks.filter(ac => ac.pageId === pageId);

    // Calculate metrics
    const totalViews = pageViewsForPage.length;
    const uniqueVisits = new Set(pageViewsForPage.map(pv => pv.referrer)).size;

    // Count clicks by keyword
    const keywordClicks = clicksForPage.reduce((acc, click) => {
      const existing = acc.find(k => k.keyword === click.keyword);
      if (existing) {
        existing.clicks++;
      } else {
        acc.push({ keyword: click.keyword, clicks: 1 });
      }
      return acc;
    }, [] as Array<{ keyword: string; clicks: number }>);

    const topKeywords = keywordClicks
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 10);

    return {
      pageId,
      pageName: pageViewsForPage[0]?.pageName || 'Unknown',
      totalViews,
      uniqueVisits,
      avgTimeOnPage: 0, // Would need additional tracking
      bounceRate: 0, // Would need additional tracking
      affiliateClicks: clicksForPage.length,
      topKeywords,
    };
  }

  getAllAnalytics(): { pages: PageAnalytics[]; totalClicks: number } {
    const uniquePages = Array.from(new Set(this.pageViews.map(pv => pv.pageId)));
    const pages = uniquePages.map(pageId => this.getPageMetrics(pageId));

    return {
      pages,
      totalClicks: this.affiliateClicks.length,
    };
  }

  private sendToServer(eventType: string, data: any): void {
    // Send analytics to Supabase or your analytics service
    // This is for future implementation with backend persistence
    if (typeof fetch !== 'undefined') {
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventType, data, timestamp: new Date().toISOString() }),
      }).catch(e => console.error('Failed to send analytics to server', e));
    }
  }

  exportAnalytics(): string {
    return JSON.stringify(this.getAllAnalytics(), null, 2);
  }

  clearAnalytics(): void {
    this.pageViews = [];
    this.affiliateClicks = [];
    localStorage.removeItem('drezradar_analytics');
  }
}

// Export singleton instance
export const analytics = new AnalyticsTracker();

// Export type definitions
export type { PageView, AffiliateClick, PageAnalytics };
