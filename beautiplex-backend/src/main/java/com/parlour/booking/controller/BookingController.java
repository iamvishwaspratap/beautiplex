package com.parlour.booking.controller;

import com.parlour.booking.model.Booking;
import com.parlour.booking.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createBooking(@Valid @RequestBody Booking booking) {
        try {
            Booking newBooking = bookingService.createBooking(booking);
            return ResponseEntity.status(HttpStatus.CREATED).body("Booking created successfully with ID: " + newBooking.getId());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating booking: " + e.getMessage());
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Booking>> getBookingsByUserId(@PathVariable Long userId) {
        List<Booking> bookings = bookingService.getBookingsByUserId(userId);
        return ResponseEntity.ok(bookings);
    }

    @DeleteMapping("/{bookingId}")
    public ResponseEntity<?> cancelBooking(@PathVariable Long bookingId) {
        try {
            bookingService.cancelBooking(bookingId);
            return ResponseEntity.ok("Booking cancelled successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error cancelling booking: " + e.getMessage());
        }
    }

    @GetMapping("/pending")
    public ResponseEntity<List<Booking>> getPendingBookings() {
        List<Booking> bookings = bookingService.getPendingBookings();
        return ResponseEntity.ok(bookings);
    }

    @PutMapping("/approve/{bookingId}")
    public ResponseEntity<?> approveBooking(@PathVariable Long bookingId) {
        try {
            Booking booking = bookingService.approveBooking(bookingId);
            return ResponseEntity.ok("Booking approved successfully with ID: " + booking.getId());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error approving booking: " + e.getMessage());
        }
    }

    @PutMapping("/deny/{bookingId}")
    public ResponseEntity<?> denyBooking(@PathVariable Long bookingId) {
        try {
            Booking booking = bookingService.denyBooking(bookingId);
            return ResponseEntity.ok("Booking denied successfully with ID: " + booking.getId());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error denying booking: " + e.getMessage());
        }
    }
}