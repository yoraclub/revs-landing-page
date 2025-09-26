import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "@/routes/paths";
import { useResponsive } from "@/hooks/use-mobile";

export default function PricingCard() {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  // Responsive positioning and scale configuration
  const getConfig = () => {
    if (isMobile) {
      return {
        background: { top: 0, left: 0, scale: 0.6 },
        freeForever: { top: 20, left: -30, scale: 0.6 },
        fastLane: { top: 80, left: 90, scale: 0.6 },
        pricing: { left: 8, bottom: 12, scale: 0.8 },
        arrow: { top: 200, left: 260, scale: 0.8 },
      };
    }
    if (isTablet) {
      return {
        background: { top: 0, left: 0, scale: 0.8 },
        freeForever: { top: 30, left: -45, scale: 0.8 },
        fastLane: { top: 120, left: 130, scale: 0.8 },
        pricing: { left: 12, bottom: 18, scale: 0.9 },
        arrow: { top: 300, left: 380, scale: 0.9 },
      };
    }
    return {
      background: { top: 0, left: 0, scale: 1.0 },
      freeForever: { top: 40, left: -60, scale: 1.0 },
      fastLane: { top: 160, left: 177, scale: 1.0 },
      pricing: { left: 16, bottom: 24, scale: 1.0 },
      arrow: { top: 405, left: 515, scale: 1.0 },
    };
  };

  const config = getConfig();
  return (
    <div className="relative flex items-center justify-center rounded-[24px] sm:rounded-[44px] overflow-hidden min-h-[280px] sm:min-h-[320px] lg:min-h-[400px]">
      <div
        className="absolute -z-0 bg-[radial-gradient(circle,rgba(0,0,0,0.25)_2px,transparent_2px)] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.25)_2px,transparent_2px)] [background-size:14px_14px] rounded-2xl"
        style={{
          top: config.background.top !== undefined ? `${config.background.top}px` : undefined,
          left: config.background.left !== undefined ? `${config.background.left}px` : undefined,
          width: `${256 * config.background.scale}px`,
          height: `${160 * config.background.scale}px`
        }}
      />
      <div className="relative z-10 w-full h-full">
        <div className="relative w-full h-full">
          {/* Fast Lane Pro card - positioned behind */}
          <div
            className="absolute z-10"
            style={{
              top: config.fastLane.top !== undefined ? `${config.fastLane.top}px` : undefined,
              left: config.fastLane.left !== undefined ? `${config.fastLane.left}px` : undefined
            }}
          >
            <svg width={320 * config.fastLane.scale} height={320 * config.fastLane.scale} viewBox="0 0 335 335" className="shadow-xl">
              <path
                d="M309.705 0C323.28 0 334.286 11.0048 334.286 24.5801V310.022C334.286 310.046 334.285 310.069 334.285 310.093V244.28C334.285 255.057 321.428 268.914 306 267.888C303.632 267.73 301.519 267.536 299.597 267.359C288.993 266.387 284.206 265.949 274.628 275.072C267.442 281.917 267.517 289.798 267.606 299.107C267.658 304.455 267.713 310.275 266.399 316.641C263.519 330.6 243.257 334.431 233.485 334.603H309.775C309.752 334.603 309.728 334.604 309.705 334.604H24.5801C11.0048 334.603 0 323.598 0 310.022V24.5801C0.000156221 11.0049 11.0049 0.000157896 24.5801 0H309.705Z"
                fill="#1f2937"
              />
              <foreignObject x="32" y="32" width="271" height="271">
                <div className="relative text-white h-full flex flex-col justify-center items-center text-center p-0">
                  <div className="absolute top-0 right-0 text-right">
                    <div className="font-numans text-sm opacity-70 mb-1">$4.99 / month</div>
                    <div className="font-numans text-sm opacity-70">$49.99 / year</div>
                  </div>
                  <div className="relative font-nevera text-2xl tracking-wide uppercase opacity-80 mb-4">Fast Lane (Pro)</div>
                  <p className="relative font-numans text-lg leading-relaxed opacity-90">Full race-day experience with real-time insights.</p>
                </div>
              </foreignObject>
            </svg>
          </div>
          {/* Free Forever card - positioned in front */}
          <div
            className="absolute z-20"
            style={{
              top: config.freeForever.top !== undefined ? `${config.freeForever.top}px` : undefined,
              left: config.freeForever.left !== undefined ? `${config.freeForever.left}px` : undefined
            }}
          >
            <svg width={320 * config.freeForever.scale} height={320 * config.freeForever.scale} viewBox="0 0 335 335" className="relative">
              <path
                d="M309.705 0C323.28 0 334.286 11.0048 334.286 24.5801V310.022C334.286 310.046 334.285 310.069 334.285 310.093V244.28C334.285 255.057 321.428 268.914 306 267.888C303.632 267.73 301.519 267.536 299.597 267.359C288.993 266.387 284.206 265.949 274.628 275.072C267.442 281.917 267.517 289.798 267.606 299.107C267.658 304.455 267.713 310.275 266.399 316.641C263.519 330.6 243.257 334.431 233.485 334.603H309.775C309.752 334.603 309.728 334.604 309.705 334.604H24.5801C11.0048 334.603 0 323.598 0 310.022V24.5801C0.000156221 11.0049 11.0049 0.000157896 24.5801 0H309.705Z"
                fill="#FF1801"
              />
              <foreignObject x="32" y="32" width="271" height="271">
                <div className="relative text-white h-full flex flex-col justify-center items-center text-center p-4">
                  <div className="relative font-nevera text-2xl tracking-wide uppercase opacity-80 mb-4">Free Forever</div>
                  <p className="relative font-numans text-lg leading-relaxed mb-6">Perfect for casual fans who want to stay connected to the race weekend.</p>
                </div>
              </foreignObject>
            </svg>
          </div>
          <div
            className="absolute"
            style={{
              left: config.pricing.left !== undefined ? `${config.pricing.left}px` : undefined,
              bottom: config.pricing.bottom !== undefined ? `${config.pricing.bottom}px` : undefined
            }}
          >
            <Link to={ROUTE_PATHS.PRICING} className={`relative font-nevera text-revz-red tracking-wide hover:text-revz-red/80 transition-colors ${isMobile ? 'text-2xl' : isTablet ? 'text-3xl' : 'text-4xl'}`}>
              PRICING
            </Link>
          </div>
        </div>
      </div>
      <div
        className="absolute"
        style={{
          top: config.arrow.top !== undefined ? `${config.arrow.top}px` : undefined,
          left: config.arrow.left !== undefined ? `${config.arrow.left}px` : undefined
        }}
      >
        <Link
          to={ROUTE_PATHS.PRICING}
          className="relative z-40 rounded-full border border-black/10 dark:border-white/20 flex items-center justify-center hover:scale-110 transition-transform"
          style={{
            width: `${48 * config.arrow.scale}px`,
            height: `${48 * config.arrow.scale}px`
          }}
        >
          <ArrowUpRight
            className="relative text-revz-red rotate-45"
            style={{
              width: `${24 * config.arrow.scale}px`,
              height: `${24 * config.arrow.scale}px`
            }}
          />
        </Link>
      </div>
    </div>
  );
}