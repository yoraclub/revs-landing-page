import { useEffect, useState } from "react";
import { getHelloMessage } from "@/api/hello";
import StoryCard from "@/components/Index/StoryCard";
import HeroCard from "@/components/Index/HeroCard";
import StatsCard from "@/components/Index/StatsCard";
import PricingCard from "@/components/Index/PricingCard";
import FeaturesSection from "@/components/Index/FeaturesSection";
import { AnimatedThemeToggler } from "@/components/animated-theme-toggler";

export default function Index() {
  const [mounted, setMounted] = useState(false);

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

  return (
    <div className="bg-background">
      {/* Theme Toggle */}
      <div className="fixed top-2 right-2 sm:top-4 sm:right-4 z-50">
        <AnimatedThemeToggler className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center transition-colors" />
      </div>

      {/* Main Grid (Hero + Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8 mx-2 mt-2 sm:mx-4 sm:mt-4 lg:mx-8 lg:mt-8">
        <StoryCard />
        <HeroCard />
        <StatsCard />
        <PricingCard />
      </div>

      <FeaturesSection />

    </div>
  );
}
