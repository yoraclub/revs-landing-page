import { VideoText } from "@/components/VideoText";
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

  return (
    <section
      ref={sectionRef}
      className="w-full px-4 overflow-hidden relative bg-background"
      style={{ height: height * 2 }}
    >
      <div
        className="relative w-full flex items-center justify-center"
        style={{
          height: height,
          transform: `translateY(${translateY}px)`,
        }}
      >
        {/* Masked video text - fades out at end */}
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "center center",
            width: "100%",
            height: "100%",
            opacity: progress >= 0.9 ? 1 - (progress - 0.9) * 10 : 1,
            transition: "opacity 0.1s ease-out",
          }}
        >
          <VideoText
            src="https://cdn.magicui.design/ocean-small.webm"
            fontSize={12}
            fontFamily="Orbitron, sans-serif"
          >
            Soon.
          </VideoText>
        </div>

        {/* Full video - fades in at end */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: progress >= 0.9 ? (progress - 0.9) * 10 : 0,
            transition: "opacity 0.1s ease-out",
          }}
        >
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            playsInline
          >
            <source src="https://cdn.magicui.design/ocean-small.webm" />
          </video>
        </div>
      </div>
    </section>
  );
};

export default TeaseSection;
