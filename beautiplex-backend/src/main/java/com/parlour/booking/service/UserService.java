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
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository, EmailService emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
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

}
