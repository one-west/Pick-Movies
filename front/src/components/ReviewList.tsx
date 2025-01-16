import {useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import {Review, ReviewListProps} from "../type/ReviewProps.ts";


export default function ReviewList({movieId, reviewsUpdated}: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchReviews();
  }, [movieId, reviewsUpdated]);

  const token = localStorage.getItem("accessToken");

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`/api/reviews/movie/${movieId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // JWT 토큰 추가
        },
      });

      if (response.status === 200) {
        setReviews(response.data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 401) {
          alert("인증이 필요한 요청입니다. 로그인 후 이용해주세요");
          console.error("리뷰 데이터를 불러오지 못했습니다:", error);
        } else if (error.status === 500)
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
        <div className="text-white text-center">
          <p>리뷰를 불러오는 중...</p>
        </div>
    );
  }

  if (reviews.length === 0) {
    return (
        <div className="text-white text-center">
          <p>아직 작성된 리뷰가 없습니다.</p>
        </div>
    );
  }

  return (
      <div className="mt-8">
        <h2 className="text-3xl font-bold text-yellow-400 mb-6">Reviews</h2>
        <ul className="space-y-6">
          {reviews.map((review) => (
              <li key={review.id} className="bg-gray-800 rounded-lg p-4 shadow-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold text-yellow-300">
                    {review.author}
                  </h3>
                  <span className="text-gray-400 text-sm">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-300">{review.content}</p>
              </li>
          ))}
        </ul>
      </div>
  );
}
