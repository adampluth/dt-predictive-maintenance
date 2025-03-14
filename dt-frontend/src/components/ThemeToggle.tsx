"use client";

import { LuSun, LuMoon } from "react-icons/lu";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Ensure client-side execution
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.documentElement.setAttribute("data-theme", storedTheme);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="p-1 rounded-full flex items-center justify-center transition duration-300 hover:bg-primary bg-transparent"
    >
      {theme === "dark" ? <LuSun size={24} className="text-primary hover:text-white" /> : <LuMoon size={24} className="text-primary hover:text-white" />}
    </button>
  );
}
