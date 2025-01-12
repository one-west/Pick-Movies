package org.example.pickmovies.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.example.pickmovies.domain.User;
import org.example.pickmovies.dto.LoginRequest;
import org.example.pickmovies.dto.UserRequest;
import org.example.pickmovies.repository.UserRepository;
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
        user.update(request.getUsername(), bCryptPasswordEncoder.encode(request.getPassword()));
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

        boolean isPasswordMatch = bCryptPasswordEncoder.matches(request.getPassword(), findUser.getPassword());
        if (!isPasswordMatch) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        return findUser;
    }
}