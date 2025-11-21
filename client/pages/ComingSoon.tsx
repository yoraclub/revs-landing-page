import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Lenis from "lenis";
import Snap from "lenis/snap";

const ComingSoon = () => {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [arrowClicked, setArrowClicked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  const handleScrollDown = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(window.innerHeight);
      setArrowClicked(true);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const container = containerRef.current;
    const viewportHeight = window.innerHeight;

    // Initialize Lenis for ultra-smooth, slow scrolling
    const lenis = new Lenis({
      wrapper: container,
      content: container,
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 0.8,
    });
    lenisRef.current = lenis;

    // Hide arrow on scroll (with threshold)
    let initialScroll = true;
    lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      if (initialScroll) {
        initialScroll = false;
        return;
      }
      if (scroll > 50) {
        setArrowClicked(true);
      }
    });

    // Initialize Snap with Lenis
    const snap = new Snap(lenis, {
      type: "mandatory",
    });

    // Add snap points for each section
    snap.add(0);
    snap.add(viewportHeight);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      snap.destroy();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [mounted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // TODO: Integrate with your email service
      console.log("Email submitted:", email);
      setIsSubmitted(true);
      setEmail("");
    }
  };

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="h-screen overflow-y-auto bg-background">
      {/* Background gradient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-revz-red/5 rounded-full blur-3xl" />
      </div>

      {/* Section 1: Logo */}
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
              onClick={handleScrollDown}
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

      {/* Section 2: Email Signup */}
      <section className="h-screen flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-200px" }}
          transition={{
            duration: 1.4,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="relative z-10 text-center max-w-md w-full"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.2,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="text-3xl sm:text-4xl font-bold mb-6 font-orbitron"
          >
            Stay in the Loop
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
            className="text-muted-foreground mb-10"
          >
            Be the first to know when we launch. Sign up for exclusive updates.
          </motion.p>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="text-revz-red font-medium"
            >
              Thanks for signing up! We'll be in touch.
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
              className="flex flex-col sm:flex-row gap-4"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" className="bg-revz-red hover:bg-revz-red/90 transition-all duration-500">
                Notify Me
              </Button>
            </motion.form>
          )}
        </motion.div>
      </section>
    </div>
  );
};

export default ComingSoon;
