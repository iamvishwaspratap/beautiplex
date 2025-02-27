package com.parlour.booking.service;

import com.parlour.booking.model.PasswordResetToken;
import com.parlour.booking.model.User;
import com.parlour.booking.repository.UserRepository;
import com.parlour.booking.repository.PasswordResetTokenRepository; // ✅ Import the repository
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository; // ✅ Inject repository

    private final EmailService emailService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, EmailService emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
    }
    @Transactional
    public User registerUser(User user) {
        System.out.println("user register started---------------------");
        System.out.println(userRepository);
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists!");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
    @Transactional
    public User authenticateUser(String email, String password, String role) {
        return userRepository.findByEmail(email)
                .filter(user -> passwordEncoder.matches(password, user.getPassword()) && role.equals(user.getRole()))
                .orElseThrow(() -> new RuntimeException("Invalid email, password or role"));
    }


    public User findUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Transactional
    public void resetPassword(String token, String newPassword) {
        Optional<PasswordResetToken> resetTokenOpt = passwordResetTokenRepository.findByToken(token); // ✅ Now this works

        if (resetTokenOpt.isEmpty()) {
            throw new RuntimeException("Invalid token.");
        }

        PasswordResetToken resetToken = resetTokenOpt.get();

        // Check if token is expired
        if (resetToken.getExpiryDate().before(new Date())) {
            throw new RuntimeException("Token has expired.");
        }

        // Find the user by email
        Optional<User> userOpt = userRepository.findByEmail(resetToken.getEmail());

        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found.");
        }

        User user = userOpt.get();

        // 🔹 Hash new password before saving
        user.setPassword(passwordEncoder.encode(newPassword));

        userRepository.save(user);

        // ✅ Delete the token after password reset
        passwordResetTokenRepository.delete(resetToken);
    }
    @Transactional
    public void changePassword(String email, String oldPassword, String newPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check if the old password matches
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new RuntimeException("Old password is incorrect");
        }

        // Hash the new password before saving
        user.setPassword(passwordEncoder.encode(newPassword));

        userRepository.save(user);
    }

    @Transactional
    public User updateUserDetails(User user) {
        User existingUser = userRepository.findById(user.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        existingUser.setName(user.getName());
        existingUser.setEmail(user.getEmail());
        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
        }

        return userRepository.save(existingUser);
    }
    public boolean deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            return false; // User not found
        }

        userRepository.deleteById(id);
        return true; // User deleted successfully
    }


}
