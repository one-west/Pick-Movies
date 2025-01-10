import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function MovieDetail() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const movieResponse = await axios.get(`/api/movies/${movieId}`);
        setMovie(movieResponse.data);

        const relatedResponse = await axios.get(`/api/movies/${movieId}/related`);
        setRelatedMovies(relatedResponse.data);

        const reviewsResponse = await axios.get(`/api/movies/${movieId}/reviews`);
        setReviews(reviewsResponse.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieData();
  }, [movieId]);

  if (loading) return <div>Loading...</div>;
  if (!movie) return <div>영화를 불러올 수 없습니다.</div>;

  return (
      <div className="movie-detail-page p-4">
        <div className="movie-header flex">
          <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-64 h-auto rounded shadow-lg"
          />
          <div className="movie-info ml-8">
            <h1 className="text-3xl font-bold">{movie.title}</h1>
            <p className="mt-4">{movie.description}</p>
            <p className="mt-2 text-sm text-gray-500">
              개봉일: {movie.releaseDate} | 평점: {movie.rating}/10
            </p>
          </div>
        </div>

        <div className="related-movies mt-12">
          <h2 className="text-2xl font-bold mb-4">추천 영화</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedMovies.map((relatedMovie) => (
                <div key={relatedMovie.id} className="related-movie-item">
                  <img
                      src={relatedMovie.posterUrl}
                      alt={relatedMovie.title}
                      className="rounded shadow-lg"
                  />
                  <p className="mt-2 text-center">{relatedMovie.title}</p>
                </div>
            ))}
          </div>
        </div>

        <div className="movie-reviews mt-12">
          <h2 className="text-2xl font-bold mb-4">리뷰</h2>
          {reviews.length > 0 ? (
              reviews.map((review) => (
                  <div key={review.id} className="review-item mb-4 p-4 border rounded">
                    <p className="text-sm text-gray-500">
                      {review.username} - {review.createdAt}
                    </p>
                    <p className="mt-2">{review.content}</p>
                  </div>
              ))
          ) : (
              <p>아직 등록된 리뷰가 없습니다.</p>
          )}
        </div>
      </div>
  );
}

export default MovieDetail;
