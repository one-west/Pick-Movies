import {useEffect, useState} from "react";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import MovieList from "../components/MoviesList.tsx";

export default function SearchPage() {
  const [results, setResults] = useState([]); // 검색 결과 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [query, setQuery] = useState(""); // 검색어 상태
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    const queryFromUrl = queryParams.get("query") || "";
    setQuery(queryFromUrl);
    handleSearch(queryFromUrl);
  }, [location.search]); // URL의 검색어가 바뀔 때마다 검색 실행

  // 검색 결과를 가져오는 함수
  const handleSearch = async (query: string) => {
    if (!query) {
      setResults([]); // 입력값이 없으면 결과를 초기화
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
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
      alert("검색 중 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // Enter 키 입력 시 검색
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      navigate(`/search?query=${query}`); // 쿼리 변경 시 URL 갱신
    }
  };

  // 검색어 입력 시 query 상태 업데이트
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value); // 검색어 변경 시 상태 업데이트
  };

  // search 버튼 클릭 이벤트
  const handleClick = () => {
    navigate(`/search?query=${query}`); // 버튼 클릭 시 URL 갱신
  };

  // 결과 출력
  return (
      <section className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-extrabold mb-6 text-center text-yellow-400">
            Search for Your Favorite Movies
          </h3>
          <div className="flex justify-center mb-8">
            <input
                type="text"
                value={query} // 상태로 관리되는 query 값
                onChange={handleQueryChange} // 검색어 변경 시 상태 업데이트
                onKeyDown={handleKeyDown}
                className="w-full sm:w-3/4 lg:w-1/2 p-4 rounded-l-xl bg-gray-800 text-white placeholder-gray-400 text-lg focus:outline-none"
            />
            <button
                onClick={handleClick} // 버튼 클릭 시 URL 갱신
                className="px-8 py-4 bg-yellow-500 text-gray-900 font-semibold rounded-r-xl hover:bg-yellow-400 focus:outline-none transition-all"
            >
              Search
            </button>
          </div>

          {loading && <p className="mt-4 text-center text-yellow-400">Loading...</p>}

          <MovieList results={results} loading={loading}/>
        </div>
      </section>
  );
}