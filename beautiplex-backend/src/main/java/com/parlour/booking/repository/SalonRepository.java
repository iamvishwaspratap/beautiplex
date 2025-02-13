package com.parlour.booking.repository;

import com.parlour.booking.model.Salon;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SalonRepository extends JpaRepository<Salon, Long> {
	List<Salon> findByOwnerId(Long ownerId);
}