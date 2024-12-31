package org.example.pickmovies.dto;

import lombok.Data;

@Data
public class AddUserRequest {
    private String email;
    private String password;
}
