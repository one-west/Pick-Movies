import axios from 'axios';

export const refreshAccessToken = async () => {

  try {
    const response = await axios.post("/api/token/refresh", {
      headers: {
        "Content-Type": "application/json",
      },
    }, {
      withCredentials: true, // 쿠키를 포함한 요청을 보낼 때 사용
    });

    const newAccessToken = await response.data;
    localStorage.setItem("accessToken", newAccessToken);
    return newAccessToken;

  } catch (error) {
    console.error("리프레시 토큰을 사용한 액세스 토큰 갱신 실패:", error);
    localStorage.clear();
  }
};

export const isTokenExpired = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) throw new Error("유효하지 않은 토큰 형식");

    const decodedPayload = JSON.parse(atob(base64Url));
    const expirationTime = decodedPayload.exp * 1000; // 초 단위 → 밀리초 변환
    return Date.now() > expirationTime; // 현재 시간이 만료 시간보다 크면 만료된 것
  } catch (error) {
    console.error("토큰 디코딩 오류", error);
    return true; // 오류 시 기본적으로 만료된 것으로 처리
  }
};
