package com.example.taskmanager.controller;

import org.springframework.web.bind.annotation.*;
import com.example.taskmanager.repository.UserRepository;
import com.example.taskmanager.model.User;

@RestController
@RequestMapping("/api/auth")   // 👈 ADD THIS
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/signup")
    public String signup(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return "User already exists";
        }

        userRepository.save(user);
        return "Signup successful";
    }

    // LOGIN
    @PostMapping("/login")
    public String login(@RequestBody User user) {

        User existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser == null) {
            return "User not found";
        }

        if (!existingUser.getPassword().equals(user.getPassword())) {
            return "Invalid password";
        }

        return "Login successful";
    }
}