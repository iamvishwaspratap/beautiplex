package com.parlour.booking.controller;

import com.parlour.booking.model.ParlourService;
import com.parlour.booking.repository.ServiceRepository;
import com.parlour.booking.service.GeocodingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "http://localhost:5173")
public class ServiceController {

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private GeocodingService geocodingService;

    @GetMapping("/search")
    public List<ParlourService> getServicesByLocation(@RequestParam String locationName, @RequestParam(defaultValue = "10") double radius) {
        double[] latLong = geocodingService.getLatLongFromAddress(locationName);
        if (latLong == null) {
            throw new RuntimeException("Location not found!");
        }

        double latitude = latLong[0];
        double longitude = latLong[1];

        return serviceRepository.findNearbyServices(latitude, longitude, radius);
    }
}