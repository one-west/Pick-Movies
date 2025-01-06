export const SearchSection = () => {
  return (
      <section className="py-8">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold mb-4">Search for a Movie</h3>
          <div className="flex">
            <input
                type="text"
                placeholder="Search by title, genre, or actor..."
                className="w-full p-2 rounded-l bg-gray-700 text-white"
            />
            <button className="px-4 bg-yellow-400 text-gray-900 font-bold rounded-r hover:bg-yellow-500">
              Search
            </button>
          </div>
        </div>
      </section>
  );
};