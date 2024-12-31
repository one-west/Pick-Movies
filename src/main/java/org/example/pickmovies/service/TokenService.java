package org.example.pickmovies.service;

import java.time.Duration;
import lombok.RequiredArgsConstructor;
import org.example.pickmovies.domain.User;
import org.example.pickmovies.jwt.JwtTokenProvider;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TokenService {

    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenService refreshTokenService;
    private final UserService userService;

    public String createAccessToken(String refreshToken) {

        // refreshToken 유효성 검사
        if (!jwtTokenProvider.validToken(refreshToken)) {
            throw new IllegalArgumentException("Invalid refresh token");
        }

        Long userId = refreshTokenService.findByRefreshToken(refreshToken).getUserId();
        User user = userService.findById(userId);

        return jwtTokenProvider.generateToken(user, Duration.ofHours(2));
    }
}
