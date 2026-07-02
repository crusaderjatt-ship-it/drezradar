import React, { useEffect, useRef, useState } from 'react';

interface SmartAdPlaceholderProps {
  adSlot: string;
  adFormat?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  className?: string;
}

/**
 * Smart ad placeholder that automatically collapses when no ads are present
 * and expands when ads load. Uses ResizeObserver to detect ad content.
 */
const SmartAdPlaceholder: React.FC<SmartAdPlaceholderProps> = ({
  adSlot,
  adFormat = 'auto',
  className = '',
}) => {
  const adContainerRef = useRef<HTMLDivElement>(null);
  const [hasContent, setHasContent] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    if (!adContainerRef.current) return;

    // Use ResizeObserver to detect when ad content is loaded
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const height = entry.contentRect.height;
        setContainerHeight(height);
        // Consider it "has content" if height is more than 50px
        setHasContent(height > 50);
      }
    });

    resizeObserver.observe(adContainerRef.current);

    // Also check after a delay in case ResizeObserver doesn't catch the initial load
    const checkTimeout = setTimeout(() => {
      if (adContainerRef.current) {
        const height = adContainerRef.current.offsetHeight;
        setContainerHeight(height);
        setHasContent(height > 50);
      }
    }, 1000);

    // Push ads after component mounts
    try {
      if (window.adsbygoogle) {
        (window.adsbygoogle as any[]).push({});
      }
    } catch (e) {
      console.error('AdSense push failed:', e);
    }

    return () => {
      resizeObserver.disconnect();
      clearTimeout(checkTimeout);
    };
  }, []);

  return (
    <div
      className={`
        ad-container
        ${hasContent ? 'min-h-[100px]' : 'min-h-0'}
        overflow-hidden
        transition-all duration-300 ease-in-out
        ${className}
      `}
    >
      <div
        ref={adContainerRef}
        className="w-full"
        style={{
          height: hasContent ? 'auto' : '0px',
          overflow: 'hidden',
        }}
      >
        <ins
          className="adsbygoogle"
          style={{
            display: 'block',
            minHeight: hasContent ? 'auto' : '0px',
          }}
          data-ad-client="ca-pub-7039562928200716"
          data-ad-slot={adSlot}
          data-ad-format={adFormat}
          data-full-width-responsive="true"
        ></ins>
      </div>
    </div>
  );
};

export default SmartAdPlaceholder;
