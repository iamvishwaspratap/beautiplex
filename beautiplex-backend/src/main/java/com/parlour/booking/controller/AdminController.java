package com.parlour.booking.controller;

import com.parlour.booking.model.Booking;
import com.parlour.booking.model.Salon;
import com.parlour.booking.model.User;
import com.parlour.booking.service.BookingService;
import com.parlour.booking.service.SalonService;
import com.parlour.booking.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("api/users/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private SalonService salonService;

    @Autowired
    private BookingService bookingService;

    @GetMapping("/all-users")
    public ResponseEntity<?> findAllUsers() {
        List<User> users = userService.findAll();
        if (users.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No users found");
        }
        return ResponseEntity.ok(users);
    }

    @PostMapping("/add-user")
    public ResponseEntity<?> addUser(@RequestBody User user) {
        try {
            User savedUser = userService.registerUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to add user: " + e.getMessage());
        }
    }

    @DeleteMapping("/remove-user/{id}")
    public ResponseEntity<?> removeUser(@PathVariable Long id) {
        Optional<User> userOptional = Optional.of(userService.findUserById(id));   //errr method
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with the provided ID");
        }
        userService.deleteUser(id);
        return ResponseEntity.ok("User removed successfully");
    }

    @GetMapping("/all-salons")
    public ResponseEntity<?> findAllSalons() {
        List<Salon> salons = salonService.getAllSalons();    //service repo err
        if (salons.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No salons found");
        }
        return ResponseEntity.ok(salons);
    }

    @GetMapping("/all-bookings")
    public ResponseEntity<?> findAllBookings() {
        List<Booking> bookings = bookingService.findAll();
        if (bookings.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No bookings found");
        }
        return ResponseEntity.ok(bookings);
    }

    @GetMapping
    public RedirectView redirectToAdminDashboard() {
        return new RedirectView("/AdminDashboard");
    }
}