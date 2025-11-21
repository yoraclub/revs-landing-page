import { useState, useEffect, useRef } from "react";
import LogoSection from "@/components/coming-soon/LogoSection";
import TeaseSection from "@/components/coming-soon/TeaseSection";
import EmailSignupSection from "@/components/coming-soon/EmailSignupSection";
import Lenis from "lenis";
import Snap from "lenis/snap";

const ComingSoon = () => {
  const [mounted, setMounted] = useState(false);
  const [arrowClicked, setArrowClicked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

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

    // Initialize Lenis for ultra-smooth, slow scrolling
    const lenis = new Lenis({
      wrapper: container,
      content: container,
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 0.8,
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
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="h-screen overflow-y-auto bg-background">
      {/* Background gradient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-revz-red/5 rounded-full blur-3xl" />
      </div>

      <LogoSection arrowClicked={arrowClicked} onScrollDown={handleScrollDown} />
      <TeaseSection />
      <EmailSignupSection />
    </div>
  );
};

export default ComingSoon;
