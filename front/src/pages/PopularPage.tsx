import {useEffect, useRef, useState} from "react";
import axios, {AxiosError} from "axios";
import {MovieProps} from "../type/MovieProps.ts";
import MovieList from "../components/MoviesList.tsx";
import MovieFilter from "../components/MovieFilter.tsx";
import {FilterProps} from "../type/FilterProps.ts";

export default function PopularPage() {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<FilterProps>({});
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchMovies(page, filters);
  }, [page, filters]);  // page나 filters가 변경될 때마다 실행

  useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !isFetching) {
            setPage((prevPage) => prevPage + 1);
          }
        },
        {threshold: 1.0}
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [isFetching]);  // isFetching이 변경될 때마다 실행

  const handleFilterChange = (newFilters: FilterProps) => {
    setPage(1); // 필터가 변경되면 페이지를 초기화
    setMovies([]); // 기존 영화 리스트를 초기화
    setFilters(newFilters);
  };

  const fetchMovies = async (page: number, filters: FilterProps) => {
    setIsFetching(true);
    try {
      const response = await axios.get("/api/movie/popular", {
        params: { page, ...filters },
      });

      if (response.status === 200) {
        setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          setError("인증이 필요한 요청입니다. 로그인 후 이용해주세요.");
        } else if (error.response?.status === 500) {
          setError("서버에서 에러가 발생했습니다.");
        } else {
          setError("영화를 불러오는 중 문제가 발생했습니다.");
        }
      }
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  };

  if (loading && page === 1) {
    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
          <div className="text-center">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-yellow-400"></div>
            <p className="text-lg mt-4">Loading upcoming movies...</p>
          </div>
        </section>
    );
  }

  if (error) {
    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
          <div className="text-center">
            <p className="text-lg font-semibold text-red-500 mb-4">{error}</p>
            <button
                onClick={() => fetchMovies(page, filters)}
                className="bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg hover:bg-yellow-600"
            >
              다시 시도하기
            </button>
          </div>
        </section>
    );
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black mx-auto p-6">
        <h1 className="text-4xl font-bold text-yellow-400 text-center mb-6">
          Popular Movies
        </h1>
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-1/5 mt-8">
            <MovieFilter onFilterChange={handleFilterChange} />
          </aside>
          <main className="w-full md:w-3/4">
            <MovieList results={movies} loading={loading} />
            {/* 로딩 표시를 위한 영역 */}
            <div ref={loaderRef} className="text-center mt-6">
              {isFetching && (
                  <div className="spinner-border animate-spin inline-block w-6 h-6 border-4 rounded-full text-yellow-400"></div>
              )}
            </div>
          </main>
        </div>
      </div>
  );
}
