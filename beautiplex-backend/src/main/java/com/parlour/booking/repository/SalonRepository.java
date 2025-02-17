package com.parlour.booking.repository;

import com.parlour.booking.model.Salon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SalonRepository extends JpaRepository<Salon, Long> {
    List<Salon> findByOwnerEmail(String email);
    List<Salon> findByOwnerId(Long id);
   
}
