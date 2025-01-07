import axios from "axios";
import {useEffect, useState} from "react";

interface MovieCardProps {
  id: number,
  title: string,
  poster_path: string,
  release_date: string,
  overview: string,
}

export const PopularMovies = () => {
  const [movies, setMovies] = useState<MovieCardProps[]>([]); // 영화 데이터를 저장할 상태
  const [loading, setLoading] = useState<boolean>(true);

  const getPopularMovies = async () => {
    try {
      const response = await axios.get(`/api/movie/popular`).then(
          response => response.data.results
      )
      return response
    } catch (error) {
      console.error("Error fetching recommended movies", error);
      return [];
    }
  };
  useEffect(() => {
    const fetchMovies = async () => {
      const recommendedMovies = await getPopularMovies();
      setMovies(recommendedMovies);
      setLoading(false);
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
        <section className="py-8">
          <div className="container mx-auto text-center">
            <p>Loading...</p>
          </div>
        </section>
    );
  }

  return (
      <section className="py-8">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold mb-4">Popular Movies</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie: MovieCardProps) => (
                <div key={movie.id} className="bg-gray-800 rounded overflow-hidden shadow-lg">
                  <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-96 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="text-lg font-bold">{movie.title}</h4>
                    <p className="text-sm text-gray-400">{movie.release_date}</p>
                    {/*<button className="mt-2 px-4 py-2 bg-yellow-400 text-gray-900 font-bold rounded hover:bg-yellow-500">*/}
                    {/*  Details*/}
                    {/*</button>*/}
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>
  );
};