package org.example.pickmovies.controller;

import lombok.RequiredArgsConstructor;
import org.example.pickmovies.service.UserService;
import org.example.pickmovies.utils.JwtUtil;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final JwtUtil jwtUtil;
    private final UserService userService;

    @PostMapping("/login")
    public String login(@RequestParam String username, @RequestParam String password) {

        if ("testuser".equals(username) && "password123".equals(password)) {
            // 인증이 성공하면 JWT 토큰 생성하여 반환
            return jwtUtil.generateToken(username);
        }
        return "Invalid credentials";
    }
}
