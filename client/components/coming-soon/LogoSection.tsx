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
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            transition={{ delay: 2.5, duration: 1.2 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer"
            onClick={onScrollDown}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: [0.45, 0, 0.55, 1]
              }}
              className="text-muted-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LogoSection;
