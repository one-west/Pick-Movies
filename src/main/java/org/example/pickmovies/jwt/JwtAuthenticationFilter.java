package org.example.pickmovies.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;
    private final static String HEADER_AUTHORIZATION = "Authorization";
    private final static String TOKEN_PREFIX = "Bearer ";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        log.info("JwtAuthenticationFilter.doFilterInternal() 진입");

        // 요청 헤더의 Authorization 키 값 조회
        final String authorizationHeader = request.getHeader(HEADER_AUTHORIZATION);

        // 접두사 제거 (AccessToken 만 가져오기)
        String jwtToken = getAccessToken(authorizationHeader);

        // 토큰이 유효한지 확인 후, 인증 정보를 SecurityContextHolder
        if (jwtTokenProvider.validToken(jwtToken)) {
            Authentication authentication = jwtTokenProvider.getAuthentication(jwtToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }

    // request에서 AccessToken 추출
    private String getAccessToken(String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith(TOKEN_PREFIX)) {
            // "Bearer "를 제외한 실제 토큰 값
            return authorizationHeader.substring(TOKEN_PREFIX.length());
        }
        return null;
    }
}
