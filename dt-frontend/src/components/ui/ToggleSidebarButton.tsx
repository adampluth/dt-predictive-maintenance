'use client';

import { FiChevronLeft } from "react-icons/fi";
import { LuMenu } from "react-icons/lu";

interface ToggleSidebarButtonProps {
  isOpen: boolean;
  toggleDrawer: () => void;
}

export default function ToggleSidebarButton({
  isOpen,
  toggleDrawer,
}: ToggleSidebarButtonProps) {
  return (
    <button
      aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 p-2 shadow-md transition-all"
      onClick={toggleDrawer}
    >
      {isOpen ? (
        <FiChevronLeft className="h-4 w-4" /> // Caret for closing
      ) : (
        <LuMenu className="h-4 w-4" /> // Hamburger for opening
      )}
    </button>
  );
}
