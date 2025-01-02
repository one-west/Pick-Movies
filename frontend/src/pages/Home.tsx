// components/MainPage.tsx
import {useEffect, useState} from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';

export default function Home() {
  const [movies, setMovies] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // TMDB API 호출
  const fetchMovies = async () => {
    try {
      const response = await axios.get(
          `api/api/popular-movies`
      );
      setMovies(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching movies', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Popular Movies</h1>
        {loading ? (
            <p>Loading...</p>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {movies.map((movie) => (
                  <MovieCard
                      key={movie.id}
                      title={movie.title}
                      imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      overview={movie.overview}
                  />
              ))}
            </div>
        )}
      </div>
  );
};
