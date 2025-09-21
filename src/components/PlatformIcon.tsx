import React from "react";
import { Instagram, Pinterest, X, Youtube, Globe } from "lucide-react"; // Using Youtube as a stand-in for TikTok for now, as lucide doesn't have a direct TikTok icon.
import { cn } from "@/lib/utils";
import { Platform } from "@/types/drezradar";

interface PlatformIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  platform: Platform;
  size?: number;
}

const PlatformIcon: React.FC<PlatformIconProps> = ({ platform, size = 16, className, ...props }) => {
  const iconClasses = cn("inline-block", className);

  switch (platform) {
    case "TikTok":
      return <Youtube size={size} className={cn("text-black dark:text-white", iconClasses)} {...props} />; // Using Youtube as a placeholder for TikTok
    case "Instagram":
      return <Instagram size={size} className={cn("text-pink-500", iconClasses)} {...props} />;
    case "Pinterest":
      return <Pinterest size={size} className={cn("text-red-600", iconClasses)} {...props} />;
    case "X":
      return <X size={size} className={cn("text-black dark:text-white", iconClasses)} {...props} />;
    case "All":
    default:
      return <Globe size={size} className={cn("text-gray-500", iconClasses)} {...props} />;
  }
};

export default PlatformIcon;