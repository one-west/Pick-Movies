package org.example.pickmovies.controller;

import lombok.RequiredArgsConstructor;
import org.example.pickmovies.service.MovieService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;

    // 인기 영화 데이터 반환
    @GetMapping("/movie/popular")
    public ResponseEntity<Mono<String>> getPopularMovies() {
        return ResponseEntity.ok(movieService.getPopularMovies());
    }

    // 개봉 예정 영화 데이터를 반환
    @GetMapping("/movie/upcoming")
    public Mono<String> getUpcomingMovies() {
        return movieService.getUpcomingMovies();
    }

    // 특정 영화 상세 정보를 반환
    @GetMapping("/movie/{id}")
    public Mono<String> getMovieDetails(@PathVariable("id") Long id) {
        return movieService.getMovieDetails(id);
    }

    // 영화 트레일러 정보를 반환
    @GetMapping("/movie/{id}/videos")
    public Mono<String> getMovieVideos(@PathVariable("id") Long id) {
        return movieService.getMovieVideos(id);
    }
}
