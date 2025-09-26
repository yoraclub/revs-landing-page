import { useEffect, useState } from "react";
import { getHelloMessage } from "@/api/hello";
import { useResponsive } from "@/hooks/use-mobile";
import StoryCard from "@/components/Index/StoryCard";
import HeroCard from "@/components/Index/HeroCard";
import StatsCard from "@/components/Index/StatsCard";
import PricingCard from "@/components/Index/PricingCard";
import FeaturesSection from "@/components/Index/FeaturesSection";

export default function Index() {
  const [mounted, setMounted] = useState(false);
  const { isMobile, isTablet, isDesktop } = useResponsive();

  useEffect(() => {
    setMounted(true);

    // Test API connection
    const testAPI = async () => {
      try {
        const data = await getHelloMessage();
        console.log('API Connected:', data.message);
      } catch (error) {
        console.error('API Error:', error);
      }
    };

    testAPI();
  }, []);

  if (!mounted) {
    return null;
  }

  const getContainerClasses = () => {
    if (isMobile) return 'w-full px-4 py-4';
    if (isTablet) return 'w-full max-w-[900px] px-6 py-6';
    return 'w-full max-w-[1440px] px-8 py-8';
  };

  const getGridClasses = () => {
    if (isMobile) return 'grid grid-cols-1 gap-4';
    if (isTablet) return 'grid grid-cols-2 gap-6';
    return 'grid grid-cols-3 gap-8';
  };

  return (
    <div className="bg-background min-h-screen flex justify-center">
      <div className={getContainerClasses()}>
        {/* Main Grid (Hero + Cards) */}
        <div className={getGridClasses()}>
          <StoryCard />
          <HeroCard />
          <StatsCard />
          <PricingCard />
        </div>

        <FeaturesSection />
      </div>
    </div>
  );
}
