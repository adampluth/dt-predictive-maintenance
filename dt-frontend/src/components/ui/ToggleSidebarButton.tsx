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
      className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 p-2 shadow-md transition-all flex items-center justify-center"
      onClick={toggleDrawer}
    >
      {isOpen ? (
        <FiChevronLeft className="h-4 w-4 transition-transform duration-200" />
      ) : (
        <LuMenu className="h-4 w-4 transition-transform duration-200" />
      )}
    </button>
  );
}
