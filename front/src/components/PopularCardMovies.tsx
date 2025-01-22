import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios, {AxiosError} from "axios";
import {MovieProps} from "../type/MovieProps.ts";

export default function PopularCardMovies() {
  const [movies, setMovies] = useState<MovieProps[]>([]); // 영화 데이터를 저장할 상태
  const [loading, setLoading] = useState<boolean>(true);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    getPopularMovies();
  }, []);

  const getPopularMovies = async () => {
    try {
      const response = await axios.get(`/api/movie/popular`, {
        headers: {Authorization: `Bearer ${token}`},
        params: {page: 1}
      })

      if (response.status === 200) {
        setMovies(response.data.results);
      }

    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 401)
          alert("인증이 필요한 요청입니다. 로그인 후 이용해주세요")
        else if (error.status === 500)
          console.error("서버에서 에러가 발생했습니다. : ", error);
      } else {
        console.error(error);
      }

    } finally {
      setLoading(false);
    }
  };

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
      </section>
  );
};