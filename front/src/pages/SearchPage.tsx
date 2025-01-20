import { useRef, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function SearchPage() {
  const inputRef = useRef<HTMLInputElement>(null); // 입력 요소에 접근하기 위한 Ref
  const [results, setResults] = useState([]); // 검색 결과 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get("query") || ""; // URL에서 쿼리 파라미터로 검색어 가져오기

  // 검색 이벤트
  const handleSearch = async () => {
    const query = inputRef.current?.value.trim();

    if (!query) {
      alert("검색어를 입력해주세요");
      inputRef.current?.focus();
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`/api/movie/search`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          query,
        },
      });
      setResults(response.data.results); // 검색 결과 저장
      // 쿼리 파라미터를 URL에 추가하여 URL 상태 유지
      navigate(`/search?query=${query}`);
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
      alert("검색 중 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // Enter 키 입력 시 검색
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
      <section className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-extrabold mb-6 text-center text-yellow-400">
            Search for Your Favorite Movies
          </h3>
          <div className="flex justify-center mb-8">
            <input
                ref={inputRef}
                type="text"
                placeholder="Search by title, genre, or actor..."
                defaultValue={initialQuery}
                className="w-full sm:w-3/4 lg:w-1/2 p-4 rounded-l-xl bg-gray-800 text-white placeholder-gray-400 text-lg focus:outline-none"
                onKeyDown={handleKeyPress}
            />
            <button
                onClick={handleSearch}
                className="px-8 py-4 bg-yellow-500 text-gray-900 font-semibold rounded-r-xl hover:bg-yellow-400 focus:outline-none transition-all"
            >
              Search
            </button>
          </div>
          {loading && (
              <p className="mt-4 text-center text-yellow-400">Loading...</p>
          )}
          {results.length > 0 && (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {results.map((movie: any) => (
                    <div key={movie.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                      <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.title}
                          className="w-full h-64 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="text-xl font-semibold">{movie.title}</h4>
                        <p className="text-sm text-gray-400 mt-1">
                          {movie.release_date || "Unknown release date"}
                        </p>
                        <p className="text-gray-300 mt-3">{movie.overview?.slice(0, 150)}...</p>
                      </div>
                    </div>
                ))}
              </div>
          )}
        </div>
      </section>
  );
}
