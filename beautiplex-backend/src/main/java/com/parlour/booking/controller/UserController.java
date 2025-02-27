package com.parlour.booking.controller;

import com.parlour.booking.Response.CustomResponse;
import com.parlour.booking.model.PasswordResetToken;
import com.parlour.booking.model.User;
import com.parlour.booking.repository.PasswordResetTokenRepository;
import com.parlour.booking.repository.UserRepository;
import com.parlour.booking.service.EmailService;
import com.parlour.booking.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    // ✅ Correct Constructor-based Dependency Injection
    public UserController(UserService userService,
                          PasswordResetTokenRepository passwordResetTokenRepository,
                          UserRepository userRepository,
                          EmailService emailService) {
        this.userService = userService;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    @PostMapping("/register")
    public ResponseEntity<CustomResponse<User>> registerUser(@Valid @RequestBody User user) {
        try {
            User newUser = userService.registerUser(user);
            return new ResponseEntity<>(new CustomResponse<>(newUser, "User created"), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new CustomResponse<>(null, "Failed to create new user"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody User user) {
        try {
            User authenticatedUser = userService.authenticateUser(user.getEmail(), user.getPassword(), user.getRole());
            return ResponseEntity.ok(authenticatedUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getUserDetails(@RequestParam("id") Long id) {
        try {
            User user = userService.findUserById(id);
            return user != null ? ResponseEntity.ok(user) : ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateUserDetails(@Valid @RequestBody User user) {
        try {
            User updatedUser = userService.updateUserDetails(user);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.findAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            boolean isDeleted = userService.deleteUser(id);
            return isDeleted ? ResponseEntity.ok("User deleted successfully") :
                    ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestParam String email, @RequestParam String oldPassword, @RequestParam String newPassword) {
        try {
            userService.changePassword(email, oldPassword, newPassword);
            return ResponseEntity.ok("Password changed successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestParam String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            return ResponseEntity.badRequest().body("User with this email does not exist.");
        }

        // Generate reset token (valid for 15 minutes)
        String token = UUID.randomUUID().toString();
        Date expiryDate = new Date(System.currentTimeMillis() + (15 * 60 * 1000));

        PasswordResetToken resetToken = new PasswordResetToken(email, token, expiryDate);
        passwordResetTokenRepository.save(resetToken);

        // Send email with reset link
        String resetLink = "http://localhost:3000/reset-password?token=" + token;
        emailService.sendEmail(email, "Password Reset Request",
                "Click the link to reset your password: " + resetLink);

        return ResponseEntity.ok("Password reset link sent to your email.");
    }


    @PutMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        Optional<PasswordResetToken> resetTokenOpt = passwordResetTokenRepository.findByToken(token);

        // Check if token exists and is valid
        if (resetTokenOpt.isEmpty() || resetTokenOpt.get().getExpiryDate().before(new Date())) {
            return ResponseEntity.badRequest().body("Invalid or expired token.");
        }

        PasswordResetToken resetToken = resetTokenOpt.get(); // Extracting from Optional

        // Find user by email
        Optional<User> userOpt = userRepository.findByEmail(resetToken.getEmail());

        if (userOpt.isPresent()) {
            User existingUser = userOpt.get();
            existingUser.setPassword(newPassword); // Ensure password is hashed
            userRepository.save(existingUser);

            // Delete used token (optional)
            passwordResetTokenRepository.delete(resetToken);

            return ResponseEntity.ok("Password reset successfully.");
        }

        return ResponseEntity.badRequest().body("User not found.");
    }



    @GetMapping("/all")
    public ResponseEntity<List<User>> findAll() {
        return ResponseEntity.ok(userService.findAll());
    }
}
