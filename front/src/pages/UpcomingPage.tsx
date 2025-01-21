import {useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import {MovieProps} from "../type/MovieProps.ts";
import {Link} from "react-router-dom";

export default function UpcomingPage() {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get("/api/movie/upcoming");

      if (response.status === 200) {
        setMovies(response.data.results);
      }

    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 401)
          setError("인증이 필요한 요청입니다. 로그인 후 이용해주세요");
        else if (error.status === 500)
          setError("서버에서 에러가 발생했습니다.");
      }
    } finally {
      setLoading(false);
      console.log(movies)
    }
  };

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black mx-auto p-6">
        <h1 className="text-4xl font-bold text-yellow-400 text-center mb-6">
          Upcoming Movies
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
              <div
                  key={movie.id}
                  className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
              >
                <Link to={`/movies/${movie.id}`} className="movie-item">
                  <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-bold mb-2 truncate">{movie.title}</h2>
                    <p className="text-sm text-gray-400 mb-4">
                      Release Date: {movie.release_date}
                    </p>
                    <p className="text-sm line-clamp-3 text-gray-300 mb-4">{movie.overview}</p>
                    <div className="flex justify-between items-center">
                  <span className="text-yellow-400 font-bold">
                    ⭐ {movie.vote_average.toFixed(1)}
                  </span>
                      <button className="bg-yellow-500 text-black font-bold py-1 px-3 rounded-lg hover:bg-yellow-600">
                        자세히 보기
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
          ))}
        </div>
      </div>
  );
}
