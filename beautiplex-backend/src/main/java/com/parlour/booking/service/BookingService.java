package com.parlour.booking.service;

import com.parlour.booking.model.Booking;
import com.parlour.booking.model.User;
import com.parlour.booking.repository.BookingRepository;
import com.parlour.booking.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;

    public BookingService(BookingRepository bookingRepository, UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
    }
    public List<Booking> findAll() {
        return bookingRepository.findAll();
    }
    @Transactional
    public Booking createBooking(Booking booking) {
        User user = userRepository.findByEmail(booking.getUser().getEmail())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        booking.setUser(user);
        return bookingRepository.save(booking);
    }

    public List<Booking> getBookingsByUserId(Long userId) {
        return bookingRepository.findByUser_Id(userId);
    }

    @Transactional
    public void cancelBooking(Long bookingId) {
        bookingRepository.deleteById(bookingId);
    }
}