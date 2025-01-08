package org.example.pickmovies.dto;

import lombok.Getter;
import org.example.pickmovies.domain.User;

@Getter
public class LoginResponse {

    private String email;
    private String password;
    private String accessToken;

    public LoginResponse() {
    }

    public LoginResponse(User user, String accessToken) {
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.accessToken = accessToken;
    }
}
