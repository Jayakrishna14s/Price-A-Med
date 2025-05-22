package com.evernorth.profilesetup.service.database.entity;

import java.math.BigDecimal;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Pharmacy {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String location;
    private BigDecimal rating;
    private boolean homeDelivery;
    private BigDecimal lat;
    private BigDecimal longitude;

    public Long getId() {
        return id;
    }
    
    public String getName() {
        return name;
    }

    public String getLocation() {
        return location;
    }

    public BigDecimal getRating() {
        return rating;
    }

    public boolean getHomeDelivery() {
        return homeDelivery;
    }

    public BigDecimal getLat() {
        return lat;
    }

    public BigDecimal getLongitude() {
        return longitude;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setHomeDelivery(boolean homeDelivery) {
        this.homeDelivery = homeDelivery;
    }

    public void setLat(BigDecimal lat) {
        this.lat = lat;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setLongitude(BigDecimal longitude) {
        this.longitude = longitude;
    }

    public void setRating(BigDecimal rating) {
        this.rating = rating;
    }
}

