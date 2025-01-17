package org.example.pickmovies.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.pickmovies.domain.User;

@Getter
@NoArgsConstructor
public class UserResponse {

    private Long id;            // 사용자 고유 ID
    private String username;    // 사용자 이름
    private String email;       // 이메일
    private String role;        // 사용자 역할 (USER, ADMIN 등)

    public UserResponse(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.role = user.getRole();
    }
}
