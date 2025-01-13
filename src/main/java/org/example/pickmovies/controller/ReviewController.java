package org.example.pickmovies.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.example.pickmovies.domain.Review;
import org.example.pickmovies.domain.User;
import org.example.pickmovies.dto.ReviewDto;
import org.example.pickmovies.service.ReviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;


    // 리뷰 생성
    @PostMapping("/reviews")
    public ResponseEntity<ReviewDto> createReview(@RequestBody ReviewDto reviewDto, @AuthenticationPrincipal User user) {
        // userDetails에서 인증된 사용자 정보 가져오기
        Long userId = user.getId();
        reviewDto.setUserId(userId);
        Review createdReview = reviewService.createReview(reviewDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ReviewDto(createdReview));
    }

    // 특정 영화의 리뷰 조회
    @GetMapping("/reviews/movie/{id}")
    public ResponseEntity<List<ReviewDto>> getReviewsByMovie(@PathVariable("id") Long movieId) {
        List<ReviewDto> reviews = reviewService.getReviewsByMovie(movieId).stream().map(ReviewDto::new).toList();
        return ResponseEntity.ok(reviews);
    }

    // 특정 유저의 리뷰 조회
    @GetMapping("/reviews/user/{id}")
    public ResponseEntity<List<ReviewDto>> getReviewsByUser(@PathVariable("id") Long userId) {
        List<ReviewDto> reviews = reviewService.getReviewsByUser(userId).stream().map(ReviewDto::new).toList();
        ;
        return ResponseEntity.ok(reviews);
    }

    // 리뷰 수정
    @PutMapping("/reviews/{id}")
    public ResponseEntity<ReviewDto> updateReview(@PathVariable("id") Long reviewId, @RequestBody ReviewDto reviewDto) {
        Review updatedReview = reviewService.updateReview(reviewId, reviewDto);
        return ResponseEntity.ok(new ReviewDto(updatedReview));
    }

    // 리뷰 삭제
    @DeleteMapping("/reviews/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable("id") Long reviewId) {
        reviewService.deleteReview(reviewId);
        return ResponseEntity.noContent().build();
    }
}
