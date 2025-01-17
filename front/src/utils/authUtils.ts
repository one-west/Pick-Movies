import axios from 'axios';
import {useNavigate} from "react-router-dom";

export const refreshAccessToken = async () => {
  const navigate = useNavigate();

  try {
    const response = await axios.post("/api/token/refresh", {
      headers: {
        "Content-Type": "application/json",
      },
    }, {
      withCredentials: true, // 쿠키를 포함한 요청을 보낼 때 사용
    });

    const newAccessToken = response.data;
    localStorage.setItem("accessToken", newAccessToken);

  } catch (error) {
    console.error("리프레시 토큰을 사용한 액세스 토큰 갱신 실패:", error);
    alert("로그인이 필요합니다.");
    localStorage.clear();
    navigate("/signin")
  }
};

export const isTokenExpired = (token: string) => {
  try {
    const decoded = JSON.parse(atob(token.split('.')[1])); // JWT의 Payload 가져오기
    const expirationTime = decoded.exp * 1000; // exp는 초 단위이므로 밀리초로 변환
    const currentTime = Date.now();

    return currentTime > expirationTime; // 현재 시간이 만료 시간보다 크면 만료된 것
  } catch (error) {
    console.error("토큰 디코딩 오류", error);
    return false; // 오류가 나면 기본적으로 만료되지 않은 것으로 처리
  }
};