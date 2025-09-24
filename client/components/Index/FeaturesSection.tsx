import { ArrowUpRight } from "lucide-react";

export default function FeaturesSection() {
  return (
    <div className="mx-2 mt-4 sm:mx-4 sm:mt-8 lg:mx-8">
      <div className="bg-gray-50 dark:bg-gray-900 rounded-[24px] sm:rounded-[44px] px-4 py-8 sm:px-8 sm:py-16 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
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
            <div className="absolute -top-8 -right-4">
              <div className="w-12 h-12 flex items-center justify-center">
                <ArrowUpRight className="w-6 h-6 text-revz-red transform rotate-45" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}