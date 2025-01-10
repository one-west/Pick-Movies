import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function MovieDetail() {
  const { movieId } = useParams(); // URL에서 movieId 추출
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 영화 정보를 가져오는 함수
    const fetchMovieDetail = async () => {
      try {
        const response = await axios.get(`/api/movies/${movieId}`);
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        console.error("영화 정보를 가져오는 중 에러 발생:", error);
      }
    };

    fetchMovieDetail();
  }, [movieId]);

  if (loading) return <div>Loading...</div>;

  if (!movie) return <div>영화 정보를 가져오지 못했습니다.</div>;

  return (
      <div className="movie-detail-container">
        <h1>{movie.title}</h1>
        <img src={movie.posterUrl} alt={movie.title} />
        <p>{movie.description}</p>
        <ul>
          <li>개봉일: {movie.releaseDate}</li>
          <li>평점: {movie.rating}</li>
        </ul>
      </div>
  );
}

export default MovieDetail;
