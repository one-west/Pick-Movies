package org.example.pickmovies.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.example.pickmovies.domain.Review;
import org.example.pickmovies.domain.User;
import org.example.pickmovies.dto.ReviewDto;
import org.example.pickmovies.service.ReviewService;
import org.example.pickmovies.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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

    private static final Logger log = LoggerFactory.getLogger(ReviewController.class);
    private final ReviewService reviewService;
    private final UserService userService;

    // 리뷰 생성
    @PostMapping("/reviews")
    public ResponseEntity<ReviewDto> createReview(@RequestBody ReviewDto reviewDto) {
        try {
            // SecurityContextHolder의 Authentication 객체를 가져오기
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            // Authentication 객체 유효성 검사
            if (authentication == null || !authentication.isAuthenticated()) {
                throw new UsernameNotFoundException("인증된 사용자가 없습니다.");
            }
            if (!(authentication.getPrincipal() instanceof UserDetails userDetails)) {
                throw new UsernameNotFoundException("인증된 사용자 정보가 올바르지 않습니다.");
            }

            //  객체에서 사용자 정보를 가져오기
            String userEmail = userDetails.getUsername();

            User findUser = userService.findByEmail(userEmail);
            reviewDto.setId(findUser.getId());
            Review createdReview = reviewService.createReview(reviewDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(new ReviewDto(createdReview));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ReviewDto());
        }
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
