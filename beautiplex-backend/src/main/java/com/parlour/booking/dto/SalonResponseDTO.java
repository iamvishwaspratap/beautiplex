package com.parlour.booking.dto;
import com.parlour.booking.model.Salon;
public class SalonResponseDTO {
    private Long id;
    private String name;
    private String location;
    private String ownerName;
    private String ownerEmail;

    public SalonResponseDTO(Salon salon) {
        this.id = salon.getId();
        this.name = salon.getName();
        this.location = salon.getLocation();
        this.ownerName = salon.getOwner().getName();
        this.ownerEmail = salon.getOwner().getEmail();
    }

    // Getters
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getLocation() { return location; }
    public String getOwnerName() { return ownerName; }
    public String getOwnerEmail() { return ownerEmail; }
}
