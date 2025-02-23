package com.parlour.booking.controller;

import com.parlour.booking.model.ServiceEntity;
import com.parlour.booking.repository.ServiceRepository;
import com.parlour.booking.service.SalonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "http://localhost:5173")
public class ServiceController {

    @Autowired
    private ServiceRepository serviceRepository;
    @Autowired
    private SalonService salonService;

//    @GetMapping("/search")
//    public List<ServiceEntity> getServicesByLocation(@RequestParam String locationName) {
//        return serviceRepository.findByAddressContaining(locationName);
//    }

    @PostMapping
    public ServiceEntity createService(@RequestBody ServiceEntity service) {
        return serviceRepository.save(service);
    }

    @GetMapping
    public List<ServiceEntity> getAllServices() {
        return serviceRepository.findAll();
    }

    @GetMapping("/{id}")
    public ServiceEntity getServiceById(@PathVariable Long id) {
        return serviceRepository.findById(id).orElseThrow(() -> new RuntimeException("Service not found!"));
    }

    @PutMapping("/{id}")
    public ServiceEntity updateService(@PathVariable Long id, @RequestBody ServiceEntity updatedService) {
        ServiceEntity service = serviceRepository.findById(id).orElseThrow(() -> new RuntimeException("Service not found!"));
        service.setName(updatedService.getName());
//        service.setAddress(updatedService.getAddress());
//        service.setCategory(updatedService.getCategory());
        service.setPrice(updatedService.getPrice());
        return serviceRepository.save(service);
    }

    @DeleteMapping("/{id}")
    public void deleteService(@PathVariable Long id) {
        serviceRepository.deleteById(id);
    }
    @GetMapping("/salon/{salonId}")
    public List<ServiceEntity> getServicesBySalonId(@PathVariable Long salonId) {
        return salonService.getServicesBySalonId(salonId);
    }
}