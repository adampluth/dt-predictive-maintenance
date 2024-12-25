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
          DEFAULT: "hsl(220, 15%, 12%)", // Muted dark background
          light: "hsl(0, 0%, 95%)", // Light mode background
        },
        foreground: {
          DEFAULT: "hsl(0, 0%, 100%)", // Light text for dark mode
          light: "hsl(220, 15%, 12%)", // Dark text for light mode
        },
        border: "hsl(var(--border, 220, 15%, 18%))",
        primary: {
          DEFAULT: "#10B981", // Emerald green
          hover: "#0EA46A", // Slightly darker hover
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#4ADE80", // Light green
          hover: "#3CC06C", // Hover effect
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#06B6D4", // Cyan for contrast
          hover: "#0891B2",
          foreground: "#FFFFFF",
        },
        header: {
          DEFAULT: "#1F2937", // Dark neutral background for header
          light: "#F3F4F6", // Light mode header
        },
        glass: "rgba(255, 255, 255, 0.1)", // Glassmorphism
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
