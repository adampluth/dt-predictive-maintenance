import ThemeToggle from "@/components/ThemeToggle";

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full px-4 h-10 flex items-center shadow-md rounded-b-xl transition-all duration-300 bg-header dark:bg-header text-gray-900 dark:text-gray-100 border-b-2 border-primary">
      <h1 className="text-md font-bold flex-grow text-white">Premonition Digital Twin</h1>
      <div className="-mr-1">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
