package com.evernorth.profilesetup.service.database.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class InsurancePlan {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String planName;
    private double discount;

    public double getDiscount() {
        return discount;
    }

    public Long getId() {
        return id;
    }

    public String getPlanName() {
        return planName;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

}
