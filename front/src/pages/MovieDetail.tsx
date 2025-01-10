import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {MovieProps, MovietrailerProps} from "../type/MovieProps.ts";
import {YouTubeVideo} from "../components/YoutubeVideo.tsx";

export default function MovieDetail() {
  const {id} = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieProps>();
  const [videoId, setVideoId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(`/api/movie/${id}`);
      setMovie(response.data);
      setLoading(false);
    } catch (error) {
      console.error("에러 fetchMovieDetails 중 문제발생:", error);
      setLoading(false);
    }
  };

  const fetchTrailer = async (id: string) => {
    try {
      const response: AxiosResponse<MovietrailerProps> = await axios.get(`/api/movie/${id}/videos`);
      const trailers = response.data.results.filter(
          (video) => video.type === "Trailer"
      );

      for (const trailer of trailers) {
        if (trailer.key !== null) {
          setVideoId(trailer.key)
          return;
        }
      }
    } catch (error) {
      console.error("에러 fetchTrailer 중 문제발생", error);
      return null;
    }
  };

  useEffect(() => {
    fetchMovieDetails();
    fetchTrailer(id!);
  }, [id]);

  if (loading) {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
          <p className="text-xl font-semibold animate-pulse">Loading...</p>
        </div>
    );
  }

  if (!movie) {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
          <p className="text-xl font-semibold">Movie details not found.</p>
        </div>
    );
  }

  return (
      <div
          className="min-h-screen bg-gray-900 text-white"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
      >
        <div className="bg-gradient-to-b from-gray-900 via-gray-900/80 to-gray-900 min-h-screen">
          <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
              {/* 영화 포스터 */}
              <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full lg:w-1/3 rounded-lg shadow-lg"
              />
              {/* 영화 상세 정보 */}
              <div className="flex-1">
                <h1 className="text-5xl font-bold text-yellow-400 mb-6">
                  {movie.title}
                </h1>
                {movie.tagline && (
                    <p className="italic text-yellow-300 text-xl mb-4">
                      "{movie.tagline}"
                    </p>
                )}
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  {movie.overview}
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  {movie.genres.map((genre) => (
                      <span
                          key={genre.id}
                          className="px-4 py-1 bg-yellow-500 text-black rounded-full text-sm font-semibold"
                      >
                    {genre.name}
                  </span>
                  ))}
                </div>
                <div className="space-y-3">
                  <p>
                    <strong className="text-yellow-400">Release Date:</strong>{" "}
                    {movie.release_date}
                  </p>
                  <p>
                    <strong className="text-yellow-400">Runtime:</strong>{" "}
                    {movie.runtime} 분
                  </p>
                  <p>
                    <strong className="text-yellow-400">Rating:</strong>{" "}
                    {movie.vote_average} / 10
                  </p>
                </div>
                {/* 액션 버튼 */}
                <div className="flex gap-4 mt-8">
                  <button
                      onClick={openModal}
                      disabled={!videoId}
                      className={`bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold transition ${
                          videoId ? "hover:bg-yellow-600" : "opacity-50 cursor-not-allowed"
                      }`}
                  >
                    Watch Trailer
                  </button>
                  {isModalOpen && videoId && (
                      <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
                        <div className="relative w-11/12 lg:w-2/3">
                          {/* 닫기 버튼 */}
                          <button
                              onClick={closeModal}
                              className="absolute top-2 -right-12 bg-gray-800 text-white rounded-full p-2 focus:outline-none"
                          >
                            ✖
                          </button>
                          {/* 트레일러 영상 */}
                          <YouTubeVideo videoId={videoId}/>
                        </div>
                      </div>
                  )}
                  <button className="bg-gray-800 text-yellow-400 px-6 py-2 rounded-lg font-semibold hover:bg-gray-700 transition">
                    Add to Watchlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
