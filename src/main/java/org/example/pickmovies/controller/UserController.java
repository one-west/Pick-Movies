package org.example.pickmovies.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.time.Duration;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.pickmovies.domain.User;
import org.example.pickmovies.dto.LoginRequest;
import org.example.pickmovies.dto.LoginResponse;
import org.example.pickmovies.dto.UserRequest;
import org.example.pickmovies.dto.UserResponse;
import org.example.pickmovies.jwt.JwtTokenProvider;
import org.example.pickmovies.service.TokenService;
import org.example.pickmovies.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;
    private final TokenService tokenService;
    public static final Duration ACCESS_TOKEN_DURATION = Duration.ofHours(2);
    public static final Duration REFRESH_TOKEN_DURATION = Duration.ofDays(7);

    // 사용자 조회
    @GetMapping("/user")
    public ResponseEntity<UserResponse> getUser() {
        User user = userService.getCurrentUser();
        return ResponseEntity.ok(new UserResponse(user));
    }

    // 사용자 등록
    @PostMapping("/user")
    public ResponseEntity<String> regist(@RequestBody UserRequest request) {
        if (request.getEmail() == null || request.getPassword() == null) {
            return ResponseEntity.badRequest().body("Email or Password is missing");
        }

        Long userId = userService.createUser(request);
        if (userId != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Regist Success");
        } else {
            return ResponseEntity.badRequest().body("Regist Failed: Invalid input or duplicate user");
        }
    }

    // 사용자 정보 수정
    @PutMapping("/user/{id}")
    public ResponseEntity<?> updateUser(@PathVariable("id") Long id, @RequestBody UserRequest request) {
        try {
            User user = userService.updateUser(id, request);
            return ResponseEntity.ok(new UserResponse(user));

        } catch (IllegalArgumentException e) {
            // 사용자 정보가 존재하지 않을 때
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Update Failed: User with the provided ID not found" + e.getStackTrace());

        } catch (BadCredentialsException e) {
            // 현재 비밀번호가 틀린 경우
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Update Failed: The current password does not match");

        } catch (Exception e) {
            // 그 외 예상치 못한 오류
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Update Failed: Unknown error");
        }
    }

    // 사용자 삭제
    @DeleteMapping("/user/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    // 사용자 로그인
    @PostMapping("/user/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request,
            HttpServletResponse response) {
        log.info("UserController.login () === " + loginRequest.getEmail());
        try {
            User confirmUser = userService.loginConfirm(loginRequest);

            if (confirmUser == null) {
                throw new IllegalArgumentException("Invalid email or password");
            }

            // AccessToken 생성
            String accessToken = jwtTokenProvider.generateToken(confirmUser, ACCESS_TOKEN_DURATION);

            // RefreshToken 생성 및 DB 저장
            String refreshToken = jwtTokenProvider.generateToken(confirmUser, REFRESH_TOKEN_DURATION);
            tokenService.saveRefreshToken(confirmUser.getId(), refreshToken);

            // 쿠키에 저장
            tokenService.addRefreshTokenToCookie(request, response, refreshToken);

            return ResponseEntity.ok(new LoginResponse(confirmUser, accessToken));

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new LoginResponse());
        }
    }

    @GetMapping("/user/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        new SecurityContextLogoutHandler().logout(request, response, auth);
        return ResponseEntity.ok("logout successful");
    }
}