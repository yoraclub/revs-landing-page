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
      <h2 className={`font-orbitron font-bold text-white animate-text-glow ${isMobile ? 'text-5xl' : 'text-6xl md:text-8xl'}`}>
        Soon.
      </h2>
    </section>
  );
};

export default TeaseSection;
