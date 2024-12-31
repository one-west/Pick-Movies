package org.example.pickmovies;

import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.time.Duration;
import java.util.Collections;
import java.util.Date;
import java.util.Map;
import lombok.Builder;
import lombok.Getter;
import org.example.pickmovies.domain.User;
import org.example.pickmovies.jwt.JwtProperties;
import org.springframework.beans.factory.annotation.Value;

@Getter
public class JwtFactory {

    private String subject = "test@email.com";
    private Date issuedAt = new Date();
    private Date expiration = new Date(new Date().getTime() + Duration.ofDays(14).toMillis());
    private Map<String, Object> claims = Collections.emptyMap();

    @Builder
    public JwtFactory(String subject, Date issuedAt, Date expiration, Map<String, Object> claims) {
        this.subject = subject;
        this.issuedAt = issuedAt;
        this.expiration = expiration;
        this.claims = claims;
    }

    public static JwtFactory defaultValues() {
        return JwtFactory.builder().build();
    }

    public String createToken(JwtProperties jwtProperties) {
            return Jwts.builder()
                    .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                    .setIssuer(jwtProperties.getIssuer())
                    .setIssuedAt(issuedAt) // 토큰 발급 시간
                    .setExpiration(expiration) // 만료 시간 (1시간)
                    .setSubject(subject) // payload에 사용자 이름을 넣음
                    .addClaims(claims)
                    .signWith(SignatureAlgorithm.HS256, jwtProperties.getSecret()) // HS256 알고리즘을 사용한 서명
                    .compact();
    }
}
