import React from "react";

interface CardProps extends React.ComponentProps<"div"> {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className = "" }) => {
  return (
    <div className={`bg-card text-card-foreground rounded-lg shadow-md p-6 border border-border glass transition-transform ${className}`}>
      {title && <h3 className="text-lg font-bold mb-4">{title}</h3>}
      <div>{children}</div>
    </div>
  );
};

export default Card;
