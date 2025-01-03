package org.example.pickmovies.service;

import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.example.pickmovies.domain.Review;
import org.example.pickmovies.dto.ReviewDto;
import org.example.pickmovies.repository.ReviewRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;

    // 리뷰 생성
    public Review createReview(ReviewDto reviewDto) {
        Review newReview = Review.builder().reviewDto(reviewDto).build();
        return reviewRepository.save(newReview);
    }

    // 특정 영화의 리뷰 조회
    public List<Review> getReviewsByMovie(Long movieId) {
        return reviewRepository.findByMovieId(movieId);
    }

    // 특정 유저의 리뷰 조회
    public List<Review> getReviewsByUser(Long userId) {
        return reviewRepository.findByUserId(userId);
    }

    // 리뷰 수정
    @Transactional
    public Review updateReview(Long reviewId, ReviewDto reviewDto) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found"));
        review.update(reviewDto);

        return review;
    }

    // 리뷰 삭제
    public void deleteReview(Long reviewId) {
        if (!reviewRepository.existsById(reviewId)) {
            throw new RuntimeException("Review not found");
        }
        reviewRepository.deleteById(reviewId);
    }
}
