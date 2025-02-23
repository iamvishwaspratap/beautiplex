package com.parlour.booking.service;

import com.parlour.booking.model.Salon;
import com.parlour.booking.model.ServiceEntity;
import com.parlour.booking.repository.SalonRepository;
import com.parlour.booking.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SalonService {

    private final SalonRepository salonRepository;
    @Autowired
    private ServiceRepository serviceRepository;

    public List<ServiceEntity> getServicesBySalonId(Long salonId) {
        return serviceRepository.findBySalonId(salonId);
    }

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