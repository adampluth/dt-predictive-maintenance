import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "glass";
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    primary: "btn btn-primary",
    secondary: "btn btn-secondary",
    ghost: "btn btn-ghost",
    glass: "btn btn-glass",
  };

  return (
    <button
      className={`btn rounded-lg text-sm font-medium transition duration-300 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
