package com.parlour.booking.service;

import com.parlour.booking.model.Salon;
import com.parlour.booking.repository.SalonRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SalonService {

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

    public void deleteSalon(Long salonId) {
        salonRepository.deleteById(salonId);
    }

	
}