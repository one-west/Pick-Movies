# Pick-Movies

### 프로젝트 설명

- 개발 기간: 2025-01-01 ~ 2025-01-31
- 사용자가 영화에 별점을 매기고, 평점을 기반으로 영화를 추천받는 서비스

### 주요 기능

- 사용자 관리: 회원 가입 및 로그인
- 영화 정보: TMDB API를 사용하여 영화 데이터 가져오기
- 별점 시스템: 영화에 대한 별점 및 리뷰 작성
- 추천 알고리즘: 사용자가 매긴 평점을 기반으로 추천 영화 제공

### 기술 스택

- Backend: Spring Boot, RestTemplate/WebClient
- Frontend: React 또는 Thymeleaf
- 외부 API: TMDB (The Movie Database) API
- 배포: AWS EC2

---

### 트러블 슈팅

#### 2025-01-20

- 인증 정보 갱신 에러
    - authUtils.ts 작성 중
    - React 컴포넌트가 아닌 컨포넌트에서는 useNavigator()를 사용할 수 없다.