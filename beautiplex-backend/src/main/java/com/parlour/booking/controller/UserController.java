package com.parlour.booking.controller;

import com.parlour.booking.dto.LoginRequest;
import com.parlour.booking.model.User;
import com.parlour.booking.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user) {
        User savedUser = userService.registerUser(user);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest loginRequest) {
        User authenticatedUser = userService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword(), loginRequest.getRole());
        return ResponseEntity.ok(authenticatedUser);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestParam String email) {
        User user = userService.findUserByEmail(email);
        return ResponseEntity.ok(user);	
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUserProfile(@PathVariable Long id, @Valid @RequestBody User user) {
        User updatedUser = userService.updateUserProfile(id, user);
        return ResponseEntity.ok(updatedUser);
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePasswordByEmail(@RequestParam String email, @RequestBody String newPassword) {
        userService.changePasswordByEmail(email, newPassword);
        return ResponseEntity.ok("Password changed successfully");
    }
}