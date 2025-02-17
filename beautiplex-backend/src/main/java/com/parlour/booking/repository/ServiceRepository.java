package com.parlour.booking.repository;

import com.parlour.booking.model.ParlourService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<ParlourService, Long> {
    List<ParlourService> findByAddressContaining(String address);
}