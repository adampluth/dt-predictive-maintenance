import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";

const tailwindConfig: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#1A1A1A", // Obsidian
          light: "#F9FAFB", // Light mode background
        },
        foreground: {
          DEFAULT: "#EAEAEA", // Light text for dark mode
          light: "#1A1A1A", // Dark text for light mode
        },
        border: "#2D2D2D", // Subtle dark border
        primary: {
          DEFAULT: "#10B981", // Emerald green
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#06B6D4", // Bright cyan
          foreground: "#FFFFFF",
        },
        glass: "rgba(255, 255, 255, 0.1)", // Glassmorphic overlay
      },
      backdropBlur: {
        md: "12px",
      },
      boxShadow: {
        md: "0 4px 6px rgba(0, 0, 0, 0.1)",
        lg: "0 6px 12px rgba(0, 0, 0, 0.15)",
        glass: "0 4px 30px rgba(0, 0, 0, 0.1)",
      },
      borderRadius: {
        lg: "12px",
        xl: "16px",
      },
      fontFamily: {
        sans: ['"Inter"', "sans-serif"],
      },
    },
  },
  plugins: [animatePlugin],
};

export default tailwindConfig;
