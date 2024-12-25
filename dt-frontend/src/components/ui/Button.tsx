import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "glass";
}

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 shadow-sm hover:shadow-md",
    ghost: "bg-transparent text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800",
    glass: "bg-glass backdrop-blur-md text-white hover:backdrop-blur-lg hover:shadow-glass",
  };

  return (
    <button
      className={cn(
        "rounded-lg px-4 py-2 text-sm font-medium transition duration-300",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
