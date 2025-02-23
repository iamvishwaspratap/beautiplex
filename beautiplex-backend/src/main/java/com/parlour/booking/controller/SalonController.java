package com.parlour.booking.controller;

import com.parlour.booking.dto.SalonResponseDTO;
import com.parlour.booking.model.Salon;
import com.parlour.booking.model.ServiceEntity;
import com.parlour.booking.model.User;
import com.parlour.booking.repository.SalonRepository;
import com.parlour.booking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/salons")
@CrossOrigin(origins = "http://localhost:5173")
public class SalonController {

    @Autowired
    private SalonRepository salonRepository;

    @Autowired
    private UserRepository userRepository;
    public SalonController() {
        System.out.println("🔥 SalonController loaded successfully! 🔥");
    }
    /**
     * ✅ Fetch salons by owner ID (Frontend should call `/api/salons/owner?ownerId=4`)
     */
//    @GetMapping
//    public String getAllSalons() {
//        return "Salon list"; // Test if this returns a response
//    }
    @GetMapping("/owner")
    public ResponseEntity<?> getSalonsByOwner(@RequestParam Long id) {
        try {
            // Fetch owner by ID
            User owner = userRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Owner not found"));

            // Fetch salons with services
            List<Salon> salons = salonRepository.findByOwnerId(owner.getId());

            return ResponseEntity.ok(salons);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    /**
     * ✅ Create a new salon
     */
    @PostMapping("/create")
    public ResponseEntity<?> createSalon(@Valid @RequestBody Salon salonRequest) {
        try {
            System.out.println("Salon creation function hit***********************");

            if (salonRequest == null || salonRequest.getOwner() == null) {
                throw new RuntimeException("Salon request body or owner is missing!");
            }

            System.out.println("Owner Email from Request: " + salonRequest.getOwner().getEmail());

            // Fetch owner from DB
            User owner = userRepository.findByEmail(salonRequest.getOwner().getEmail())
                    .orElseThrow(() -> new RuntimeException("Owner not found"));

            System.out.println("Owner found: " + owner.getName());

            // Assign owner to the salon
            salonRequest.setOwner(owner);
            if (salonRequest.getServices() == null) {
                salonRequest.setServices(new ArrayList<>());
            }
            for (ServiceEntity service : salonRequest.getServices()) {
                service.setSalon(salonRequest);
            }

            Salon newSalon = salonRepository.save(salonRequest);
            System.out.println("Salon Created Successfully: " + newSalon.getName());

            return ResponseEntity.status(HttpStatus.CREATED).body(new SalonResponseDTO(newSalon));
        } catch (Exception e) {
            System.err.println("Error while creating salon: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
