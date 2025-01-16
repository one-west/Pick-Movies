import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {MovieProps} from "../type/MovieProps.ts";
import axios, {AxiosError} from "axios";


export const PopularMovies = () => {
  const [movies, setMovies] = useState<MovieProps[]>([]); // 영화 데이터를 저장할 상태
  const [loading, setLoading] = useState<boolean>(true);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    getPopularMovies();
  }, []);

  const getPopularMovies = async () => {
    try {
      const response = await axios.get(`/api/movie/popular`, {headers: {Authorization: `Bearer ${token}`}})

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