package com.parlour.booking.repository;

import com.parlour.booking.model.Booking;
import com.parlour.booking.model.BookingStatus;
import com.parlour.booking.model.Salon;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByCustomer_Id(Long userId);
    List<Booking> findByStatus(BookingStatus status);
    List<Booking> findAll();
    List<Booking> findBySalon_IdAndStatus(Long salonId, BookingStatus status);
    List<Booking> findBySalonInAndStatus(List<Salon> salons, BookingStatus status);
}