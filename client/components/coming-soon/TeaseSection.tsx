import { useRef, useState, useEffect, RefObject } from "react";

interface TeaseSectionProps {
  isMobile: boolean;
  height: number;
  scrollContainer: RefObject<HTMLDivElement | null>;
}

const TeaseSection = ({ isMobile, height, scrollContainer }: TeaseSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scale, setScale] = useState(1);
  const [translateY, setTranslateY] = useState(0);
  const [progress, setProgress] = useState(0);
  const [svgMask, setSvgMask] = useState("");

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
      if (!sectionRef.current) return;

      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      const scrollTop = container.scrollTop;

      // How far we've scrolled past the section top
      const scrolledPast = scrollTop - sectionTop;

      // Progress through section (0 to 1)
      const newProgress = Math.max(0, Math.min(1, scrolledPast / (sectionHeight - height)));
      setProgress(newProgress);

      // Scale from 1 to 3 as user scrolls through section
      const newScale = 1 + newProgress * 2;
      setScale(newScale);

      // Keep the text centered in viewport by translating with scroll
      const yOffset = Math.max(0, Math.min(scrolledPast, sectionHeight - height));
      setTranslateY(yOffset);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => container.removeEventListener("scroll", handleScroll);
  }, [scrollContainer, height]);

  const dataUrlMask = `url("data:image/svg+xml,${encodeURIComponent(svgMask)}")`;

  // Calculate mask size based on progress - grows from text size to full coverage
  const maskScale = 1 + progress * 20;

  return (
    <section
      ref={sectionRef}
      className="w-full px-4 overflow-hidden relative bg-background"
      style={{ height: height * 3 }}
    >
      <div
        className="relative w-full flex items-center justify-center"
        style={{
          height: height,
          transform: `translateY(${translateY}px)`,
        }}
      >
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "center center",
            width: "100%",
            height: "100%",
          }}
        >
          <div className="relative size-full">
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                maskImage: progress >= 1 ? "none" : dataUrlMask,
                WebkitMaskImage: progress >= 1 ? "none" : dataUrlMask,
                maskSize: `${100 * maskScale}% ${100 * maskScale}%`,
                WebkitMaskSize: `${100 * maskScale}% ${100 * maskScale}%`,
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskPosition: "center",
              }}
            >
              <video
                className="h-full w-full object-cover"
                autoPlay
                muted={progress < 0.9}
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
