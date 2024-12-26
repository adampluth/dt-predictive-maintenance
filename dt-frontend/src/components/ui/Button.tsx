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
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-sm hover:shadow-md",
    ghost:
      "bg-transparent text-foreground hover:bg-muted dark:hover:bg-muted-dark",
    glass:
      "bg-glass backdrop-blur-lg text-foreground hover:backdrop-blur-xl hover:shadow-md",
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
