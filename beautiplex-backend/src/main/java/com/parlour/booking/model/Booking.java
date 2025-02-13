package com.parlour.booking.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")

public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "salon_id", nullable = false)
    private Salon salon;

    @NotNull(message = "Booking time is required")
    @FutureOrPresent(message = "Booking time cannot be in the past")
    private LocalDateTime bookingTime;
    
    

	public Booking() {
		super();
	}

	public Booking(Long id, User user, Salon salon,
			@NotNull(message = "Booking time is required") @FutureOrPresent(message = "Booking time cannot be in the past") LocalDateTime bookingTime) {
		super();
		this.id = id;
		this.user = user;
		this.salon = salon;
		this.bookingTime = bookingTime;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Salon getSalon() {
		return salon;
	}

	public void setSalon(Salon salon) {
		this.salon = salon;
	}

	public LocalDateTime getBookingTime() {
		return bookingTime;
	}

	public void setBookingTime(LocalDateTime bookingTime) {
		this.bookingTime = bookingTime;
	}
    
    
}