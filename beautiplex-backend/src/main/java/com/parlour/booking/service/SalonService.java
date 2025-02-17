package com.parlour.booking.service;

import com.parlour.booking.model.Owner;
import com.parlour.booking.model.Salon;
import com.parlour.booking.repository.OwnerRepository;
import com.parlour.booking.repository.SalonRepository;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class SalonService {
    private final SalonRepository salonRepository;
    private final OwnerRepository ownerRepository;

    public SalonService(SalonRepository salonRepository, OwnerRepository ownerRepository) {
        this.salonRepository = salonRepository;
        this.ownerRepository = ownerRepository;
    }

    public Salon saveSalon(Salon salon) {
        Owner owner = ownerRepository.findById(salon.getOwner().getId())
                .orElseThrow(() -> new RuntimeException("Owner ID not found"));

        salon.setOwner(owner);
        return salonRepository.save(salon);
    }
    public List<Salon> findAll() { // Method added
        return salonRepository.findAll();
    }
    public List<Salon> findByOwnerEmail(String email) {
        return salonRepository.findByOwnerEmail(email);
    }
}