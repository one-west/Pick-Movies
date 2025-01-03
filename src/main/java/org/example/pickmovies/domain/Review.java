package org.example.pickmovies.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.pickmovies.dto.ReviewDto;

@Entity
@Getter
@NoArgsConstructor
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long movieId;
    private Long userId;

    @Column(length = 500)
    private String content;

    private int rating;

    @Builder
    public Review(ReviewDto reviewDto) {
        this.movieId = reviewDto.getMovieId();
        this.userId = reviewDto.getUserId();
        this.content = reviewDto.getContent();
        this.rating = reviewDto.getRating();
    }

    public Review update(ReviewDto reviewDto) {
        this.content = reviewDto.getContent();
        this.rating = reviewDto.getRating();
        return this;
    }
}