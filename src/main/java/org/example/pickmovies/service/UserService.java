package org.example.pickmovies.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.example.pickmovies.domain.User;
import org.example.pickmovies.dto.LoginRequest;
import org.example.pickmovies.dto.UserRequest;
import org.example.pickmovies.repository.UserRepository;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public Long createUser(UserRequest request) {
        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(bCryptPasswordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();
        return userRepository.save(user).getId();
    }

    @Transactional
    public User updateUser(Long userId, UserRequest request) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (request.getPassword() == null) {
            user.update(request.getUsername());
            return user;
        } else {
            // 현재 비밀번호가 일치하는지 확인
            boolean isPasswordCorrect = verifyPassword(user, request.getPassword());
            if (!isPasswordCorrect) {
                throw new BadCredentialsException("The current password does not match");
            } else {
                // 새 비밀번호 변경
                user.update(request.getUsername(), bCryptPasswordEncoder.encode(request.getNewPassword()));
            }
        }

        return user;
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public User loginConfirm(LoginRequest request) {
        User findUser = findByEmail(request.getEmail());

        if (findUser == null) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        boolean isPasswordMatch = verifyPassword(findUser, request.getPassword());
        if (!isPasswordMatch) {
            throw new BadCredentialsException("Invalid email or password");
        }

        return findUser;
    }

    public User getCurrentUser() {
        // SecurityContextHolder에서 인증된 사용자 정보 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 인증된 사용자가 존재하는지 확인
        if (authentication == null
                || !(authentication.getPrincipal() instanceof UserDetails userDetails)) {
            throw new RuntimeException("인증된 사용자가 없습니다.");
        }

        // 인증된 사용자 정보에서 사용자 이름(또는 ID)을 가져오기
        String email = userDetails.getUsername();

        // 사용자 이름을 통해 사용자 정보 조회
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
    }

    private boolean verifyPassword(User findUser, String currentPassword) {
        return bCryptPasswordEncoder.matches(currentPassword, findUser.getPassword());
    }
}