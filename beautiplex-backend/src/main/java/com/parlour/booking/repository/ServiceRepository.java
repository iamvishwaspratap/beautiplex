package com.parlour.booking.repository;


import com.parlour.booking.model.ServiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<ServiceEntity, Long> {
//    List<ServiceEntity> findByAddressContaining(String address);
@Query("SELECT s FROM ServiceEntity s WHERE s.salonId = :salonId") // Ensure correct JPQL query
List<ServiceEntity> findBySalonId(@Param("salonId") Long salonId);
//    List<ServiceEntity> findBySalonId(Long salonId);
}