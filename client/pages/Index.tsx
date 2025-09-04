import { Play, Twitter, Instagram, Facebook, ArrowUpRight, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { getHelloMessage } from "@/api/hello";

export default function Index() {
  const { theme, setTheme } = useTheme();
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
    <div>
      {/* Theme Toggle */}
      <div className="fixed top-2 right-2 sm:top-4 sm:right-4 z-50">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center transition-colors"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5 text-yellow-500" />
          ) : (
            <Moon className="w-5 h-5 text-gray-700" />
          )}
        </button>
      </div>

      {/* Main Grid (Hero + Cards) */}
      {/* Who We Are Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8 mx-2 mt-2 sm:mx-4 sm:mt-4 lg:mx-8 lg:mt-8">
        {/* Left: Story Card - spans full height */}
        <div className="relative rounded-[24px] sm:rounded-[44px] overflow-hidden bg-black min-h-[400px] sm:min-h-[500px] lg:row-span-2 h-full">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/9f6323c242bb1e859cb1fa7656e09a3e7a33035a?width=1160"
              alt="Formula 1 racing background"
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          </div>

          {/* Play Button */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <button className="w-20 h-20 bg-revz-red/80 rounded-full flex items-center justify-center hover:bg-revz-red transition-colors">
              <Play className="w-8 h-8 text-white ml-1" fill="white" />
            </button>
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h2 className="text-white font-nevera text-3xl lg:text-4xl mb-4 leading-tight">
              Who We Are & Our Story
            </h2>
            <p className="text-white/90 font-numans text-base leading-relaxed">
              <span className="text-revz-red font-nevera">REVZ</span> is built by racing enthusiasts for racing enthusiasts. We're a team of fans, designers, and technologists united by one passion: Formula 1. Our mission is simple ...
              <span className="text-revz-red font-nevera ml-2">Read More →</span>
            </p>
          </div>
        </div>

        {/* Hero Card (spans 2 cols) */}
        <div className="relative rounded-[24px] sm:rounded-[44px] overflow-hidden bg-black min-h-[260px] sm:min-h-[320px] lg:min-h-[389px] lg:col-span-2">
          <div className="absolute inset-0">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/488c2b39b92ddf59540f7aec11b62764ebebb92b?width=1586"
              alt="Formula 1 car background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          </div>
          <div className="relative z-10 px-6 py-8 sm:px-8 sm:py-12 lg:px-16 lg:py-14">
            <div className="max-w-2xl">
              <h1 className="text-white font-nevera text-2xl sm:text-3xl lg:text-5xl leading-tight mb-6 sm:mb-8">
                The ultimate Formula 1 companion app. built for fans in the fast lane.
              </h1>
              <button className="bg-revz-red hover:bg-revz-red/90 text-white px-8 py-4 rounded-full font-nevera text-sm uppercase tracking-widest transition-colors">
                Download App
              </button>
            </div>
          </div>
        </div>

        {/* Right Top: Stats Card */}
        <div className="rounded-[24px] sm:rounded-[44px] bg-revz-red text-white p-6 sm:p-8 min-h-[400px] sm:min-h-[500px] relative overflow-hidden lg:col-start-2 lg:row-start-2">
          {/* Decorative background elements */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
              <path d="M-50 200C100 100, 200 300, 350 200C500 100, 600 300, 750 200" stroke="white" strokeWidth="2" opacity="0.3"/>
              <path d="M-50 250C100 150, 200 350, 350 250C500 150, 600 350, 750 250" stroke="white" strokeWidth="2" opacity="0.2"/>
            </svg>
          </div>

          <div className="relative z-10">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 mb-12">
              <div>
                <div className="text-sm font-numans opacity-80 mb-1">Active users</div>
                <div className="text-2xl font-numans font-bold">5000+</div>
              </div>
              <div>
                <div className="text-sm font-numans opacity-80 mb-1">Download</div>
                <div className="text-2xl font-numans font-bold">30.3k</div>
              </div>
            </div>

            {/* Main heading */}
            <div className="text-center mb-12">
              <h3 className="font-nevera text-3xl lg:text-4xl leading-tight">
                TRUSTED<br />WORLD WIDE
              </h3>
            </div>

            {/* Reviews stat */}
            <div className="mb-8">
              <div className="text-sm font-numans opacity-80 mb-1">Reviews</div>
              <div className="text-2xl font-numans font-bold">1200+</div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 justify-center">
              <div className="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center">
                <Twitter className="w-5 h-5" />
              </div>
              <div className="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center">
                <Instagram className="w-5 h-5" />
              </div>
              <div className="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center">
                <Facebook className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Bottom: Mini Cards + Dotted Grid */}
        <div className="relative hidden lg:flex items-center justify-center lg:col-start-3 lg:row-start-2">
          <div className="absolute -z-0 w-64 h-40 -top-6 left-6 bg-[radial-gradient(circle,rgba(0,0,0,0.25)_2px,transparent_2px)] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.25)_2px,transparent_2px)] [background-size:14px_14px] rounded-2xl" />
          <div className="z-10">
            <div className="flex gap-6 items-stretch">
              <div className="bg-revz-red text-white rounded-[24px] px-6 py-6 w-[260px] shadow-xl">
                <div className="font-nevera text-sm tracking-wide uppercase opacity-80 mb-1">Free Forever</div>
                <p className="font-numans text-sm leading-relaxed">Perfect for casual fans who want to stay connected to the race weekend.</p>
              </div>
              <div className="bg-gray-900 text-white rounded-[24px] px-6 py-6 w-[260px] shadow-xl">
                <div className="font-nevera text-sm tracking-wide uppercase opacity-80 mb-1">Fast Lane (Pro)</div>
                <p className="font-numans text-sm leading-relaxed opacity-90">Full race-day experience with real-time insights.</p>
                <div className="font-numans text-xs opacity-70 mt-2">$4.99 / month • $49.99 / year</div>
              </div>
            </div>
            <div className="font-nevera text-xl text-revz-red tracking-wide mt-4">PRICING</div>
          </div>
          <div className="absolute right-0 -mr-6">
            <button className="w-12 h-12 rounded-full border border-black/10 dark:border-white/20 flex items-center justify-center">
              <ArrowUpRight className="w-6 h-6 text-revz-red rotate-45" />
            </button>
          </div>
        </div>
      </div>


      {/* Features Section */}
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
              {/* Arrow icon */}
              <div className="absolute -top-8 -right-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  <ArrowUpRight className="w-6 h-6 text-revz-red transform rotate-45" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
