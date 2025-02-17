package com.parlour.booking.controller;

import com.parlour.booking.model.ParlourService;
import com.parlour.booking.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "http://localhost:5173")
public class ServiceController {

    @Autowired
    private ServiceRepository serviceRepository;

    @GetMapping("/search")
    public List<ParlourService> getServicesByLocation(@RequestParam String locationName) {
        return serviceRepository.findByAddressContaining(locationName);
    }

    @PostMapping
    public ParlourService createService(@RequestBody ParlourService service) {
        return serviceRepository.save(service);
    }

    @GetMapping
    public List<ParlourService> getAllServices() {
        return serviceRepository.findAll();
    }

    @GetMapping("/{id}")
    public ParlourService getServiceById(@PathVariable Long id) {
        return serviceRepository.findById(id).orElseThrow(() -> new RuntimeException("Service not found!"));
    }

    @PutMapping("/{id}")
    public ParlourService updateService(@PathVariable Long id, @RequestBody ParlourService updatedService) {
        ParlourService service = serviceRepository.findById(id).orElseThrow(() -> new RuntimeException("Service not found!"));
        service.setName(updatedService.getName());
        service.setAddress(updatedService.getAddress());
        service.setCategory(updatedService.getCategory());
        service.setPrice(updatedService.getPrice());
        return serviceRepository.save(service);
    }

    @DeleteMapping("/{id}")
    public void deleteService(@PathVariable Long id) {
        serviceRepository.deleteById(id);
    }
}