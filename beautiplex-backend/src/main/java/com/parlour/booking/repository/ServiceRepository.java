package com.parlour.booking.repository;

import com.parlour.booking.model.ParlourService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ServiceRepository extends JpaRepository<ParlourService, Long> {

    @Query("SELECT s FROM ParlourService s WHERE " +
           "(6371 * acos(cos(radians(:latitude)) * cos(radians(s.latitude)) * " +
           "cos(radians(s.longitude) - radians(:longitude)) + " +
           "sin(radians(:latitude)) * sin(radians(s.latitude)))) < :radius")
    List<ParlourService> findNearbyServices(@Param("latitude") double latitude, 
                                            @Param("longitude") double longitude, 
                                            @Param("radius") double radius);
}