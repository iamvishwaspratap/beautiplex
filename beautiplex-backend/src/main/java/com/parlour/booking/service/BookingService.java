package com.parlour.booking.service;

import com.parlour.booking.model.Booking;
import com.parlour.booking.model.BookingStatus;
import com.parlour.booking.model.Salon;
import com.parlour.booking.repository.BookingRepository;
import com.parlour.booking.repository.SalonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    @Autowired
    private SalonRepository salonRepository;

    public List<Booking> getPendingBookingsByOwnerId(Long ownerId) {
        List<Salon> salons = salonRepository.findByOwnerId(ownerId);
        return bookingRepository.findBySalonInAndStatus(salons, BookingStatus.PENDING);
    }

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public Booking createBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public List<Booking> getBookingsByUserId(Long userId) {
        return bookingRepository.findByCustomer_Id(userId);
    }

    public List<Booking> findAll() {
        return bookingRepository.findAll();
    }

    public void cancelBooking(Long bookingId) {
        bookingRepository.deleteById(bookingId);
    }

    public List<Booking> getPendingBookings() {
        return bookingRepository.findByStatus(BookingStatus.PENDING);
    }

    public List<Booking> getPendingBookingsBySalonId(Long salonId) {
        return bookingRepository.findBySalon_IdAndStatus(salonId, BookingStatus.PENDING);
    }

    public Booking approveBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId).orElseThrow();
        booking.setStatus(BookingStatus.APPROVED);
        return bookingRepository.save(booking);
    }

    public Booking denyBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId).orElseThrow();
        booking.setStatus(BookingStatus.DENIED);
        return bookingRepository.save(booking);
    }

    public Booking getBookingById(Long bookingId) {
        return bookingRepository.findById(bookingId).orElse(null);
    }

    public Booking updateBooking(Booking booking) {
        return bookingRepository.save(booking);
    }
}