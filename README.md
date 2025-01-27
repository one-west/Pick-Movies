# Pick-Movies

### 프로젝트 설명

- 개발 기간: 2025-01-01 ~ 2025-01-31
- 사용자가 영화에 별점을 매기고, 평점을 기반으로 영화를 추천받는 서비스

### 주요 기능

- 사용자 관리: 회원 가입 및 로그인
- 영화 검색:
    - 인기 영화 추천
    - 개봉 예정 영화 추천
    - 필터 기능을 통해 영화 검색
- 별점 시스템: 영화에 대한 별점 및 리뷰 작성

### 기술 스택

- Backend: Spring Boot, RestTemplate/WebClient
- Frontend: React 또는 Thymeleaf
- 외부 API: TMDB (The Movie Database) API
- 배포: AWS EC2

---

### 트러블 슈팅

- authUtils.ts 작성 중 "Cannot read properties of undefined (reading 'navigate')" 발생

    - 문제 해결
        - React 컴포넌트가 아닌 컨포넌트에서는 useNavigator()와 같은 Hook을 사용할 수 없다는 것을 확인
        - Hook 제거
        ```ts
        // authUtils.ts [ Hook을 제거하여 에러 해결 ]
        // import {useNavigate} from "react-router-dom";
        export const refreshAccessToken = async () => {
          // const navi = useNavigate()
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
            // navi("/signin")
          }
        };
        ```