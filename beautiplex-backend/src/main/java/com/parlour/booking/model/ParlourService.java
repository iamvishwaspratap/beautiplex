package com.parlour.booking.model;

import jakarta.persistence.*;

@Entity
@Table(name = "services")
public class ParlourService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String address;
    private String category;
    private double price;
    
    @ManyToOne
    @JoinColumn(name = "salon_id", nullable = false)
    private Salon salon;
    
    public ParlourService() {}

    public ParlourService(String name, String address, String category, double price,Salon salon) {
        this.name = name;
        this.address = address;
        this.category = category;
        this.price = price;
        this.salon = salon;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
    public Salon getSalon() {
        return salon;
    }

    public void setSalon(Salon salon) {
        this.salon = salon;
    }
}