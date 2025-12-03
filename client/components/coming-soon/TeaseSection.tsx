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
  const containerRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const [svgMask, setSvgMask] = useState("");
  const [videoAspectRatio, setVideoAspectRatio] = useState(16 / 9);
  const [isMuted, setIsMuted] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const currentProgressRef = useRef(0);

  // Get video aspect ratio when loaded and ensure playback
  useEffect(() => {
    const video = videoRef.current;
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

    // Ensure video plays - start muted for autoplay compatibility
    const ensurePlayback = async () => {
      try {
        if (video) {
          video.muted = true;
          video.volume = 1.0;
          await video.play();
        }
      } catch (err) {
        console.error("Video playback failed:", err);
      }
    };

    ensurePlayback();

    return () => video.removeEventListener("loadedmetadata", handleLoadedMetadata);
  }, []);

  // Generate SVG mask with high resolution
  useEffect(() => {
    const updateSvgMask = () => {
      const fontSize = "12vw";
      const newSvgMask = `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 1920 1080' preserveAspectRatio='xMidYMid slice'><text x='50%' y='50%' font-size='${fontSize}' font-weight='bold' text-anchor='middle' dominant-baseline='middle' font-family='Orbitron, sans-serif'>Soon.</text></svg>`;
      setSvgMask(newSvgMask);
    };

    updateSvgMask();
    window.addEventListener("resize", updateSvgMask);
    return () => window.removeEventListener("resize", updateSvgMask);
  }, []);

  // Sync mute state to video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    const container = scrollContainer.current;
    if (!container) return;

    const handleScroll = () => {
      if (!sectionRef.current || !containerRef.current || !scaleRef.current || !videoWrapperRef.current) return;

      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      const scrollTop = container.scrollTop;

      // Check if section occupies 70% of the viewport
      const sectionBottom = sectionTop + sectionHeight;
      const viewportBottom = scrollTop + height;

      // Calculate visible portion of section in viewport
      const visibleStart = Math.max(sectionTop, scrollTop);
      const visibleEnd = Math.min(sectionBottom, viewportBottom);
      const visibleHeight = Math.max(0, visibleEnd - visibleStart);

      // Show button when section occupies 70% or more of viewport
      const viewportCoverage = visibleHeight / height;
      setShowButton(viewportCoverage >= 0.7);

      // How far we've scrolled past the section top
      const scrolledPast = scrollTop - sectionTop;

      // Progress through section (0 to 1)
      const progress = Math.max(0, Math.min(1, scrolledPast / (sectionHeight - height)));

      // Store current progress
      currentProgressRef.current = progress;

      // Calculate the scale needed to fill the screen
      // Video wrapper is constrained to 90% width and 80% height
      // We need to scale until it fills 100% of the viewport
      const scaleToFillWidth = 1 / 0.9;  // ~1.11
      const scaleToFillHeight = 1 / 0.8; // 1.25
      const maxScale = Math.max(scaleToFillWidth, scaleToFillHeight); // 1.25

      // Define animation phases
      // Phase 1: Scale up to fill screen (0 to 0.4 progress)
      // Phase 2: Transition/unmask (0.4 to 0.8 progress)
      // Phase 3: Hold at full screen (0.8 to 1.0 progress)
      const scaleEndProgress = 0.4;
      const transitionStart = 0.4;
      const transitionEnd = 0.8;

      // Calculate scale - reaches maxScale at scaleEndProgress, then holds
      const scaleProgress = Math.min(progress / scaleEndProgress, 1);
      const scale = 1 + (maxScale - 1) * scaleProgress;

      // Keep the text centered in viewport by translating with scroll
      const translateY = Math.max(0, Math.min(scrolledPast, sectionHeight - height));

      // Calculate mask size based on progress (slower expansion for better control)
      // Only expand during the scale and transition phases (0 to transitionEnd)
      const maskProgress = Math.min(progress / transitionEnd, 1);
      const maskScale = 1 + maskProgress * 6;

      // Transition phase: fade out mask during middle section
      const transitionProgress = Math.max(0, Math.min(1, (progress - transitionStart) / (transitionEnd - transitionStart)));

      // Apply transforms directly to DOM (no state updates)
      containerRef.current.style.transform = `translateY(${translateY}px)`;
      scaleRef.current.style.transform = `scale(${scale})`;

      // Apply mask and opacity transitions to video wrapper
      const maskSize = `${100 * maskScale}% ${100 * maskScale}%`;
      const videoWrapper = videoWrapperRef.current;

      // During masked phase, apply mask
      if (progress < transitionStart) {
        videoWrapper.style.maskImage = dataUrlMask;
        videoWrapper.style.webkitMaskImage = dataUrlMask;
        videoWrapper.style.maskSize = maskSize;
        videoWrapper.style.webkitMaskSize = maskSize;
        videoWrapper.style.maskRepeat = 'no-repeat';
        videoWrapper.style.webkitMaskRepeat = 'no-repeat';
        videoWrapper.style.maskPosition = 'center';
        videoWrapper.style.webkitMaskPosition = 'center';
      } else {
        // During transition, fade out the mask
        const maskOpacity = 1 - transitionProgress;
        if (maskOpacity > 0) {
          videoWrapper.style.maskImage = dataUrlMask;
          videoWrapper.style.webkitMaskImage = dataUrlMask;
          videoWrapper.style.maskSize = maskSize;
          videoWrapper.style.webkitMaskSize = maskSize;
        } else {
          // Remove mask completely when transition is done
          videoWrapper.style.maskImage = 'none';
          videoWrapper.style.webkitMaskImage = 'none';
        }
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => container.removeEventListener("scroll", handleScroll);
  }, [scrollContainer, height, lenisRef, videoAspectRatio, svgMask]);

  const dataUrlMask = `url("data:image/svg+xml,${encodeURIComponent(svgMask)}")`;

  return (
    <section
      ref={sectionRef}
      className="w-full px-4 overflow-hidden relative bg-background"
      style={{ height: height * 2.5 }}
    >
      {/* Mute/Unmute Button - fixed position, visible in TeaseSection or when audio is playing */}
      {(showButton || !isMuted) && (
        <button
          onClick={toggleMute}
          className="fixed top-4 right-4 z-50 bg-black/50 hover:bg-black/70 backdrop-blur-sm p-3 rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          title={isMuted ? "Click to unmute" : "Click to mute"}
        >
          {isMuted ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
              />
            </svg>
          )}
        </button>
      )}

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
              className="relative will-change-transform flex items-center justify-center"
              style={{
                maxWidth: "90%",
                maxHeight: "80%",
                width: "100%",
                height: "100%",
                aspectRatio: `${videoAspectRatio}`,
                maskImage: dataUrlMask,
                WebkitMaskImage: dataUrlMask,
                maskSize: "100% 100%",
                WebkitMaskSize: "100% 100%",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskPosition: "center",
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
              }}
            >
              <video
                ref={videoRef}
                className="w-full h-full object-contain"
                autoPlay
                loop
                playsInline
                muted={isMuted}
                style={{
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <source src="/Teaser-Video.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeaseSection;
