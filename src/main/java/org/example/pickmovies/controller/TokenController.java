package org.example.pickmovies.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import java.time.Duration;
import java.util.Arrays;
import lombok.RequiredArgsConstructor;
import org.example.pickmovies.domain.User;
import org.example.pickmovies.jwt.JwtTokenProvider;
import org.example.pickmovies.jwt.RefreshToken;
import org.example.pickmovies.repository.RefreshTokenRepository;
import org.example.pickmovies.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/token")
@RequiredArgsConstructor
public class TokenController {

    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserService userService;

    public static final Duration ACCESS_TOKEN_DURATION = Duration.ofHours(2);

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshAccessToken(HttpServletRequest request) {

        String refreshToken = Arrays.stream(request.getCookies())
                .filter(cookie -> "refresh_token".equals(cookie.getName()))
                .findFirst()
                .map(Cookie::getValue)
                .orElseThrow(() -> new RuntimeException("리프레시 토큰이 없습니다."));

        // 리프레시 토큰 검증
        if (!jwtTokenProvider.validToken(refreshToken)) {
            return ResponseEntity.status(401).body("Refresh token has expired. Please log in again.");
        }

        // 사용자 가져오기
        Long userId = jwtTokenProvider.getUserId(refreshToken);
        User findUser = userService.findById(userId);

        // 저장된 리프레시 토큰과 비교
        RefreshToken storedToken = refreshTokenRepository.findById(userId).orElse(null);
        if (storedToken == null || !storedToken.getRefreshToken().equals(refreshToken)) {
            return ResponseEntity.status(401).body("Invalid refresh token.");
        }

        // 새 액세스 토큰 생성
        String newAccessToken = jwtTokenProvider.generateToken(findUser, ACCESS_TOKEN_DURATION);

        return ResponseEntity.ok(newAccessToken);
    }
}