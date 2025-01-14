package org.example.pickmovies.dto;

import java.time.LocalDateTime;
import java.util.Date;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.pickmovies.domain.Review;

@Data
@NoArgsConstructor
public class ReviewDto {
    private Long id;
    private Long movieId;
    private String author;
    private String content;
    private int rating;
    private LocalDateTime createdAt;

    public ReviewDto(Review review) {
        this.id = review.getId();
        this.movieId = review.getMovieId();
        this.author = review.getUser().getUsername();
        this.content = review.getContent();
        this.rating = review.getRating();
        this.createdAt = review.getCreatedAt();
    }
}
