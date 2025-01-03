package org.example.pickmovies.repository;

import java.util.List;
import org.example.pickmovies.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByMovieId(Long movieId);
    List<Review> findByUserId(Long userId);
}
