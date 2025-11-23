import { VideoText } from "@/components/VideoText";

interface TeaseSectionProps {
  isMobile: boolean;
  height: number;
}

const TeaseSection = ({ isMobile, height }: TeaseSectionProps) => {
  return (
    <section
      className="w-full flex items-center justify-center px-4 overflow-hidden relative bg-background"
      style={{ height }}
    >
      <div className="relative w-full h-full">
        <VideoText
          src="https://cdn.magicui.design/ocean-small.webm"
          fontSize={isMobile ? 12 : 15}
          fontFamily="Orbitron, sans-serif"
        >
          Soon.
        </VideoText>
      </div>
    </section>
  );
};

export default TeaseSection;
