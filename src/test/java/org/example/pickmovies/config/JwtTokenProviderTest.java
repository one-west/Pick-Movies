package org.example.pickmovies.config;

import io.jsonwebtoken.Jwts;
import java.time.Duration;
import java.util.Date;
import org.assertj.core.api.Assertions;
import org.example.pickmovies.JwtFactory;
import org.example.pickmovies.domain.User;
import org.example.pickmovies.jwt.JwtProperties;
import org.example.pickmovies.jwt.JwtTokenProvider;
import org.example.pickmovies.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;

@SpringBootTest
class JwtTokenProviderTest {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtProperties jwtProperties;

    @DisplayName("generateToken() : 유저 정보와 만료 기간을 전달해 토큰 생성")
    @Test
    void generateToken() {

        // Given
        User testUser = userRepository.save(User.builder().email("test@email.com").password("test").build());

        // When
        String token = jwtTokenProvider.generateToken(testUser, Duration.ofDays(14));
        System.out.println(token);

        // Then
        Long userId = Jwts.parser()
                .setSigningKey(jwtProperties.getSecret())
                .parseClaimsJws(token)
                .getBody()
                .get("id", Long.class);

        System.out.println("TestUser.getId() : " + testUser.getId());
        System.out.println("userId : " + userId);

        Assertions.assertThat(userId).isEqualTo(testUser.getId());
    }

    @DisplayName("validToken() : 만료된 토큰일 때 유효성 검증에 실패")
    @Test
    void validToken_Fail() {
        // Given
        String token = JwtFactory.builder().expiration(new Date(new Date().getTime() - Duration.ofDays(7).toMillis())).build().createToken(jwtProperties);
        System.out.println(token);

        // When
        boolean isValid = jwtTokenProvider.validToken(token);

        // Then
        Assertions.assertThat(isValid).isFalse();
    }
    @DisplayName("validToken() : 만료되지 토큰일 때 유효성 검증에 성공")
    @Test
    void validToken_Success() {
        // Given
        String token = JwtFactory.defaultValues().createToken(jwtProperties);
        System.out.println(token);

        // When
        boolean isValid = jwtTokenProvider.validToken(token);

        // Then
        Assertions.assertThat(isValid).isTrue();
    }

    @DisplayName("getAuthentication() : 토큰 기반으로 인증 정보 가져오기")
    @Test
    void getAuthentication() {
        // Given
        String userEmail = "test@email.com";
        String token = JwtFactory.builder().subject(userEmail).build().createToken(jwtProperties);

        // When
        Authentication authentication = jwtTokenProvider.getAuthentication(token);

        // Then
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Assertions.assertThat(userDetails.getUsername()).isEqualTo(userEmail);
    }
}