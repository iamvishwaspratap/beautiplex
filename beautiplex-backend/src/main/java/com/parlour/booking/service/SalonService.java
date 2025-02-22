package com.parlour.booking.service;

import com.parlour.booking.model.Salon;
import com.parlour.booking.repository.SalonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SalonService {
@Autowired
    private final SalonRepository salonRepository;

    public SalonService(SalonRepository salonRepository) {
        this.salonRepository = salonRepository;
    }

    public Salon createSalon(Salon salon) {
        return salonRepository.save(salon);
    }

    public List<Salon> getAllSalons() {
        return salonRepository.findAll();
    }
    public List<Salon> getSalonsByOwner(Long ownerId) {
        return salonRepository.findByOwnerId(ownerId);
    }

    public void deleteSalon(Long salonId) {
        salonRepository.deleteById(salonId);
    }

	
}