package com.parlour.booking.service;

import org.springframework.stereotype.Component;

@Component
public class LocationService {
    private String address;

    public LocationService() {
        super();
    }

    public LocationService(String address) {
        super();
        this.address = address;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}