import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GlassSurface from "@/components/GlassSurface";
import FloatingLines from "@/components/FloatingLines";

const EmailSignupSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    <section className="h-screen flex flex-col items-center justify-center px-6 relative">
      <div className="absolute inset-0">
        <FloatingLines
          enabledWaves={['top', 'middle', 'bottom']}
          lineCount={[5, 10, 10]}
          lineDistance={[8, 6, 4]}
          bendRadius={5.0}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
          linesGradient={['#FF1801', '#FFFFFF']}
        />
      </div>
      <GlassSurface
        width="100%"
        height="auto"
        borderRadius={24}
        backgroundOpacity={0.5}
        className="max-w-md w-full relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-200px" }}
          transition={{
            duration: 1.4,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="relative z-10 text-center w-full p-8"
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
      </GlassSurface>
    </section>
  );
};

export default EmailSignupSection;
