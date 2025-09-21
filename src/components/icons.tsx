import React from 'react';
import { Instagram as LucideInstagram, Pinterest as LucidePinterest, X as LucideX, Sparkles } from 'lucide-react';

// TikTok icon (Lucide doesn't have a direct TikTok icon, so we'll create a simple one or use a placeholder)
const TikTok = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 12v10a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2a2 2 0 0 1-2-2V2a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v6a2 2 0 0 1-2 2H9z" />
  </svg>
);

// Re-exporting Lucide icons with custom names for consistency
export const Instagram = LucideInstagram;
export const Pinterest = LucidePinterest;
export const X = LucideX;
export { TikTok, Sparkles };