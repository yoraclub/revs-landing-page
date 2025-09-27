import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "@/routes/paths";
import { useResponsive } from "@/hooks/use-mobile";

export default function FeaturesSection() {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  const getContainerClasses = () => {
    if (isMobile) return "mt-4";
    if (isTablet) return "mt-6";
    return "mt-8";
  };

  const getCardClasses = () => {
    if (isMobile) return "rounded-[24px] px-6 py-8";
    if (isTablet) return "rounded-[32px] px-10 py-12";
    return "rounded-[44px] px-16 py-16";
  };

  const getGridClasses = () => {
    if (isMobile) return "grid-cols-1 gap-8";
    if (isTablet) return "grid-cols-2 gap-10";
    return "grid-cols-4 gap-12";
  };

  return (
    <div className={getContainerClasses()}>
      <div className={`bg-gray-50 dark:bg-gray-900 ${getCardClasses()}`}>
        <div className={`grid ${getGridClasses()}`}>
          {/* Feature 01 */}
          <div className="relative">
            <div className="text-6xl font-nevera text-gray-200 dark:text-white/10 absolute -top-4 -left-2">01</div>
            <div className="relative z-10">
              <h4 className="font-nevera text-lg tracking-wide uppercase text-gray-900 dark:text-white mb-4">
                Live Race Tracking
              </h4>
              <p className="font-numans text-gray-700 dark:text-gray-300 leading-relaxed">
                Follow every moment of the race with instant updates. From lap times to sector splits and pit stop strategies, Revz keeps you right on pace with the action as it unfolds.
              </p>
            </div>
          </div>

          {/* Feature 02 */}
          <div className="relative">
            <div className="text-6xl font-nevera text-gray-200 dark:text-white/10 absolute -top-4 -left-2">02</div>
            <div className="relative z-10">
              <h4 className="font-nevera text-lg tracking-wide uppercase text-gray-900 dark:text-white mb-4">
                Personalises Feed
              </h4>
              <p className="font-numans text-gray-700 dark:text-gray-300 leading-relaxed">
                Get the updates that matter most to you. Choose your favorite drivers and teams, and Revz delivers tailored news, stats, and race alerts directly to your feed.
              </p>
            </div>
          </div>

          {/* Feature 03 */}
          <div className="relative">
            <div className="text-6xl font-nevera text-gray-200 dark:text-white/10 absolute -top-4 -left-2">03</div>
            <div className="relative z-10">
              <h4 className="font-nevera text-lg tracking-wide uppercase text-gray-900 dark:text-white mb-4">
                Interactive Circuit Maps
              </h4>
              <p className="font-numans text-gray-700 dark:text-gray-300 leading-relaxed">
                Experience the race like never before. Track driver positions in real time, watch overtakes happen on the map, and stay informed on incidents and safety car deployments.
              </p>
            </div>
          </div>

          {/* Feature 04 */}
          <div className="relative">
            <div className="text-6xl font-nevera text-gray-200 dark:text-white/10 absolute -top-4 -left-2">04</div>
            <div className="relative z-10">
              <h4 className="font-nevera text-lg tracking-wide uppercase text-gray-900 dark:text-white mb-4">
                Stats Hub
              </h4>
              <p className="font-numans text-gray-700 dark:text-gray-300 leading-relaxed">
                Dive into the numbers behind the speed. Explore driver and constructor standings, tire strategies, historical race data, and season records — all in one place.
              </p>
            </div>
            <div className="absolute -bottom-8 -right-4">
              <Link
                to={ROUTE_PATHS.FEATURES}
                className="w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform"
              >
                <ArrowUpRight className="w-6 h-6 text-revz-red transform rotate-45" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}