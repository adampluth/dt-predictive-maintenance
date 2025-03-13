import ThemeToggle from "@/components/ThemeToggle";

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full px-4 h-10 flex items-center shadow-md rounded-b-xl transition-all duration-300 border-b-2 border-primary">
      <h1 className="text-md flex-grow text-primary font-header">Premonition Digital Twin</h1>
      <div className="-mr-1">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
