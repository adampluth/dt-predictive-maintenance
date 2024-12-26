import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import { zinc, gray } from "tailwindcss/colors";

const tailwindConfig: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./components/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          50: "#f3f3f4",
          100: "#e1e1e2",
          200: "#c7c7c9",
          300: "#a4a4a7",
          400: "#6d6d71",
          500: "#454548",
          600: "#2f2f32",
          700: "#252528",
          800: "#1b1b1d",
          900: "#151517",
        },
        gray,
        zinc,
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar)",
          foreground: "var(--sidebar-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        input: "var(--input)",
        border: "var(--border)",
        ring: "var(--ring)",
        glass: "var(--glass)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Default body font
        header: ["Archivo", "sans-serif"], // Header font
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        // Normal text: dark text for light theme, light text for dark theme
        ".text-color-standard": {
          color: "#111827", // Equivalent to `text-gray-900`
        },
        ".dark .text-color-standard": {
          color: "#f9fafb", // Equivalent to `text-gray-100`
        },
        // Reversed text: light text for light theme, dark text for dark theme
        ".text-color-reverse": {
          color: "#f9fafb", // Equivalent to `text-gray-100`
        },
        ".dark .text-color-reverse": {
          color: "#111827", // Equivalent to `text-gray-900`
        },
      };

      addUtilities(newUtilities);
    }),
  ],
};

export default tailwindConfig;
