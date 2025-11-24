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
  const [viewportHeight, setViewportHeight] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const { isMobile, isTablet, device } = useResponsive();

  const handleScrollDown = () => {
    if (lenisRef.current && section2Ref.current) {
      lenisRef.current.scrollTo(section2Ref.current.offsetTop);
      setArrowClicked(true);
    }
  };

  useEffect(() => {
    setViewportHeight(window.innerHeight);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !wrapperRef.current || !contentRef.current) return;

    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    const viewportHeight = window.innerHeight;

    // Initialize Lenis with responsive settings
    const lenis = new Lenis({
      wrapper: wrapper,
      content: content,
      duration: isMobile ? 1.2 : isTablet ? 1.5 : 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: isMobile ? 1.2 : 0.8,
      touchMultiplier: isMobile ? 2 : isTablet ? 1.5 : 1,
      syncTouch: true,
      syncTouchLerp: isMobile ? 0.1 : 0.075,
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
      type: "proximity",
      debounce: isMobile ? 300 : 300,
      lerp: isMobile ? 0.1 : 0.05,
    });

    // Add snap points using actual DOM positions
    if (section1Ref.current) snap.add(section1Ref.current.offsetTop);
    // if (section2Ref.current) snap.add(section2Ref.current.offsetTop);
    if (section3Ref.current) snap.add(section3Ref.current.offsetTop);

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
    <div ref={wrapperRef} className="overflow-y-auto bg-background" style={{ height: viewportHeight }}>
      <div ref={contentRef}>
        {/* Background gradient */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-revz-red/5 rounded-full blur-3xl" />
        </div>

        <div ref={section1Ref}>
          <LogoSection arrowClicked={arrowClicked} onScrollDown={handleScrollDown} isMobile={isMobile} isTablet={isTablet} height={viewportHeight} />
        </div>
        <div ref={section2Ref}>
          <TeaseSection isMobile={isMobile} height={viewportHeight} scrollContainer={wrapperRef} />
        </div>
        <div ref={section3Ref}>
          <EmailSignupSection isMobile={isMobile} isTablet={isTablet} height={viewportHeight} />
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
