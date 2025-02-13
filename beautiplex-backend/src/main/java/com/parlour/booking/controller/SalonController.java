package com.parlour.booking.controller;

import com.parlour.booking.model.Salon;
import com.parlour.booking.service.SalonService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/salons")
@CrossOrigin(origins = "http://localhost:5173")
public class SalonController {

    private final SalonService salonService;

    public SalonController(SalonService salonService) {
        this.salonService = salonService;
    }

    @GetMapping("/search")
    public List<Salon> searchSalons() {
        return salonService.searchSalons();
    }

    @PostMapping
    public ResponseEntity<?> addSalon(@RequestBody Salon salon) {
        Salon newSalon = salonService.addSalon(salon);
        return ResponseEntity.ok(newSalon);
    }
}