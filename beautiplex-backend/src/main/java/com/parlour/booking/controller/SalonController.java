package com.parlour.booking.controller;

import com.parlour.booking.model.Salon;
import com.parlour.booking.repository.SalonRepository;
import com.parlour.booking.service.SalonService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/salons")
@CrossOrigin(origins = "http://localhost:5173") 
public class SalonController {
    private final SalonService salonService;
    private final SalonRepository salonRepository;

    public SalonController(SalonService salonService, SalonRepository salonRepository) {
        this.salonService = salonService;
        this.salonRepository = salonRepository;
    }

    // Add a new salon with services
    @PostMapping("/add")
    public ResponseEntity<?> addSalon(@RequestBody Salon salon) {
        System.out.println("Received Salon: " + salon); 

        if (salon.getOwner() == null || salon.getOwner().getId() == null) { 
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Owner ID is required"));
        }

        try {
            Salon savedSalon = salonService.saveSalon(salon);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedSalon);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Failed to add salon: " + e.getMessage()));
        }
    }

    // Get all salons
    @GetMapping("/all")
    public List<Salon> getAllSalons() {
        return salonRepository.findAll();
    }

    // Get salon by ID
    @GetMapping("/owner/{userId}")
    public ResponseEntity<List<Salon>> getSalonsByOwner(@PathVariable Long userId) {
        List<Salon> salons = salonRepository.findByOwnerId(userId);
        return salons.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(salons);
    }


    // Get salons by owner email
    @GetMapping("/owner")
    public ResponseEntity<?> getSalonsByOwnerEmail(@RequestParam String email) {
        List<Salon> salons = salonRepository.findByOwnerEmail(email);
        return salons.isEmpty()
                ? ResponseEntity.status(HttpStatus.NO_CONTENT).body(Map.of("message", "No salons found for this owner"))
                : ResponseEntity.ok(salons);
    }
}