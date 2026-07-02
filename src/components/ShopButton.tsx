import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AffiliateLink, addTrackingParams } from '@/lib/affiliateLinks';

interface ShopButtonProps {
  affiliateLinks: AffiliateLink[];
  articleTitle?: string;
}

export const ShopButton: React.FC<ShopButtonProps> = ({ affiliateLinks, articleTitle }) => {
  if (!affiliateLinks || affiliateLinks.length === 0) {
    return null;
  }

  // Deduplicate by URL
  const uniqueLinks = Array.from(
    new Map(affiliateLinks.map(link => [link.url, link])).values()
  );

  const handleClick = (url: string) => {
    const trackingUrl = addTrackingParams(url, 'drezradar', 'shop_button', articleTitle || 'article');
    window.open(trackingUrl, '_blank', 'noopener,noreferrer');
  };

  if (uniqueLinks.length === 1) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleClick(uniqueLinks[0].url)}
        className="gap-2"
      >
        <ShoppingBag className="h-4 w-4" />
        {uniqueLinks[0].label}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <ShoppingBag className="h-4 w-4" />
          Shop Now
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {uniqueLinks.map((link, idx) => (
          <DropdownMenuItem key={idx} onClick={() => handleClick(link.url)}>
            {link.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
