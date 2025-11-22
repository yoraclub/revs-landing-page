import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { motion } from "framer-motion";

const Plasma = lazy(() => import("@/components/Plasma").then(m => ({ default: m.Plasma })));
const GlassSurface = lazy(() => import("@/components/GlassSurface"));

interface EmailSignupSectionProps {
  isMobile: boolean;
  isTablet: boolean;
  height: number;
}

const EmailSignupSection = ({ isMobile, isTablet, height }: EmailSignupSectionProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // TODO: Integrate with your email service
      console.log("Email submitted:", email);
      setIsSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`flex flex-col items-center justify-center relative overflow-hidden ${isMobile ? 'px-4' : 'px-6'}`}
      style={{ height }}
    >
      <div className="absolute inset-0 overflow-hidden [&_canvas]:w-full! [&_canvas]:h-full! [&_canvas]:max-w-full! [&_canvas]:max-h-full!">
        {isVisible && (
          <Suspense fallback={null}>
            <Plasma
              color="#FF1801"
              speed={1}
              direction="forward"
              scale={isMobile ? 0.8 : 1}
              opacity={1}
              mouseInteractive={false}
            />
          </Suspense>
        )}
      </div>
      {isVisible && (
        <Suspense fallback={null}>
          <div className={`glass-surface-container w-full ${isMobile ? 'max-w-sm' : isTablet ? 'max-w-md' : 'max-w-lg'}`}>
            <GlassSurface
              width="100%"
              height="auto"
              borderRadius={isMobile ? 24 : 32}
              className="w-full relative z-10"
            >
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-200px" }}
          transition={{
            duration: 1.4,
            ease: [0.16, 1, 0.3, 1]
          }}
          className={`relative z-10 text-center w-full ${isMobile ? 'p-6' : isTablet ? 'p-8' : 'p-10 sm:p-12'}`}
        >
          {/* Decorative top accent */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`h-1 bg-linear-to-r from-revz-red to-red-400 mx-auto rounded-full ${isMobile ? 'w-12 mb-6' : 'w-16 mb-8'}`}
          />

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.2,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1]
            }}
            className={`font-bold font-orbitron tracking-tight ${isMobile ? 'text-2xl mb-3' : 'text-3xl sm:text-4xl lg:text-5xl mb-4'}`}
          >
            Stay in the{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-revz-red to-red-400">
              Loop
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              delay: 0.5,
              ease: [0.16, 1, 0.3, 1]
            }}
            className={`text-muted-foreground max-w-sm mx-auto leading-relaxed ${isMobile ? 'text-sm mb-6' : 'text-base sm:text-lg mb-10'}`}
          >
            Be the first to know when we launch. Get exclusive updates and early access.
          </motion.p>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="py-6"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-linear-to-br from-revz-red to-red-400 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-white font-semibold text-lg mb-1">You're on the list!</p>
              <p className="text-muted-foreground text-sm">We'll notify you when we launch.</p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                delay: 0.8,
                ease: [0.16, 1, 0.3, 1]
              }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Custom styled input container */}
              <div className={`
                relative group rounded-xl overflow-hidden
                transition-all duration-500
                ${isFocused ? 'ring-2 ring-revz-red/50 shadow-lg shadow-revz-red/20' : ''}
              `}>
                <div className="absolute inset-0 bg-linear-to-r from-revz-red/20 to-red-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  required
                  className={`
                    w-full
                    bg-white/5 backdrop-blur-sm
                    border border-white/10
                    rounded-xl
                    text-white placeholder:text-white/40
                    focus:outline-none focus:border-revz-red/50
                    transition-all duration-300
                    ${isMobile ? 'px-4 py-3 text-sm' : 'px-5 py-4 text-base'}
                  `}
                />
              </div>

              {/* Custom styled button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  w-full
                  bg-linear-to-r from-revz-red to-red-500
                  hover:from-red-500 hover:to-revz-red
                  text-white font-semibold
                  rounded-xl
                  transition-all duration-500
                  shadow-lg shadow-revz-red/30
                  hover:shadow-xl hover:shadow-revz-red/40
                  relative overflow-hidden
                  group
                  ${isMobile ? 'py-3 px-4 text-sm' : 'py-4 px-6'}
                `}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Notify Me
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </motion.button>

              <p className="text-xs text-muted-foreground/60 mt-4">
                No spam, ever. Unsubscribe anytime.
              </p>
            </motion.form>
          )}
        </motion.div>
            </GlassSurface>
          </div>
        </Suspense>
      )}
    </section>
  );
};

export default EmailSignupSection;
