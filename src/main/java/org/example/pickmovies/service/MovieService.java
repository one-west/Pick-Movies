package org.example.pickmovies.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class MovieService {

    private final WebClient.Builder webClientBuilder;

    @Value("${tmdb.api-url}")
    private String apiUrl;

    @Value("${tmdb.api-key}")
    private String apiKey;

    // 인기 영화목록 가져오기
    public Mono<String> getPopularMovies() {
        String url = apiUrl + "/movie/popular?api_key=" + apiKey + "&language=ko&page=1";

        return webClientBuilder.baseUrl(apiUrl).build()
                .get()
                .uri(url)
                .retrieve()
                .bodyToMono(String.class);
    }

    // 개봉 예정 영화목록 가져오기
    public Mono<String> getUpcomingMovies() {
        String url = apiUrl + "/movie/upcoming?api_key=" + apiKey + "&language=ko";

        return webClientBuilder.baseUrl(apiUrl).build()
                .get()
                .uri(url)
                .retrieve()
                .bodyToMono(String.class);
    }

    // 영화 상세 정보 가져오기
    public Mono<String> getMovieDetails(Long id) {
        String url = apiUrl + "/movie/" + id + "?api_key=" + apiKey + "&language=ko";

        return webClientBuilder.baseUrl(apiUrl).build()
                .get()
                .uri(url)
                .retrieve()
                .bodyToMono(String.class);
    }

    // 영화 트레일러 정보를 가져오기
    public Mono<String> getMovieVideos(Long id) {
        String url = apiUrl + "/movie/" + id + "/videos" + "?api_key=" + apiKey + "&language=ko";

        return webClientBuilder.baseUrl(apiUrl).build()
                .get()
                .uri(url)
                .retrieve()
                .bodyToMono(String.class);
    }
}
