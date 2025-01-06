export const Header = () => {
  return (
      <header className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-yellow-400">MovieRecs</h1>
          <nav className="space-x-4">
            <a href="#" className="hover:text-yellow-400">Home</a>
            <a href="#" className="hover:text-yellow-400">Recommendations</a>
            <a href="#" className="hover:text-yellow-400">Genres</a>
            <a href="#" className="hover:text-yellow-400">About</a>
          </nav>
        </div>
      </header>
  );
};
