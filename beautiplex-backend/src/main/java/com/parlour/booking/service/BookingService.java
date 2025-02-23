package com.parlour.booking.service;

import com.parlour.booking.model.Booking;
import com.parlour.booking.model.BookingStatus;
import com.parlour.booking.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

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
       return bookingRepository.findByStatus("PENDING");
    //    return null;
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

	
}