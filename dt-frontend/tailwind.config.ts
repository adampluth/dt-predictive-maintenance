import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,html}", // Ensure these match your project structure
    "./components/**/*.{js,ts,jsx,tsx,html}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Include `app/` if using the App Router
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Ensures `font-sans` works
      },
    },
  },
};

export default config;
