export const RecommendedMovies = () => {
  return (
      <section className="py-8">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold mb-4">Recommended Movies</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-gray-800 rounded overflow-hidden shadow-lg">
                  <img
                      src={`https://source.unsplash.com/300x400/?movie,cinema,poster&sig=${index}`}
                      alt={`Movie ${index + 1}`}
                      className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="text-lg font-bold">Movie Title {index + 1}</h4>
                    <p className="text-sm text-gray-400">Genre | Year</p>
                    <button className="mt-2 px-4 py-2 bg-yellow-400 text-gray-900 font-bold rounded hover:bg-yellow-500">
                      Details
                    </button>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>
  );
};