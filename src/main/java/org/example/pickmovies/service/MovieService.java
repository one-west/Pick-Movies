package org.example.pickmovies.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class MovieService {

    private final WebClient webClient;

    @Value("${tmdb.api-key}")
    private String apiKey;

    public MovieService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://api.themoviedb.org/3").build();
    }

//    public List<MovieDto> getPopularMovies() {
//        return webClient.get()
//                .uri(uriBuilder -> uriBuilder
//                        .path("/movie/popular")
//                        .queryParam("api_key", apiKey)
//                        .build())
//                .retrieve()
//                .bodyToMono(MovieResponse.class)
//                .block()
//                .getResults();
//    }
}
