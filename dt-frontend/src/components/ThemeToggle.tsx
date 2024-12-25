'use client';

import { LuSun, LuMoon } from "react-icons/lu";
import Button from "@/components/ui/Button";
import useTheme from "@/hooks/useTheme";
import { useState } from "react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [hovering, setHovering] = useState(false);

  const isDarkMode = theme === "dark";

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      aria-label="Toggle theme"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="relative p-3 rounded-full flex items-center justify-center text-gray-900 dark:text-gray-100 hover:scale-110 transition-transform hover:bg-primary"
    >
      {/* Current Theme Icon */}
      <span
        className={`absolute transition-all duration-300 ${
          hovering ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
        }`}
      >
        {isDarkMode ? (
          <LuMoon size={24} className="text-gray-100" />
        ) : (
          <LuSun size={24} className="text-gray-100" />
        )}
      </span>

      {/* Alternate Theme Icon (on hover) */}
      <span
        className={`absolute transition-all duration-300 ${
          hovering ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"
        }`}
      >
        {isDarkMode ? (
          <LuSun size={24} className="text-yellow-400" />
        ) : (
          <LuMoon size={24} className="text-blue-400" />
        )}
      </span>
    </Button>
  );
}
