interface CardProps {
  title: string;
  content: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, content }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg hover:scale-105 transition-transform">
      <h3 className="text-lg font-bold">{title}</h3>
      <div>{content}</div>
    </div>
  );
};

export default Card;
