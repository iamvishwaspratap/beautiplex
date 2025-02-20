package com.parlour.booking.controller;

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

@RestController
@RequestMapping("/api/salons")
@CrossOrigin(origins = "http://localhost:5173")
public class SalonController {

    @Autowired
    private SalonRepository salonRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/create")
    public ResponseEntity<?> createSalon(@Valid @RequestBody Salon salonRequest) {
        try {
            // Find the owner by email
            User owner = userRepository.findByEmail(salonRequest.getOwner().getEmail())
                    .orElseThrow(() -> new RuntimeException("Owner not found"));

            // Set the owner for the salon
            salonRequest.setOwner(owner);

            // Initialize the services list if it's null
            if (salonRequest.getServices() == null) {
                salonRequest.setServices(new ArrayList<>());
            }

            // Save the salon and its services
            for (ServiceEntity service : salonRequest.getServices()) {
                service.setSalon(salonRequest);
            }
            Salon newSalon = salonRepository.save(salonRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(newSalon);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}