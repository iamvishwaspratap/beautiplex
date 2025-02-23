//package com.parlour.booking.model;
//
//import jakarta.persistence.*;
//import jakarta.validation.constraints.NotEmpty;
//
//@Entity
//@Table(name = "services")
//public class ServiceEntity {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @NotEmpty(message = "Service name is required")
//    private String name;
//
//    @NotEmpty(message = "Price is required")
//    private String price;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "salon_id", nullable = false)
//    private Salon salon;
//
//    // Getters and Setters
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public String getPrice() {
//        return price;
//    }
//
//    public void setPrice(String price) {
//        this.price = price;
//    }
//
//    public Salon getSalon() {
//        return salon;
//    }
//
//    public void setSalon(Salon salon) {
//        this.salon = salon;
//    }
//}
package com.parlour.booking.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "services2")
public class ServiceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "Service name is required")
    private String name;

    @NotEmpty(message = "Price is required")
    private String price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "salon_id", nullable = false)
    @JsonBackReference
    private Salon salon;

//    @ManyToMany(mappedBy = "services")
//    private List<Booking> bookings = new ArrayList<>();

    public ServiceEntity() {}

    // Getters and Setters

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

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public Salon getSalon() {
        return salon;
    }

    public void setSalon(Salon salon) {
        this.salon = salon;
    }

//    public List<Booking> getBookings() {
//        return bookings;
//    }

//    public void setBookings(List<Booking> bookings) {
//        this.bookings = bookings;
//    }
}
