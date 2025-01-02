package org.example.pickmovies.controller;

import java.time.Duration;
import java.util.Map;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.example.pickmovies.domain.User;
import org.example.pickmovies.dto.CreateAccessTokenResponse;
import org.example.pickmovies.dto.LoginRequest;
import org.example.pickmovies.jwt.JwtTokenProvider;
import org.example.pickmovies.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;
    public static final Duration ACCESS_TOKEN_DURATION = Duration.ofDays(1);

    @PostMapping("/user")
    public ResponseEntity<String> regist(@RequestBody LoginRequest request) {
        if (request.getEmail() == null || request.getPassword() == null) {
            return ResponseEntity.badRequest().body("Email or Password is missing");
        }

        userService.save(request);
        return ResponseEntity.status(HttpStatus.CREATED).body("Regist Success");
    }

    @PostMapping("/login")
    public ResponseEntity<CreateAccessTokenResponse> login(@RequestBody LoginRequest request) {
        if (request.getEmail() == null || request.getPassword() == null) {
            return ResponseEntity.badRequest().body(new CreateAccessTokenResponse("Email or Password is missing"));
        }

        User findUser = userService.findByEmail(request.getEmail());
        if (findUser != null) {
            // AccessToken 생성
            String accessToken = jwtTokenProvider.generateToken(findUser, ACCESS_TOKEN_DURATION);
            return ResponseEntity.ok(new CreateAccessTokenResponse(accessToken));
        } else {
            return ResponseEntity.badRequest().body(new CreateAccessTokenResponse("Invalid Email or Password"));
        }

    }
}