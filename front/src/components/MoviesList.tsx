import {MovieProps} from "../type/MovieProps.ts";
import {Link} from "react-router-dom";

interface MovieListProps {
  results: MovieProps[];
  loading: boolean;
}


export default function MovieList({results, loading}: MovieListProps) {
  if (results.length === 0 && !loading) {
    return <p className="mt-8 text-center text-gray-400">일치하는 영화가 없습니다.</p>;
  }
  return (
      <ul className="mt-8 space-y-6">
        {results.map((movie) => (
            <li key={movie.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <Link to={`/movies/${movie.id}`} className="movie-item">
                <div className="flex">
                  <img
                      src={
                        movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : "/placeholder.jpg" // 포스터가 없을 경우 기본 이미지 표시
                      }
                      alt={movie.title}
                      className="w-32 h-48 object-cover mr-4"
                  />
                  <div>
                    <h4 className="text-xl font-semibold">{movie.title}</h4>
                    <p className="text-sm text-gray-400 mt-1">
                      {movie.release_date || "Unknown release date"}
                    </p>
                    <p className="text-gray-300 mt-3">{movie.overview?.slice(0, 150)}...</p>
                  </div>
                </div>
              </Link>
            </li>
        ))}
      </ul>
  )
}