import type { Config } from "tailwindcss";

export default {
  content: ["./client/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        "revz-red": "#FF1801",
        "revz-dark": "#0A0A0A",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "text-glow": {
          "0%, 100%": {
            textShadow: "0 0 20px rgba(255, 24, 1, 0.5), 0 0 40px rgba(255, 24, 1, 0.3)",
          },
          "50%": {
            textShadow: "0 0 40px rgba(255, 24, 1, 0.8), 0 0 80px rgba(255, 24, 1, 0.5)",
          },
        },
        "speed-line": {
          "0%": {
            opacity: "0",
            transform: "scaleX(0)",
          },
          "50%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
            transform: "scaleX(1)",
          },
        },
      },
      animation: {
        "text-glow": "text-glow 3s ease-in-out infinite",
        "speed-line": "speed-line 2s ease-in-out infinite",
      },
    },
  },
} satisfies Config;
