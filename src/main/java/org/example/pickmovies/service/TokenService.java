package org.example.pickmovies.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.time.Duration;
import lombok.RequiredArgsConstructor;
import org.example.pickmovies.domain.User;
import org.example.pickmovies.jwt.JwtTokenProvider;
import org.example.pickmovies.jwt.RefreshToken;
import org.example.pickmovies.repository.RefreshTokenRepository;
import org.example.pickmovies.utils.CookieUtil;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TokenService {

    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenService refreshTokenService;
    private final UserService userService;
    private final RefreshTokenRepository refreshTokenRepository;

    public static final String REFRESH_TOKEN_COOKIE_NAME = "refresh_token";
    public static final Duration REFRESH_TOKEN_DURATION = Duration.ofDays(7);
    public static final String REDIRECT_PATH = "/";

    // 리프레시 토큰 생성 [AccessToken 갱신]
    public String createRefreshToken(String refreshToken, Duration expiredAt) {

        // refreshToken 유효성 검사
        if (!jwtTokenProvider.validToken(refreshToken)) {
            throw new IllegalArgumentException("Invalid refresh token");
        }

        Long userId = refreshTokenService.findByRefreshToken(refreshToken).getUserId();
        User user = userService.findById(userId);

        // RefreshToken DB에 저장
        saveRefreshToken(user.getId(), refreshToken);

        return jwtTokenProvider.generateToken(user, expiredAt);
    }

    // 생성된 리프레시 토큰을 쿠키에 저장
    public void addRefreshTokenToCookie(HttpServletRequest request, HttpServletResponse response, String refreshToken) {

        int cookieMaxAge = (int) REFRESH_TOKEN_DURATION.toSeconds();
        CookieUtil.deleteCookie(request, response, REFRESH_TOKEN_COOKIE_NAME);
        CookieUtil.addCookie(response, REFRESH_TOKEN_COOKIE_NAME, refreshToken, cookieMaxAge);
    }

    // 생성된 리프레시 토큰을 전달받아 데이터베이스에 저장
    public void saveRefreshToken(Long userId, String newRefreshToken) {
        RefreshToken refreshToken = refreshTokenRepository
                .findByUserId(userId)
                .map(entity -> entity.update(newRefreshToken))
                .orElse(new RefreshToken(userId, newRefreshToken));

        refreshTokenRepository.save(refreshToken);
    }
}
