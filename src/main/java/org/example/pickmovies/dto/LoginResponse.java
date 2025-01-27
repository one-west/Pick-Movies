package org.example.pickmovies.dto;

import lombok.Getter;
import org.example.pickmovies.domain.User;

@Getter
public class LoginResponse {

    private String email;
    private String username;
    private String accessToken;

    public LoginResponse() {
    }

    public LoginResponse(User user, String accessToken) {
        this.email = user.getEmail();
        this.username = user.getUsername();
        this.accessToken = accessToken;
    }
}
