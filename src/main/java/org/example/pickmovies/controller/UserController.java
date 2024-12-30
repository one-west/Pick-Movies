package org.example.pickmovies.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {

    @PostMapping("/users/register")
    public void registerUser() {
        // Implement user registration logic
    }

    @PostMapping("/users/login")
    public void loginUser() {
        // Implement user login logic
    }

}
