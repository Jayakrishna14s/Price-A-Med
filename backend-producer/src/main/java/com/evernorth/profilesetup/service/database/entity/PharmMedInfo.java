package com.evernorth.profilesetup.service.database.entity;


import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
public class PharmMedInfo {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "pharm_id", nullable = false)
    private Pharmacy pharmacy;

    @ManyToOne
    @JoinColumn(name = "med_id", nullable = false)
    private Medication medication;

    private BigDecimal unitPrice;

    public Long getId() {
        return id;
    }

    public Medication getMedication() {
        return medication;
    }

    public Pharmacy getPharmacy() {
        return pharmacy;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setMedication(Medication medication) {
        this.medication = medication;
    }

    public void setPharmacy(Pharmacy pharmacy) {
        this.pharmacy = pharmacy;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }
}

