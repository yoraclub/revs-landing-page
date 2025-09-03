import { Play, Twitter, Instagram, Facebook, Menu, ArrowUpRight, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Index() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-revz-dark">
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

      {/* Bottom Navigation */}
      <div className="mx-2 mt-4 mb-4 sm:mx-4 sm:mt-8 sm:mb-8 lg:mx-8">
        <div className="flex items-center justify-between py-6">
          {/* Menu */}
          <button className="lg:hidden">
            <Menu className="w-6 h-6 text-gray-900 dark:text-white" />
          </button>

          {/* Logo */}
          <div className="flex-1 flex justify-center">
            <div className="w-40 h-[47px] text-gray-900 dark:text-white">
              <svg viewBox="0 0 180 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0)">
                  <mask id="m0" style={{maskType:'luminance'}} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="47">
                    <path d="M180 0H0V47H180V0Z" fill="white"/>
                  </mask>
                  <g mask="url(#m0)">
                    <mask id="m1" style={{maskType:'luminance'}} maskUnits="userSpaceOnUse" x="0" y="0" width="42" height="47">
                      <path d="M41.1778 0H0V46.9491H41.1778V0Z" fill="white"/>
                    </mask>
                    <g mask="url(#m1)">
                      <path d="M23.6638 19.5425C28.406 19.5425 31.0407 17.3126 31.0407 13.2631C31.0407 9.27246 28.406 7.04236 23.6638 7.04236H0.128052V0H23.6638C34.0267 0 39.8227 4.75359 39.8227 13.2631C39.8227 20.8336 35.3731 25.4112 27.118 26.4088L40.9934 46.9491H31.0994L17.3994 26.585H16.5211C11.2519 26.585 8.3246 29.5194 8.3246 34.8009V46.9491H0.128052V34.8009C0.128052 25.0004 5.98272 19.5425 16.5211 19.5425H23.6638Z" fill="currentColor"/>
                    </g>
                    <path d="M81.9111 17.1951V24.2375H64.4639C59.1945 24.2375 56.2675 27.172 56.2675 32.4538V39.9069H83.0818V46.9491H48.0708V33.6272C48.0708 23.0638 53.9257 17.1951 64.4639 17.1951H81.9111Z" fill="currentColor"/>
                    <path d="M48.0428 0V7.04236L83.0731 7.14018V0H48.0428Z" fill="#FF1801"/>
                    <path d="M106.872 46.9491L89.8933 0H98.6166L110.97 34.1553L123.323 0H132.047L115.068 46.9491H106.872Z" fill="currentColor"/>
                    <path d="M162.426 17.4293C161.909 18.1695 161.637 18.7634 161.526 19.195C161.465 19.4353 161.453 19.6309 161.481 19.7747C161.508 19.917 161.581 20.029 161.707 20.0533C161.825 20.0761 161.951 20.0116 162.063 19.9027C162.176 19.7907 162.291 19.618 162.393 19.3853C162.576 18.974 162.722 18.3658 162.754 17.547L165.948 24.3566C163.797 23.6101 162.42 23.3368 161.637 23.3283C161.435 23.3261 161.27 23.3414 161.139 23.372C161.009 23.4022 160.908 23.4491 160.84 23.5155C160.77 23.5852 160.741 23.6724 160.754 23.7661C160.766 23.8552 160.817 23.9437 160.889 24.0271C161.032 24.1945 161.286 24.3661 161.613 24.5157C161.943 24.6662 162.354 24.7974 162.823 24.8804C163.55 25.0089 164.415 25.022 165.325 24.8101L154.621 30.4367C151.283 32.1449 149.356 33.3941 148.264 34.4448C147.717 34.9711 147.377 35.4499 147.174 35.914C146.972 36.3786 146.908 36.8243 146.908 37.2809C146.908 38.2012 147.255 38.908 147.975 39.3801C148.69 39.8486 149.762 40.0807 151.202 40.0807H179.695V46.8701H151.612C147.524 46.8701 144.338 45.9606 142.175 44.303C140.016 42.6474 138.869 40.2401 138.869 37.2228C138.869 34.6047 139.537 32.351 141.368 30.1524C143.202 27.9501 146.206 25.7992 150.887 23.3983L162.426 17.4293Z" fill="currentColor" stroke="currentColor"/>
                    <path d="M156.321 29.5472C156.836 28.8087 157.108 28.2157 157.218 27.785C157.279 27.5443 157.292 27.3491 157.264 27.2052C157.236 27.0629 157.162 26.9506 157.037 26.9266C156.918 26.9036 156.793 26.9682 156.682 27.0771C156.568 27.189 156.453 27.362 156.35 27.5944C156.169 28.005 156.023 28.6119 155.991 29.4287L152.796 22.5172C154.947 23.2639 156.324 23.5374 157.108 23.5459C157.31 23.5481 157.475 23.5328 157.605 23.5024C157.734 23.4721 157.837 23.4251 157.904 23.3587C157.975 23.289 158.003 23.2019 157.991 23.1082C157.977 23.019 157.926 22.9306 157.856 22.847C157.711 22.6799 157.459 22.5081 157.131 22.3584C156.802 22.2078 156.39 22.0767 155.921 21.9938C155.196 21.8656 154.333 21.8523 153.425 22.0629L164.027 16.512C167.364 14.8039 169.291 13.5549 170.383 12.5042C170.929 11.978 171.269 11.4993 171.472 11.0352C171.675 10.5705 171.74 10.125 171.74 9.6684C171.74 8.74782 171.392 8.04117 170.671 7.56892C169.957 7.1006 168.885 6.86844 167.444 6.86844H138.953V0.0788574H167.035C171.123 0.0788574 174.309 0.988648 176.472 2.64624C178.631 4.30167 179.778 6.70911 179.778 9.7263C179.778 12.3443 179.109 14.5982 177.279 16.7968C175.445 18.999 172.441 21.1498 167.76 23.5508L156.321 29.5472Z" fill="currentColor" stroke="currentColor"/>
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="180" height="47" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>

          {/* Download Button */}
          <button className="bg-revz-red hover:bg-revz-red/90 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full font-nevera text-xs sm:text-sm uppercase tracking-widest transition-colors">
            Download App
          </button>
        </div>
      </div>
    </div>
  );
}
