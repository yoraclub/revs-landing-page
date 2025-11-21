import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "@/routes/paths";
import { AnimatedThemeToggler } from "@/components/animated-theme-toggler";
import { Logo } from "@/components/Logo";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TopNavigation() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFloaty, setIsFloaty] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const hideTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = currentScrollY - lastScrollY;

      // Track scroll direction
      const scrollingUp = scrollDifference < -5;
      const scrollingDown = scrollDifference > 5;

      // Clear any existing hide timeout
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }

      // Determine visibility and floaty state
      if (currentScrollY < 100) {
        // At top: show and stick to top (not floaty)
        setIsVisible(true);
        setIsFloaty(false);
      } else if (scrollingUp) {
        // Scrolling up: show and make floaty
        setIsVisible(true);
        setIsFloaty(true);

        // Auto-hide after 3 seconds of no scrolling
        hideTimeoutRef.current = window.setTimeout(() => {
          if (window.scrollY >= 100) {
            setIsVisible(false);
          }
        }, 3000);
      } else if (scrollingDown) {
        // Scrolling down: hide
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Run once on mount to set initial state
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [lastScrollY]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="top-nav"
          initial={{ y: -100, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed top-0 left-0 right-0 z-50"
        >
          <motion.div
            animate={{
              paddingLeft: isFloaty ? 8 : 0,
              paddingRight: isFloaty ? 8 : 0,
              paddingTop: isFloaty ? 16 : 0,
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              animate={{
                borderRadius: isFloaty ? 9999 : 0,
                borderTopWidth: isFloaty ? 1 : 0,
                borderBottomWidth: isFloaty ? 1 : 1,
                borderLeftWidth: isFloaty ? 1 : 0,
                borderRightWidth: isFloaty ? 1 : 0,
                boxShadow: isFloaty
                  ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                  : "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center py-4 px-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50"
            >
            {/* Theme Toggle */}
            <div className="mr-3 sm:mr-4">
              <AnimatedThemeToggler className="w-10 h-10 sm:w-12 sm:h-12 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors" />
            </div>

            {/* Menu */}
            <button className="lg:hidden hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full p-2 transition-colors">
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900 dark:text-white" />
            </button>

            {/* Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Logo className="w-32 h-[38px] sm:w-40 sm:h-[47px]" />
            </div>

            {/* Download Button */}
            <div className="ml-auto">
              <Link
                to={ROUTE_PATHS.MOBILE_APP}
                className="bg-revz-red hover:bg-revz-red/90 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full font-nevera text-xs sm:text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 inline-block shadow-lg"
              >
                Download App
              </Link>
            </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
