package org.example.pickmovies.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class MovieService {

    private final WebClient.Builder webClientBuilder;
    ObjectMapper objectMapper = new ObjectMapper();

    @Value("${tmdb.api-url}")
    private String apiUrl;

    @Value("${tmdb.api-key}")
    private String apiKey;

    // 인기 영화목록 가져오기
    public Mono<String> getPopularMovies(int page, String genre, String startDate, String endDate) {
        String url = String.format("%s/discover/movie?api_key=%s&page=%d&language=ko", apiUrl, apiKey, page);

        if (genre != null && !genre.isEmpty()) {
            url += "&with_genres=" + genre;
        }

        if (startDate != null) {
            url += "&primary_release_date.gte=" + startDate;
            if (endDate != null) {
                url += "&primary_release_date.lte=" + endDate;
            }
        }

        return webClientBuilder.baseUrl(apiUrl).build()
                .get()
                .uri(url)
                .retrieve()
                .bodyToMono(String.class);
    }

    // 개봉 예정 영화목록 가져오기
    public Mono<String> getUpcomingMovies(int page, String genre, String startDate, String endDate) {

        String baseurl = genre != null || startDate != null ? "/discover/movie" : "/movie/upcoming";
        String url = String.format("%s%s?api_key=%s&page=%d&language=ko", apiUrl, baseurl, apiKey, page);

        if (genre != null) {
            url += "&with_genres=" + genre;
        }
        if (startDate != null) {
            url += "&primary_release_date.gte=" + startDate;
        }
        if (endDate != null) {
            url += "&primary_release_date.lte=" + endDate;
        }

        return webClientBuilder.baseUrl(apiUrl).build()
                .get()
                .uri(url)
                .retrieve()
                .bodyToMono(String.class);
    }

    // 영화 상세 정보 가져오기
    public Mono<String> getMovieDetails(Long id) {
        String url = String.format("%s/movie/%d?api_key=%s&language=ko", apiUrl, id, apiKey);

        return webClientBuilder.baseUrl(apiUrl).build()
                .get()
                .uri(url)
                .retrieve()
                .bodyToMono(String.class);
    }

    // 영화 트레일러 정보를 가져오기
    public Mono<String> getMovieVideos(Long id) {
        String url = apiUrl + "/movie/" + id + "/videos" + "?api_key=" + apiKey + "&language=ko";
        String fallbackUrl = apiUrl + "/movie/" + id + "/videos" + "?api_key=" + apiKey;

        // `language=ko`로 조회 시 결과가 없을 경우 fallback 처리
        return webClientBuilder.baseUrl(apiUrl).build()
                .get()
                .uri(url)
                .retrieve()
                .bodyToMono(String.class)
                .flatMap(videos -> {
                    try {
                        // JSON 파싱
                        JsonNode rootNode = objectMapper.readTree(videos);
                        JsonNode resultsNode = rootNode.get("results");

                        // results가 비어있는지 확인
                        if (resultsNode != null && resultsNode.isArray() && !resultsNode.isEmpty()) {
                            return Mono.just(videos); // 결과가 있는 경우 반환
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }

                    // results가 비어있거나 JSON 파싱에 실패한 경우 fallback
                    return webClientBuilder.baseUrl(apiUrl).build()
                            .get()
                            .uri(fallbackUrl)
                            .retrieve()
                            .bodyToMono(String.class);
                });
    }

    // 쿼리로 검색된 영화 데이터 가져오기
    public Mono<String> searchMovies(String query) {
        String url = String.format("%s/search/movie?api_key=%s&query=%s&language=ko", apiUrl, apiKey, query);

        return webClientBuilder.baseUrl(url).build()
                .get()
                .uri(url)
                .retrieve()
                .bodyToMono(String.class);
    }
}
