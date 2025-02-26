package com.parlour.booking.controller;

import com.parlour.booking.dto.BookingRequest;
import com.parlour.booking.model.*;
import com.parlour.booking.repository.ServiceRepository;
import com.parlour.booking.repository.SalonRepository;
import com.parlour.booking.repository.UserRepository;
import com.parlour.booking.service.BookingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    private final BookingService bookingService;
    private final UserRepository userRepository;
    private final SalonRepository salonRepository;
    private final ServiceRepository serviceRepository;

    public BookingController(BookingService bookingService, UserRepository userRepository,
                             SalonRepository salonRepository, ServiceRepository serviceRepository) {
        this.bookingService = bookingService;
        this.userRepository = userRepository;
        this.salonRepository = salonRepository;
        this.serviceRepository = serviceRepository;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createBooking(@RequestBody BookingRequest request) {
        try {
            Optional<User> customerOpt = userRepository.findById(request.getCustomerId());
            if (customerOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Customer not found.");
            }

            Optional<Salon> salonOpt = salonRepository.findById(request.getSalonId());
            if (salonOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Salon not found.");
            }

            List<ServiceEntity> selectedServices = serviceRepository.findAllById(request.getServiceIds());
            if (selectedServices.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No valid services selected.");
            }

            Booking booking = new Booking();
            booking.setCustomer(customerOpt.get());
            booking.setSalon(salonOpt.get());
            booking.setServices(selectedServices);
            booking.setStatus(BookingStatus.PENDING); // Set booking status to PENDING

            Booking newBooking = bookingService.createBooking(booking);
            return ResponseEntity.status(HttpStatus.CREATED).body("Booking created successfully with ID: " + newBooking.getId());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating booking: " + e.getMessage());
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Booking>> getBookingsByUserId(@PathVariable("userId") Long userId) {
        List<Booking> bookings = bookingService.getBookingsByUserId(userId);
        return ResponseEntity.ok(bookings);
    }

    @PostMapping("/{bookingId}/approve")
    public ResponseEntity<?> approveBooking(@PathVariable Long bookingId) {
        try {
            Booking booking = bookingService.getBookingById(bookingId);
            if (booking == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking not found.");
            }
            booking.setStatus(BookingStatus.APPROVED);
            bookingService.updateBooking(booking);
            return ResponseEntity.ok("Booking approved.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error approving booking: " + e.getMessage());
        }
    }

    @PostMapping("/{bookingId}/deny")
    public ResponseEntity<?> denyBooking(@PathVariable Long bookingId) {
        try {
            Booking booking = bookingService.getBookingById(bookingId);
            if (booking == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking not found.");
            }
            booking.setStatus(BookingStatus.DENIED);
            bookingService.updateBooking(booking);
            return ResponseEntity.ok("Booking denied.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error denying booking: " + e.getMessage());
        }
    }

    @GetMapping("/pending/owner/{ownerId}")
    public ResponseEntity<List<Booking>> getPendingBookingsByOwnerId(@PathVariable("ownerId") Long ownerId) {
        List<Booking> bookings = bookingService.getPendingBookingsByOwnerId(ownerId);
        return ResponseEntity.ok(bookings);
    }
}