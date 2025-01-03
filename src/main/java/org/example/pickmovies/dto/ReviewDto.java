package org.example.pickmovies.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.pickmovies.domain.Review;

@Getter
@NoArgsConstructor
public class ReviewDto {
    private Long id;
    private Long movieId;
    private Long userId;
    private String content;
    private int rating;

    public ReviewDto(Review review) {
        this.id = id;
        this.movieId = movieId;
        this.userId = userId;
        this.content = content;
        this.rating = rating;
    }
}
