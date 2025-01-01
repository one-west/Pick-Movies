package org.example.pickmovies.controller;

import lombok.RequiredArgsConstructor;
import org.example.pickmovies.domain.User;
import org.example.pickmovies.dto.UserRequest;
import org.example.pickmovies.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/user")
    public ResponseEntity<String> regist(@RequestBody UserRequest request) {
        if (request.getEmail() == null || request.getPassword() == null) {
            return ResponseEntity.badRequest().body("Email or Password is missing");
        }

        userService.save(request);
        return ResponseEntity.status(HttpStatus.CREATED).body("Regist Success");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserRequest request) {
        if (request.getEmail() == null || request.getPassword() == null) {
            return ResponseEntity.badRequest().body("Email or Password is missing");
        }

        User findUser = userService.findByEmail(request.getEmail());
        return ResponseEntity.ok("Login Success");
    }
}