package org.example.pickmovies.controller;

import lombok.RequiredArgsConstructor;
import org.example.pickmovies.service.MovieService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;

    // 인기 영화 데이터 반환
    @GetMapping("/movie/popular")
    public ResponseEntity<Mono<String>> getPopularMovies(@RequestParam("page") String page) {
        return ResponseEntity.ok(movieService.getPopularMovies(page));
    }

    // 개봉 예정 영화 데이터를 반환
    @GetMapping("/movie/upcoming")
    public Mono<String> getUpcomingMovies(@RequestParam("page") String page) {
        return movieService.getUpcomingMovies(page);
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

    @GetMapping("/movie/search")
    public Mono<String> searchMovies(@RequestParam("query") String query) {
        return movieService.searchMovies(query);
    }
}
