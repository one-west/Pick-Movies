import axios from "axios";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {MovieProps} from "../type/MovieProps.ts";


export const PopularMovies = () => {
  const [movies, setMovies] = useState<MovieProps[]>([]); // 영화 데이터를 저장할 상태
  const [loading, setLoading] = useState<boolean>(true);

  const getPopularMovies = async () => {
    try {
      const response = await axios.get(`/api/movie/popular`).then(
          response => response.data.results
      )
      return response
    } catch (error) {
      console.error("에러 fetch 중 문제발생", error);
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
        <section className="py-8 bg-gray-900 text-white">
          <div className="container mx-auto text-center">
            <p className="text-lg font-semibold">Loading popular movies...</p>
          </div>
        </section>
    );
  }

  return (
      <section className="py-8 bg-gray-900 text-white">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-6 text-center">Popular Movies</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
                <div
                    key={movie.id}
                    className="bg-gray-800 rounded overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
                >
                  <Link to={`/movies/${movie.id}`} className="movie-item">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-96 object-cover rounded-t"
                    />
                  </Link>
                  <div className="p-4">
                    <h4 className="text-lg font-bold text-white truncate">{movie.title}</h4>
                    <p className="text-sm text-gray-400">{movie.release_date}</p>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>

  );
};