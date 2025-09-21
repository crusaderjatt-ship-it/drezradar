import React from 'react';
import { Instagram, TikTok, Pinterest, X } from './icons'; // Assuming these icons will be created or imported from lucide-react
import { cn } from '@/lib/utils';

interface PlatformIconProps {
  platform: 'TikTok' | 'Instagram' | 'Pinterest' | 'X' | 'All';
  className?: string;
}

const PlatformIcon: React.FC<PlatformIconProps> = ({ platform, className }) => {
  const iconClasses = cn("h-5 w-5", className);

  switch (platform) {
    case 'TikTok':
      return <TikTok className={iconClasses} />;
    case 'Instagram':
      return <Instagram className={iconClasses} />;
    case 'Pinterest':
      return <Pinterest className={iconClasses} />;
    case 'X':
      return <X className={iconClasses} />;
    case 'All':
      return <Sparkles className={iconClasses} />; // Using Sparkles for 'All'
    default:
      return null;
  }
};

export default PlatformIcon;