import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "@/routes/paths";
import { AnimatedThemeToggler } from "@/components/animated-theme-toggler";
import { useEffect, useState, useRef, RefObject } from "react";

interface BottomNavigationProps {
  footerRef: RefObject<HTMLElement>;
}

export default function BottomNavigation({ footerRef }: BottomNavigationProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [mergeProgress, setMergeProgress] = useState(0); // 0 to 1, represents merge animation progress
  const [lastScrollY, setLastScrollY] = useState(0);
  const hideTimeoutRef = useRef<number | null>(null);

  // Intersection Observer to detect footer visibility
  useEffect(() => {
    if (!footerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsFooterVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of footer is visible
        rootMargin: "0px 0px -50px 0px", // Slight offset from bottom
      }
    );

    observer.observe(footerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [footerRef]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = currentScrollY - lastScrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Calculate distance to footer
      const distanceFromBottom = documentHeight - (currentScrollY + windowHeight);

      // Merge zone: start merging when within 300px of footer
      const mergeZone = 300;
      const progress = Math.max(0, Math.min(1, 1 - distanceFromBottom / mergeZone));
      setMergeProgress(progress);

      // Clear any existing hide timeout
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }

      // Never show when footer is visible
      if (isFooterVisible) {
        setIsVisible(false);
        return;
      }

      // Always show at the top of the page
      if (currentScrollY < 50) {
        setIsVisible(true);
      }
      // Show when scrolling up (not in footer zone)
      else if (scrollDifference < -10 && !isFooterVisible) {
        setIsVisible(true);
        // Auto-hide after 3 seconds of no scrolling
        hideTimeoutRef.current = window.setTimeout(() => {
          if (!isFooterVisible) {
            setIsVisible(false);
          }
        }, 3000);
      }
      // Hide when scrolling down
      else if (scrollDifference > 10) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    // Show initially, then hide after 3 seconds if not at top
    hideTimeoutRef.current = window.setTimeout(() => {
      if (window.scrollY >= 50 && !isFooterVisible) {
        setIsVisible(false);
      }
    }, 3000);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [lastScrollY, isFooterVisible]);

  // Calculate merge transformation values
  const scale = 1 + mergeProgress * 0.3; // Scale from 1 to 1.3
  const borderRadius = 50 - mergeProgress * 50; // From 50px (pill) to 0px (rectangle)
  const finalOpacity = 1 - mergeProgress * 0.7; // Fade out as merging (keep some opacity for smooth transition)
  const paddingMultiplier = 1 - mergeProgress; // Reduce padding as merging

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
        isVisible && !isFooterVisible
          ? "translate-y-0"
          : "translate-y-full pointer-events-none"
      }`}
      style={{
        paddingLeft: `${8 * paddingMultiplier}px`,
        paddingRight: `${8 * paddingMultiplier}px`,
        paddingBottom: `${16 * paddingMultiplier}px`,
        opacity: isVisible && !isFooterVisible ? 1 : 0,
      }}
    >
      <div
        className="relative flex items-center py-4 px-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-700 ease-out origin-bottom"
        style={{
          transform: `scale(${scale}) translateZ(0)`,
          borderRadius: `${borderRadius}px`,
          opacity: finalOpacity,
        }}
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
          <div className="w-32 h-[38px] sm:w-40 sm:h-[47px] text-gray-900 dark:text-white">
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
        <div className="ml-auto">
          <Link
            to={ROUTE_PATHS.MOBILE_APP}
            className="bg-revz-red hover:bg-revz-red/90 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full font-nevera text-xs sm:text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 inline-block shadow-lg"
          >
            Download App
          </Link>
        </div>
      </div>
    </div>
  );
}