package org.example.pickmovies.controller;

import lombok.RequiredArgsConstructor;
import org.example.pickmovies.service.MovieService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;

    @GetMapping("/api/popular-movies")
    public ResponseEntity<Mono<String>> getPopularMovies() {
        return ResponseEntity.ok(movieService.getPopularMovies());
    }
}
