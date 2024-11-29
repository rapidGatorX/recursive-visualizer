import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#8B5CF6", // More vibrant purple
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#D946EF", // Vibrant magenta
          foreground: "hsl(var(--secondary-foreground))",
        },
      },
      keyframes: {
        "box-appear": {
          "0%": { transform: "scale(0.6)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "box-visited": {
          "0%": { background: "#8B5CF6", transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { background: "#D946EF", transform: "scale(1)" },
        },
        pulse: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.1)", opacity: "0.9" },
        },
      },
      animation: {
        "box-appear": "box-appear 0.4s ease-out",
        "box-visited": "box-visited 0.6s ease-in-out forwards",
        pulse: "pulse 2s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;