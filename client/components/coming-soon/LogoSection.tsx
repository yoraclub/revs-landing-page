import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/Logo";
import HyperSpeed from "@/components/HyperSpeed/HyperSpeed";
import { hyperspeedPresets } from "@/components/HyperSpeed/hyperspeedPresets";

interface LogoSectionProps {
  arrowClicked: boolean;
  onScrollDown: () => void;
  isMobile: boolean;
  isTablet: boolean;
}

const LogoSection = ({ arrowClicked, onScrollDown, isMobile, isTablet }: LogoSectionProps) => {
  return (
    <section className={`h-screen flex flex-col items-center justify-start relative overflow-hidden ${isMobile ? 'pt-24 px-4' : isTablet ? 'pt-28 px-5' : 'pt-34 px-6'}`}>
      <div className="absolute inset-0 overflow-hidden [&_canvas]:w-full! [&_canvas]:h-full! [&_canvas]:max-w-full! [&_canvas]:max-h-full!">
        <HyperSpeed effectOptions={hyperspeedPresets.two as any} />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.8,
          ease: [0.16, 1, 0.3, 1]
        }}
        className="relative z-10 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.5,
            delay: 0.5,
            ease: [0.16, 1, 0.3, 1]
          }}
        >
          <Logo className={isMobile ? 'w-48' : isTablet ? 'w-64' : 'w-80 md:w-96'} />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <AnimatePresence>
        {!arrowClicked && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10, transition: { duration: 0.5 } }}
            transition={{ delay: 2.5, duration: 1 }}
            className={`absolute left-1/2 -translate-x-1/2 cursor-pointer group ${isMobile ? 'bottom-8' : 'bottom-12'}`}
            onClick={onScrollDown}
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width={isMobile ? "24" : "28"}
              height={isMobile ? "24" : "28"}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white/50 group-hover:text-revz-red transition-colors duration-300"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatDelay: 1.4,
                ease: "easeInOut"
              }}
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </motion.svg>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LogoSection;
