package com.parlour.booking.controller;

import com.parlour.booking.model.Salon;
import com.parlour.booking.model.User;
import com.parlour.booking.service.SalonService;
import com.parlour.booking.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/salons")
@CrossOrigin(origins = "http://localhost:5173")
public class SalonController {

    private final SalonService salonService;
    private final UserService userService;

    public SalonController(SalonService salonService, UserService userService) {
        this.salonService = salonService;
        this.userService = userService;
    }

    @GetMapping("/search")
    public List<Salon> searchSalons() {
        return salonService.searchSalons();
    }
    @GetMapping("/owner/{ownerId}")
    public List<Salon> findSalonsByOwnerId(@PathVariable Long ownerId) {
        return salonService.findSalonsByOwnerId(ownerId);
    }

    @PostMapping
    public ResponseEntity<?> addSalon(@RequestBody Salon salon) {
        if (salon.getOwner() == null || salon.getOwner().getId() == null) {
            return ResponseEntity.badRequest().body("Owner ID must not be null");
        }

        User owner = userService.findUserById(salon.getOwner().getId());
        if (owner == null) {
            return ResponseEntity.badRequest().body("Owner not found");
        }

        salon.setOwner(owner);
        Salon newSalon = salonService.addSalon(salon);
        return ResponseEntity.ok(newSalon);
    }

//    @PostMapping
//    public ResponseEntity<?> addSalon(@RequestBody Salon salon) {
//        User owner = userService.findUserById(salon.getOwner().getId());
//        salon.setOwner(owner);
//        Salon newSalon = salonService.addSalon(salon);
//        return ResponseEntity.ok(newSalon);
//    }
}