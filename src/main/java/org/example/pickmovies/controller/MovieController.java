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
    public ResponseEntity<Mono<String>> getPopularMovies(@RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "genre", required = false) String genre,
            @RequestParam(value = "startDate", required = false) String startDate,
            @RequestParam(value = "endDate", required = false) String endDate) {

        Mono<String> popularMovies = movieService.getPopularMovies(page, genre, startDate, endDate);
        return ResponseEntity.ok(popularMovies);
    }

    // 개봉 예정 영화 데이터를 반환
    @GetMapping("/movie/upcoming")
    public ResponseEntity<Mono<String>> getUpcomingMovies(@RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "genre", required = false) String genre,
            @RequestParam(value = "startDate", required = false) String startDate,
            @RequestParam(value = "endDate", required = false) String endDate) {

        Mono<String> upcomingMovies = movieService.getUpcomingMovies(page, genre, startDate, endDate);
        return ResponseEntity.ok(upcomingMovies);
    }

    // 특정 영화 상세 정보를 반환
    @GetMapping("/movie/{id}")
    public ResponseEntity<Mono<String>> getMovieDetails(@PathVariable("id") Long id) {
        return ResponseEntity.ok(movieService.getMovieDetails(id));
    }

    // 영화 트레일러 정보를 반환
    @GetMapping("/movie/{id}/videos")
    public ResponseEntity<Mono<String>> getMovieVideos(@PathVariable("id") Long id) {
        return ResponseEntity.ok(movieService.getMovieVideos(id));
    }

    @GetMapping("/movie/search")
    public ResponseEntity<Mono<String>> searchMovies(@RequestParam("query") String query) {
        return ResponseEntity.ok(movieService.searchMovies(query));
    }
}
