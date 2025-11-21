import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/Logo";

interface LogoSectionProps {
  arrowClicked: boolean;
  onScrollDown: () => void;
}

const LogoSection = ({ arrowClicked, onScrollDown }: LogoSectionProps) => {
  return (
    <section className="h-screen flex flex-col items-center justify-center px-6 relative">
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
          <Logo className="w-64 sm:w-80 md:w-96" />
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
            className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer group"
            onClick={onScrollDown}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white/50 group-hover:text-revz-red group-hover:animate-bounce-subtle transition-colors duration-300"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LogoSection;
