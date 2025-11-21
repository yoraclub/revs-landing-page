import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "@/routes/paths";
import { AnimatedThemeToggler } from "@/components/animated-theme-toggler";
import { Logo } from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50"
    >
      <div className="mx-auto px-4 sm:px-8 lg:px-16 py-12">
        <div className="space-y-8">
          {/* Top Section - Logo and CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center gap-4">
              <Logo className="w-48 h-[56px]" />
            </div>
            <Link
              to={ROUTE_PATHS.MOBILE_APP}
              className="bg-revz-red hover:bg-revz-red/90 text-white px-8 py-4 rounded-full font-nevera text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-lg"
            >
              Download App
            </Link>
          </div>

          {/* Middle Section - Links and Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-6">
            {/* Column 1 - About */}
            <div className="space-y-4">
              <h3 className="font-nevera text-gray-900 dark:text-white uppercase tracking-wider text-sm font-bold">
                About REVZ
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-numans leading-relaxed text-sm">
                Your ultimate Formula 1 companion for live timing, race insights, and team analytics.
              </p>
            </div>

            {/* Column 2 - Quick Links */}
            <div className="space-y-4">
              <h3 className="font-nevera text-gray-900 dark:text-white uppercase tracking-wider text-sm font-bold">
                Quick Links
              </h3>
              <ul className="space-y-3 font-numans text-sm">
                <li>
                  <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-revz-red dark:hover:text-revz-red transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to={ROUTE_PATHS.MOBILE_APP} className="text-gray-600 dark:text-gray-400 hover:text-revz-red dark:hover:text-revz-red transition-colors">
                    Download
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3 - Theme & Settings */}
            <div className="space-y-4">
              <h3 className="font-nevera text-gray-900 dark:text-white uppercase tracking-wider text-sm font-bold">
                Settings
              </h3>
              <div className="flex items-center gap-3">
                <span className="text-gray-600 dark:text-gray-400 font-numans text-sm">Theme</span>
                <AnimatedThemeToggler className="w-12 h-12 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors" />
              </div>
            </div>
          </div>

          {/* Bottom Section - Copyright */}
          <div className="pt-6 border-t border-gray-200/50 dark:border-gray-700/50 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-500 font-numans">
              © {new Date().getFullYear()} REVZ. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
