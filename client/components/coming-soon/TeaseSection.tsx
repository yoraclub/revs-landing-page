import { useRef, useState, useEffect, RefObject } from "react";
import Lenis from "lenis";

interface TeaseSectionProps {
  isMobile: boolean;
  height: number;
  scrollContainer: RefObject<HTMLDivElement | null>;
  lenisRef: RefObject<Lenis | null>;
}

// Animation constants
const SCALE_MULTIPLIER = 5;
const MORPH_DELAY_MS = 500;
const PAUSE_DURATION_MS = 3000;
const UNMORPH_THRESHOLD = 0.95;
const TRANSITION_EASING = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";

const TeaseSection = ({ isMobile, height, scrollContainer, lenisRef }: TeaseSectionProps) => {
  // Refs
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef<HTMLDivElement>(null);
  const hasPausedRef = useRef(false);
  const isMorphingRef = useRef(false);

  // State
  const [svgMask, setSvgMask] = useState("");
  const [isMorphed, setIsMorphed] = useState(false);

  // Generate SVG text mask
  useEffect(() => {
    const updateSvgMask = () => {
      const fontSize = "12vw";
      const svg = `
        <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
          <text
            x='50%'
            y='50%'
            font-size='${fontSize}'
            font-weight='bold'
            text-anchor='middle'
            dominant-baseline='middle'
            font-family='Orbitron, sans-serif'
          >Soon.</text>
        </svg>
      `.replace(/\s+/g, ' ').trim();

      setSvgMask(svg);
    };

    updateSvgMask();
    window.addEventListener("resize", updateSvgMask);
    return () => window.removeEventListener("resize", updateSvgMask);
  }, []);

  // Main scroll handler
  useEffect(() => {
    const lenis = lenisRef.current;
    const container = scrollContainer.current;
    if (!lenis || !container) return;

    const handleScroll = () => {
      const section = sectionRef.current;
      const containerEl = containerRef.current;
      const scaleEl = scaleRef.current;

      if (!section || !containerEl || !scaleEl) return;

      // Calculate scroll progress through section
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollTop = lenis.scroll;
      const scrolledPast = scrollTop - sectionTop;
      const progress = Math.max(0, Math.min(1, scrolledPast / (sectionHeight - height)));

      // Calculate transform values
      const translateY = Math.max(0, Math.min(scrolledPast, sectionHeight - height));
      const scale = 1 + progress * SCALE_MULTIPLIER;

      // Apply transforms (only when not morphing and not paused)
      if (!isMorphingRef.current && !hasPausedRef.current) {
        containerEl.style.transform = `translateY(${translateY}px)`;
        scaleEl.style.transform = `scale(${scale})`;
      }

      // Handle end of scroll - pause and morph to mini player
      if (progress >= 1 && !hasPausedRef.current && lenisRef.current) {
        hasPausedRef.current = true;

        // Snap to exact section end
        const exactEndPosition = sectionTop + sectionHeight - height;
        lenisRef.current.scrollTo(exactEndPosition, { immediate: true });
        lenisRef.current.stop();

        // Keep video playing
        videoRef.current?.play();

        // Morph to mini player with crossfade
        setTimeout(() => {
          isMorphingRef.current = true;

          // Fade out
          scaleEl.style.transition = "opacity 0.3s ease-out";
          scaleEl.style.opacity = "0";

          setTimeout(() => {
            // Apply morph changes while hidden
            scaleEl.style.transform = "scale(1)";
            setIsMorphed(true);

            // Fade back in
            requestAnimationFrame(() => {
              scaleEl.style.transition = "opacity 0.3s ease-in";
              scaleEl.style.opacity = "1";

              // Mark morphing complete after fade in
              setTimeout(() => {
                isMorphingRef.current = false;
              }, 300);
            });
          }, 300);
        }, MORPH_DELAY_MS);

        // Resume scrolling
        setTimeout(() => lenisRef.current?.start(), PAUSE_DURATION_MS);
      }

      // Handle scroll back up - reset to text animation
      if (progress < UNMORPH_THRESHOLD && hasPausedRef.current) {
        hasPausedRef.current = false;
        isMorphingRef.current = true;

        // Fade out, then apply changes, then fade in
        scaleEl.style.transition = "opacity 0.3s ease-out";
        scaleEl.style.opacity = "0";

        setTimeout(() => {
          // Apply current progress values while hidden
          scaleEl.style.transform = `scale(${scale})`;
          setIsMorphed(false);

          // Fade back in
          requestAnimationFrame(() => {
            scaleEl.style.transition = "opacity 0.3s ease-in";
            scaleEl.style.opacity = "1";

            // Remove transitions and allow scroll updates after fade completes
            setTimeout(() => {
              scaleEl.style.transition = "none";
              isMorphingRef.current = false;
            }, 300);
          });
        }, 300);
      }
    };

    // Use RAF loop to continuously update based on Lenis scroll position
    let rafId: number;
    const update = () => {
      handleScroll();
      rafId = requestAnimationFrame(update);
    };
    rafId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [scrollContainer, height, lenisRef]);

  // Computed styles
  const dataUrlMask = `url("data:image/svg+xml,${encodeURIComponent(svgMask)}")`;

  // Video player size - fits within viewport while maintaining 16:9 aspect ratio
  const miniPlayerSize = {
    width: "min(90vw, calc(80vh * 16 / 9))",
    height: "min(80vh, calc(90vw * 9 / 16))",
  };

  return (
    <section
      ref={sectionRef}
      className="w-full px-4 overflow-hidden relative bg-background"
      style={{ height: height * 3 }}
    >
      {/* Scroll container - handles vertical positioning */}
      <div
        ref={containerRef}
        className="relative w-full flex items-center justify-center will-change-transform"
        style={{ height }}
      >
        {/* Scale container - handles zoom animation */}
        <div
          ref={scaleRef}
          className="will-change-transform"
          style={{
            transformOrigin: "center center",
            width: "100%",
            height: "100%",
          }}
        >
          {/* Content wrapper */}
          <div
            className="relative size-full flex items-center justify-center"
            style={{ transition: isMorphed ? TRANSITION_EASING : "none" }}
          >
            {/* Video with text mask */}
            <div
              className="flex items-center justify-center"
              style={{
                // Mask properties
                maskImage: isMorphed ? "none" : dataUrlMask,
                WebkitMaskImage: isMorphed ? "none" : dataUrlMask,
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskPosition: "center",
                // Size properties
                width: isMorphed ? miniPlayerSize.width : "100%",
                height: isMorphed ? miniPlayerSize.height : "100%",
                // Visual properties
                borderRadius: isMorphed ? "16px" : "0px",
                overflow: "hidden",
                boxShadow: isMorphed ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)" : "none",
                transition: isMorphed ? TRANSITION_EASING : "none",
              }}
            >
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="https://cdn.magicui.design/ocean-small.webm" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeaseSection;
