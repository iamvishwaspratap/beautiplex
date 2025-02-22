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
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/salons")
@CrossOrigin(origins = "http://localhost:5173")
public class SalonController {

    @Autowired
    private SalonRepository salonRepository;
    @Autowired
    private SalonService salonService;
    @Autowired
    private ServiceRepository serviceRepository;
    @Autowired
    private UserRepository userRepository;

//    @PostMapping("/create")
//    public ResponseEntity<?> createSalon(@Valid @RequestBody Salon salonRequest) {
//    	System.out.println("Salon created functon hit***********************");
//
//        try {
//            // Find the owner by email
//            User owner = userRepository.findByEmail(salonRequest.getOwner().getEmail())
//                    .orElseThrow(() -> new RuntimeException("Owner not found"));
//
//            // Set the owner for the salon
//            salonRequest.setOwner(owner);
//
//            // Initialize the services list if it's null
//            if (salonRequest.getServices() == null) {
//                salonRequest.setServices(new ArrayList<>());
//            }
//
//            // Save the salon and its services
//            for (ServiceEntity service : salonRequest.getServices()) {
//                service.setSalon(salonRequest);
//            }
//            Salon newSalon = salonRepository.save(salonRequest);
//            System.out.println(newSalon.getId());
//        	System.out.println(newSalon.getName());
//        	System.out.println(newSalon.getLocation());
//        	System.out.println(newSalon.getOwner().getEmail());
//        	System.out.println(newSalon.getServices());
//            return ResponseEntity.status(HttpStatus.CREATED).body(newSalon);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
//        }
//    }
@PostMapping("/create")
public ResponseEntity<?> createSalon(@Valid @RequestBody Salon salonRequest) {
    try {
        System.out.println("Salon creation function hit***********************");

        // Log the received request
        System.out.println("Received Salon Request: " + salonRequest);

        if (salonRequest == null) {
            throw new RuntimeException("Salon request body is NULL!");
        }

        if (salonRequest.getOwner() == null) {
            throw new RuntimeException("Owner data is missing in request!");
        }

        System.out.println("Owner Email from Request: " + salonRequest.getOwner().getEmail());

        // Fetch owner from DB
        User owner = userRepository.findByEmail(salonRequest.getOwner().getEmail())
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        System.out.println("Owner found: " + owner.getName());

        // Assign owner to the salon
        salonRequest.setOwner(owner);
//        if (salonRequest.getServices() == null) {
//            salonRequest.setServices(new ArrayList<>());
//        }
//        for (ServiceEntity service : salonRequest.getServices()) {
//            service.setSalon(salonRequest);
//        }

        Salon newSalon = salonRepository.save(salonRequest);
        System.out.println("Salon Created Successfully: " + newSalon.getName());

        SalonResponseDTO response = new SalonResponseDTO(newSalon);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    } catch (Exception e) {
        System.err.println("Error while creating salon: " + e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }
}
    @GetMapping("/owner")
    public ResponseEntity<List<Salon>> getSalonsByOwner(@RequestParam Long id) {
        List<Salon> salons = salonService.getSalonsByOwner(id);
        return ResponseEntity.ok(salons);
    }






}