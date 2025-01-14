package org.example.pickmovies.service;

import lombok.RequiredArgsConstructor;
import org.example.pickmovies.jwt.RefreshToken;
import org.example.pickmovies.repository.RefreshTokenRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    // userId로 DB에서 refreshToken 찾기
    public RefreshToken findByUserId(Long userId) {
        return refreshTokenRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("Refresh token Not Found"));
    }

    // refreshToken으로 DB에서 refreshToken 찾기
    public RefreshToken findByRefreshToken(String refreshToken) {
        return refreshTokenRepository.findByRefreshToken(refreshToken)
                .orElseThrow(() -> new IllegalArgumentException("Refresh token Not Found"));
    }

}
