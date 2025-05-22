package com.evernorth.profilesetup.service.database.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Medication {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private String strength;
    private String dosageType;
    
    private String medImage; 

    @Enumerated(EnumType.STRING)
    private Type type;

    public enum Type {
        GENERIC, BRANDED;
    }

    public Long getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public String getDosageType() {
        return dosageType;
    }

    public String getMedImage() {
        return medImage;
    }

    public String getName() {
        return name;
    }

    public String getStrength() {
        return strength;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setDosageType(String dosageType) {
        this.dosageType = dosageType;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setMedImage(String medImage) {
        this.medImage = medImage;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setStrength(String strength) {
        this.strength = strength;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }
}
