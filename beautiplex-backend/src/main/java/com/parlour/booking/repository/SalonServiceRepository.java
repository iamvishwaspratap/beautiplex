package com.parlour.booking.repository;

import com.parlour.booking.model.ParlourService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SalonServiceRepository extends JpaRepository<ParlourService, Long> {
}