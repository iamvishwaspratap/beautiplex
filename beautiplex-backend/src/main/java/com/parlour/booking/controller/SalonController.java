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
import java.util.ArrayList;
import java.util.List;

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
    @GetMapping
    public ResponseEntity<List<Salon>> getAllSalons() {
        List<Salon> salons = salonService.getAllSalons();
        return ResponseEntity.ok(salons);
    }


    @GetMapping("/owner")
    public ResponseEntity<?> getSalonsByOwner(@RequestParam Long id) {
        try {
            User owner = userRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Owner not found"));
            List<Salon> salons = salonRepository.findByOwnerId(owner.getId());
            return ResponseEntity.ok(salons);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

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
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateSalon(@PathVariable Long id, @RequestBody Salon updatedSalon) {
        return salonRepository.findById(id).map(salon -> {
            salon.setName(updatedSalon.getName());
            salon.setLocation(updatedSalon.getLocation());
            salonRepository.save(salon);
            return ResponseEntity.ok("Salon updated successfully");
        }).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("Salon not found"));
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSalon(@PathVariable Long id) {
        try {
            Salon salon = salonRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Salon not found"));

            salonRepository.delete(salon);
            return ResponseEntity.ok("Salon deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

}
