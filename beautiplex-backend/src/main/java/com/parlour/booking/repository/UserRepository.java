package com.parlour.booking.repository;

import com.parlour.booking.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(@Param("email") String email);
    Optional<User> findById(Long id);

    @Query("SELECT u FROM User u WHERE u.email = :email")
    User findUserByEmail(@Param ("email")String email);


    Optional<User> findByResetToken(String resetToken);
}