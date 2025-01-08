package org.example.pickmovies.controller;

import java.time.Duration;
import lombok.RequiredArgsConstructor;
import org.example.pickmovies.domain.User;
import org.example.pickmovies.dto.LoginRequest;
import org.example.pickmovies.dto.LoginResponse;
import org.example.pickmovies.dto.UserRequest;
import org.example.pickmovies.dto.UserResponse;
import org.example.pickmovies.jwt.JwtTokenProvider;
import org.example.pickmovies.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;
    public static final Duration ACCESS_TOKEN_DURATION = Duration.ofDays(1);

    // 사용자 조회
    @GetMapping("/user/{id}")
    public ResponseEntity<UserResponse> getUser(@PathVariable("id") Long userId) {
        User user = userService.findById(userId);
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
    public ResponseEntity<String> updateUser(@PathVariable("id") Long id, @RequestBody UserRequest request) {
        try {
            User user = userService.updateUser(id, request);
            if (user == null) {
                return ResponseEntity.badRequest().body("Update Failed: User not found");
            }
            return ResponseEntity.ok("Update Success");

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Update Failed: User not found");
        }
    }

    // 사용자 삭제
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    // 사용자 로그인
    @PostMapping("/user/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        try {
            User confirmUser = userService.loginConfirm(request);

            if (confirmUser == null) {
                throw new IllegalArgumentException("Invalid email or password");
            }

            // AccessToken 생성
            String accessToken = jwtTokenProvider.generateToken(confirmUser, ACCESS_TOKEN_DURATION);
            return ResponseEntity.ok(new LoginResponse(confirmUser, accessToken));

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new LoginResponse());
        }
    }
}