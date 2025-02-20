package com.parlour.booking.repository;

import com.parlour.booking.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUser_Id(Long userId);
    List<Booking> findByStatus(String status);
    List<Booking> findAll();
}