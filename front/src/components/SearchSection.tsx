import {useRef} from "react";
import {useNavigate} from "react-router-dom";

export default function SearchSection() {
  const inputRef = useRef<HTMLInputElement>(null); // 입력 요소에 접근하기 위한 Ref
  const navigate = useNavigate()

  // 검색 이벤트
  const handleSearch = async () => {
    const query = inputRef.current?.value.trim();

    if (!query) { // 입력값이 없으면 실행하지 않음
      alert("검색어를 입력해주세요");
      inputRef.current?.focus();
      return;
    }

    navigate(`/search?query=${query}`)
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
        </div>
      </section>
  );
}
