import React from "react";

interface CardProps {
  title: string;
  content: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, content }) => {
  return (
    <div className="bg-card text-card-foreground rounded-lg shadow-md p-6 transition-transform border border-border glass">
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      <div>{content}</div>
    </div>
  );
};

export default Card;
