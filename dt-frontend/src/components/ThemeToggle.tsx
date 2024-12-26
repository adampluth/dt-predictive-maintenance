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
      className="p-3 rounded-full flex items-center justify-center hover:bg-primary"
    >
      <span
        className={`absolute transition-all duration-300 ${
          hovering ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
        }`}
      >
        {isDarkMode ? (
          <LuMoon size={24} />
        ) : (
          <LuSun size={24} />
        )}
      </span>
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
