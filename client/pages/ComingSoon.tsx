import { useState, useEffect, useRef } from "react";
import LogoSection from "@/components/coming-soon/LogoSection";
import TeaseSection from "@/components/coming-soon/TeaseSection";
import EmailSignupSection from "@/components/coming-soon/EmailSignupSection";
import Lenis from "lenis";
import Snap from "lenis/snap";
import { useResponsive } from "@/hooks/use-mobile";

const ComingSoon = () => {
  const [mounted, setMounted] = useState(false);
  const [arrowClicked, setArrowClicked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const { isMobile, isTablet, device } = useResponsive();

  const handleScrollDown = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(window.innerHeight);
      setArrowClicked(true);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const container = containerRef.current;
    const viewportHeight = window.innerHeight;

    // Initialize Lenis with responsive settings
    const lenis = new Lenis({
      wrapper: container,
      content: container,
      duration: isMobile ? 1.5 : isTablet ? 1.8 : 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: isMobile ? 1.2 : 0.8,
      touchMultiplier: isMobile ? 1.5 : isTablet ? 1.2 : 0.8,
    });
    lenisRef.current = lenis;

    // Hide arrow on scroll (with threshold)
    let initialScroll = true;
    lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      if (initialScroll) {
        initialScroll = false;
        return;
      }
      if (scroll > 50) {
        setArrowClicked(true);
      }
    });

    // Initialize Snap with Lenis
    const snap = new Snap(lenis, {
      type: "mandatory",
    });

    // Add snap points for each section
    snap.add(0);
    snap.add(viewportHeight);
    snap.add(viewportHeight * 2);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      snap.destroy();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [mounted, isMobile, isTablet]);

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="h-screen overflow-y-auto bg-background">
      {/* Background gradient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-revz-red/5 rounded-full blur-3xl" />
      </div>

      <LogoSection arrowClicked={arrowClicked} onScrollDown={handleScrollDown} isMobile={isMobile} isTablet={isTablet} />
      <TeaseSection isMobile={isMobile} />
      <EmailSignupSection isMobile={isMobile} isTablet={isTablet} />
    </div>
  );
};

export default ComingSoon;
