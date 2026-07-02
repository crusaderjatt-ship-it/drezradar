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
  const insRef = useRef<HTMLElement>(null);
  const [hasContent, setHasContent] = useState(false);

  useEffect(() => {
    if (!adContainerRef.current) return;

    // Check for ad content multiple times with increasing delays
    const checkForContent = () => {
      if (insRef.current) {
        const height = insRef.current.offsetHeight;
        const innerHTML = insRef.current.innerHTML;
        // Has content if height > 50px OR has child elements (ads loaded)
        const hasAds = height > 50 || innerHTML.includes('iframe') || innerHTML.includes('img');
        setHasContent(hasAds);
      }
    };

    // Initial check
    checkForContent();

    // Re-check after ad loading delays
    const timeouts = [
      setTimeout(checkForContent, 500),
      setTimeout(checkForContent, 1000),
      setTimeout(checkForContent, 2000),
      setTimeout(checkForContent, 3000),
    ];

    // Use ResizeObserver for continuous monitoring
    const resizeObserver = new ResizeObserver(() => {
      checkForContent();
    });

    if (adContainerRef.current) {
      resizeObserver.observe(adContainerRef.current);
    }

    return () => {
      timeouts.forEach(t => clearTimeout(t));
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <>
      {/* Only render container if has content, completely hide otherwise */}
      {hasContent && (
        <div
          className={`
            ad-container
            min-h-[90px]
            overflow-hidden
            transition-all duration-300 ease-in-out
            ${className}
          `}
          ref={adContainerRef}
        >
          <ins
            ref={insRef}
            className="adsbygoogle"
            style={{
              display: 'block',
            }}
            data-ad-client="ca-pub-7039562928200716"
            data-ad-slot={adSlot}
            data-ad-format={adFormat}
            data-full-width-responsive="true"
          ></ins>
        </div>
      )}
    </>
  );
};

export default SmartAdPlaceholder;
