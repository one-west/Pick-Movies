package org.example.pickmovies.dto;

import lombok.Data;

@Data
public class UserRequest {
    // 회원가입 시
    private String username;
    private String email;
    private String password;
    private String role;

    // 회원 정보 수정 시
    private String newPassword;
}
