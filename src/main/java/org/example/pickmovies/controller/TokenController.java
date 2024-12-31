package org.example.pickmovies.controller;

import lombok.RequiredArgsConstructor;
import org.example.pickmovies.dto.CreateAccessTokenRequest;
import org.example.pickmovies.dto.CreateAccessTokenResponse;
import org.example.pickmovies.service.TokenService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class TokenController {

    private final TokenService tokenService;

    @PostMapping("/token")
    public ResponseEntity<CreateAccessTokenResponse> createAccessToken(@RequestBody CreateAccessTokenRequest request) {
        String newToken = tokenService.createAccessToken(request.getRefreshToken());
        return ResponseEntity.status(HttpStatus.CREATED).body(new CreateAccessTokenResponse(newToken));
    }
}
