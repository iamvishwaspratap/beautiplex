package com.parlour.booking.controller;

import com.parlour.booking.model.ParlourService;
import com.parlour.booking.model.Salon;
import com.parlour.booking.repository.SalonRepository;
import com.parlour.booking.repository.SalonServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

import java.util.Optional;

@RestController
@RequestMapping("/api/salon-services")
public class SalonServiceController {

    @Autowired
    private SalonServiceRepository salonServiceRepository;

    @Autowired
    private SalonRepository salonRepository;

    @PostMapping("/add")
    public ResponseEntity<?> addSalonService(@RequestBody ParlourService salonService, @RequestParam Long salonId) {
        // Find the Salon by ID
        Optional<Salon> salonOptional = salonRepository.findById(salonService.getSalon().getId());
        if (salonOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Salon not found with the provided ID"));
        }

        // Get the Salon entity
        Salon salon = salonOptional.get();

        // Set the Salon to the ParlourService and save it
        salonService.setSalon(salon);
        ParlourService savedParlourService = salonServiceRepository.save(salonService);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedParlourService);
    }
}