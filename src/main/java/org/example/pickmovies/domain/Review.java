package org.example.pickmovies.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.security.Timestamp;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.pickmovies.dto.ReviewDto;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Getter
@NoArgsConstructor
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long movieId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(length = 500)
    private String content;

    private int rating;

    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Builder
    public Review(ReviewDto reviewDto, User user) {
        this.user = user;
        this.movieId = reviewDto.getMovieId();
        this.content = reviewDto.getContent();
        this.rating = reviewDto.getRating();
    }

    public Review update(ReviewDto reviewDto) {
        this.content = reviewDto.getContent();
        this.rating = reviewDto.getRating();
        return this;
    }
}