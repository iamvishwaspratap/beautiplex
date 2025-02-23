package com.parlour.booking.repository;


import com.parlour.booking.model.ServiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<ServiceEntity, Long> {
//    List<ServiceEntity> findByAddressContaining(String address);
    List<ServiceEntity> findBySalonId(Long salonId);

}