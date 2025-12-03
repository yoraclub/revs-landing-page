import { useRef, useState, useEffect, RefObject } from "react";
import Lenis from "lenis";

interface TeaseSectionProps {
  isMobile: boolean;
  height: number;
  scrollContainer: RefObject<HTMLDivElement | null>;
  lenisRef: RefObject<Lenis | null>;
}

const TeaseSection = ({ isMobile, height, scrollContainer, lenisRef }: TeaseSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const unmaskedVideoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const unmaskedRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const [svgMask, setSvgMask] = useState("");
  const [videoAspectRatio, setVideoAspectRatio] = useState(16 / 9);
  const hasPausedRef = useRef(false);

  // Get video aspect ratio when loaded and sync video playback
  useEffect(() => {
    const video = videoRef.current;
    const unmaskedVideo = unmaskedVideoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      if (video.videoWidth && video.videoHeight) {
        setVideoAspectRatio(video.videoWidth / video.videoHeight);
      }
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    // If video already loaded
    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }

    // Ensure both videos play
    const ensurePlayback = async () => {
      try {
        if (video) await video.play();
        if (unmaskedVideo) await unmaskedVideo.play();
      } catch (err) {
        console.error("Video playback failed:", err);
      }
    };

    ensurePlayback();

    return () => video.removeEventListener("loadedmetadata", handleLoadedMetadata);
  }, []);

  // Generate SVG mask
  useEffect(() => {
    const updateSvgMask = () => {
      const fontSize = "12vw";
      const newSvgMask = `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'><text x='50%' y='50%' font-size='${fontSize}' font-weight='bold' text-anchor='middle' dominant-baseline='middle' font-family='Orbitron, sans-serif'>Soon.</text></svg>`;
      setSvgMask(newSvgMask);
    };

    updateSvgMask();
    window.addEventListener("resize", updateSvgMask);
    return () => window.removeEventListener("resize", updateSvgMask);
  }, []);

  useEffect(() => {
    const container = scrollContainer.current;
    if (!container) return;

    const handleScroll = () => {
      if (!sectionRef.current || !containerRef.current || !scaleRef.current || !maskRef.current || !unmaskedRef.current || !videoWrapperRef.current) return;

      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      const scrollTop = container.scrollTop;

      // How far we've scrolled past the section top
      const scrolledPast = scrollTop - sectionTop;

      // Progress through section (0 to 1)
      const progress = Math.max(0, Math.min(1, scrolledPast / (sectionHeight - height)));

      // Scale from 1 to 3 as user scrolls through section (but slow down at the end)
      const scale = 1 + progress * 2;

      // Keep the text centered in viewport by translating with scroll
      const translateY = Math.max(0, Math.min(scrolledPast, sectionHeight - height));

      // Calculate mask size based on progress
      const maskScale = 1 + progress * 20;

      // Transition phase: 0.7-1.0 (last 30% of scroll)
      const transitionStart = 0.7;
      const transitionProgress = Math.max(0, Math.min(1, (progress - transitionStart) / (1 - transitionStart)));

      // Apply transforms directly to DOM (no state updates)
      containerRef.current.style.transform = `translateY(${translateY}px)`;
      scaleRef.current.style.transform = `scale(${scale})`;

      const maskSize = `${100 * maskScale}% ${100 * maskScale}%`;
      maskRef.current.style.maskSize = maskSize;
      maskRef.current.style.webkitMaskSize = maskSize;

      // Cross-fade between masked and unmasked video during transition
      // Use simple opacity changes only - no layout-triggering operations
      maskRef.current.style.opacity = `${1 - transitionProgress}`;
      unmaskedRef.current.style.opacity = `${transitionProgress}`;

      // Pause scroll when video is fully visible
      if (progress >= 1 && !hasPausedRef.current && lenisRef.current) {
        hasPausedRef.current = true;

        // Snap to exact end of section
        const exactEndPosition = sectionTop + sectionHeight - height;

        lenisRef.current.scrollTo(exactEndPosition, { immediate: true });
        lenisRef.current.stop();

        // Ensure both videos keep playing
        if (videoRef.current) {
          videoRef.current.play();
        }
        if (unmaskedVideoRef.current) {
          unmaskedVideoRef.current.play();
        }

        setTimeout(() => {
          if (lenisRef.current) {
            lenisRef.current.start();
          }
        }, 3000);
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => container.removeEventListener("scroll", handleScroll);
  }, [scrollContainer, height, lenisRef, videoAspectRatio]);

  const dataUrlMask = `url("data:image/svg+xml,${encodeURIComponent(svgMask)}")`;

  return (
    <section
      ref={sectionRef}
      className="w-full px-4 overflow-hidden relative bg-background"
      style={{ height: height * 3 }}
    >
      <div
        ref={containerRef}
        className="relative w-full flex items-center justify-center will-change-transform"
        style={{ height: height }}
      >
        <div
          ref={scaleRef}
          className="will-change-transform"
          style={{
            transformOrigin: "center center",
            width: "100%",
            height: "100%",
          }}
        >
          <div className="relative size-full flex items-center justify-center">
            <div
              ref={videoWrapperRef}
              className="relative will-change-transform"
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              {/* Masked video layer - fades out during transition */}
              <div
                ref={maskRef}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  maskImage: dataUrlMask,
                  WebkitMaskImage: dataUrlMask,
                  maskSize: "100% 100%",
                  WebkitMaskSize: "100% 100%",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskPosition: "center",
                  WebkitMaskPosition: "center",
                  opacity: 1,
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
                  <source src="/Teaser-Video.mp4" type="video/mp4" />
                </video>
              </div>

              {/* Unmasked video layer - fades in during transition */}
              <div
                ref={unmaskedRef}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  opacity: 0,
                }}
              >
                <div
                  style={{
                    maxWidth: '90%',
                    maxHeight: '80%',
                    aspectRatio: `${videoAspectRatio}`,
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <video
                    ref={unmaskedVideoRef}
                    className="w-full h-full"
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src="/Teaser-Video.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeaseSection;
