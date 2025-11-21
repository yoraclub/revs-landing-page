interface TeaseSectionProps {
  isMobile: boolean;
}

const TeaseSection = ({ isMobile }: TeaseSectionProps) => {
  return (
    <section className="h-screen w-full flex items-center justify-center px-4">
      <h2 className={`font-orbitron font-bold text-white animate-text-glow ${isMobile ? 'text-5xl' : 'text-6xl md:text-8xl'}`}>
        Soon.
      </h2>
    </section>
  );
};

export default TeaseSection;
