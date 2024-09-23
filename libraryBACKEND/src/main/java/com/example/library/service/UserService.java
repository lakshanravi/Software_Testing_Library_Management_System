package com.example.library.service;

import com.example.library.Models.User;
import com.example.library.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;  // Autowire the PasswordEncoder

    // Save user with hashed password
    public User saveUser(User user) {
        // Check if the username already exists
        Optional<User> existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser.isPresent()) {
            // Username already exists, handle the case appropriately
            throw new IllegalArgumentException("Username already exists. Please choose another username.");
        }

        // Hash the password before saving the user
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // Authenticate user by matching the hashed password
    public Optional<User> authenticateUser(String username, String password) {
        Optional<User> userOpt = findByUsername(username);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // Check if the password matches the hashed password
            if (passwordEncoder.matches(password, user.getPassword())) {
                return Optional.of(user); // Return the user if authenticated
            }
        }
        return Optional.empty(); // Return empty if authentication fails
    }
}
