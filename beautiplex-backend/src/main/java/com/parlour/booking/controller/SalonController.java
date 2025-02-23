package com.parlour.booking.controller;

import com.parlour.booking.dto.SalonResponseDTO;
import com.parlour.booking.model.Salon;
import com.parlour.booking.model.ServiceEntity;
import com.parlour.booking.model.User;
import com.parlour.booking.repository.SalonRepository;
import com.parlour.booking.repository.ServiceRepository;
import com.parlour.booking.repository.UserRepository;
import com.parlour.booking.service.SalonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("/api/salons")
@CrossOrigin(origins = "http://localhost:5173")
public class SalonController {

    @Autowired
    private SalonRepository salonRepository;
    @Autowired
    private ServiceRepository serviceRepository;
    @Autowired
    private UserRepository userRepository;

    private final SalonService salonService;

    public SalonController(SalonService salonService) {
        this.salonService = salonService;
        System.out.println("🔥 SalonController loaded successfully! 🔥");
    }

    /**
     * Get all salons with owner details
     */
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllSalons() {
        List<Salon> salons = salonService.getAllSalons();
        List<Map<String, Object>> response = new ArrayList<>();

        for (Salon salon : salons) {
            Map<String, Object> salonData = new HashMap<>();
            salonData.put("id", salon.getId());
            salonData.put("name", salon.getName());
            salonData.put("location", salon.getLocation());

            // Include owner details if available
            if (salon.getOwner() != null) {
                Map<String, Object> ownerData = new HashMap<>();
                ownerData.put("id", salon.getOwner().getId());
                ownerData.put("name", salon.getOwner().getName());
                ownerData.put("email", salon.getOwner().getEmail());
                salonData.put("owner", ownerData);
            } else {
                salonData.put("owner", "N/A"); // Handle missing owner
            }

            response.add(salonData);
        }
        return ResponseEntity.ok(response);
    }

    /**
     * Get salons by owner ID
     */
    @GetMapping("/owner")
    public ResponseEntity<?> getSalonsByOwner(@RequestParam Long id) {
        try {
            User owner = userRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Owner not found"));
            List<Salon> salons = salonRepository.findByOwnerId(owner.getId());

            return ResponseEntity.ok(salons);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    /**
     * Create a new salon
     */
    @PostMapping("/create")
    public ResponseEntity<?> createSalon(@Valid @RequestBody Salon salonRequest) {
        try {
            if (salonRequest == null || salonRequest.getOwner() == null) {
                throw new RuntimeException("Salon request body or owner is missing!");
            }

            User owner = userRepository.findByEmail(salonRequest.getOwner().getEmail())
                    .orElseThrow(() -> new RuntimeException("Owner not found"));

            salonRequest.setOwner(owner);

            if (salonRequest.getServices() == null) {
                salonRequest.setServices(new ArrayList<>());
            }

            for (ServiceEntity service : salonRequest.getServices()) {
                service.setSalon(salonRequest);
            }

            Salon newSalon = salonRepository.save(salonRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(new SalonResponseDTO(newSalon));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    /**
     * Update an existing salon
     */
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateSalon(@PathVariable Long id, @RequestBody Salon updatedSalon) {
        return salonRepository.findById(id).map(salon -> {
            salon.setName(updatedSalon.getName());
            salon.setLocation(updatedSalon.getLocation());
            salonRepository.save(salon);
            return ResponseEntity.ok("Salon updated successfully");
        }).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("Salon not found"));
    }

    /**
     * Delete a salon (Only Admin or Owner can delete)
     */
    @DeleteMapping("/delete/{salonId}")
    public ResponseEntity<?> deleteSalon(@PathVariable Long salonId, @RequestParam Long userId) {
        try {
            Salon salon = salonRepository.findById(salonId)
                    .orElseThrow(() -> new RuntimeException("Salon not found"));

            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Check if the user is either the admin or the salon owner
            if (user.getRole().equalsIgnoreCase("ADMIN") ||
                    (salon.getOwner() != null && salon.getOwner().getId().equals(userId))) {
                salonRepository.delete(salon);
                return ResponseEntity.ok("Salon deleted successfully");
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("Access denied! You don't have permission to delete this salon.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }
}
