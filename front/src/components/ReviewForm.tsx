import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {FaStar} from "react-icons/fa";

interface ReviewFormProps {
  movieId: string;
  isAuthenticated: boolean;
  onReviewSubmit: () => void;
}

export default function ReviewForm({movieId, isAuthenticated, onReviewSubmit}: ReviewFormProps) {
  const [reviewText, setReviewText] = useState<string>("");
  const [rating, setRating] = useState<number | null>(null);
  const navigate = useNavigate();

  // 리뷰 저장 이벤트
  const handleReviewSubmit = async () => {
    if (!reviewText.trim()) {
      alert("리뷰를 입력하세요.");
      return;
    }

    try {
      await axios.post("/api/reviews", {
        movieId: movieId,
        content: reviewText,
        rating: rating,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      alert("리뷰가 저장되었습니다!");
      setReviewText(""); // 입력 필드 초기화
      setRating(null); // 별점 초기화
      onReviewSubmit() // 부모 컴포넌트에 작성 완료 전달
    } catch (error) {
      console.error("리뷰 작성 오류:", error);
      alert("리뷰 저장 중 문제가 발생했습니다.");
    }
  };

  // 리뷰 텍스트에리어 이벤트
  const handleTextAreaClick = () => {
    if (!isAuthenticated) {
      alert("리뷰를 작성하려면 로그인이 필요합니다.");
      navigate("/signin", { state: { from: location.pathname } });
    }
  };

  // 리뷰 별점 이벤트
  const handleStarClick = (index: number) => {
    if (isAuthenticated) {
      setRating(index + 1); // 클릭된 별에 해당하는 값 설정
    }
  };

  return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-8 mx-auto">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6">Write a Review</h2>

        {/* 리뷰 텍스트 영역 */}
        <textarea
            className={`w-full p-4 text-gray-900 rounded-lg focus:ring-2 transition ${
                isAuthenticated ? "focus:ring-yellow-500" : "cursor-not-allowed bg-gray-300"
            }`}
            rows={4}
            placeholder="Share your thoughts about this movie..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            onClick={handleTextAreaClick}
        />

        {/* 별점 선택 */}
        <div className="mt-4 flex items-center">
          <span className="text-yellow-400 mr-4">Rating:</span>
          <div className="flex">
            {[...Array(5)].map((_, index) => (
                <FaStar
                    key={index}
                    size={24}
                    className={`cursor-pointer ${
                        rating && index < rating
                            ? "text-yellow-500"
                            : "text-gray-400"
                    }`}
                    onClick={() => handleStarClick(index)} // 클릭시 별점 업데이트
                />
            ))}
          </div>
        </div>

        {/* 제출 버튼 */}
        <button
            className={`mt-6 w-full px-6 py-3 font-semibold rounded-lg transition duration-300 ${
                isAuthenticated
                    ? "bg-yellow-500 text-black hover:bg-yellow-600"
                    : "bg-gray-500 cursor-not-allowed text-gray-300"
            }`}
            onClick={handleReviewSubmit}
            disabled={!isAuthenticated}
        >
          Submit Review
        </button>
      </div>
  );
}
