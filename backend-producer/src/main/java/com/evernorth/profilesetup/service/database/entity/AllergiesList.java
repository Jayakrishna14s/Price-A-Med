package com.evernorth.profilesetup.service.database.entity;

import jakarta.persistence.Id;
import jakarta.persistence.Table;

import jakarta.persistence.Entity;

@Entity
@Table(name = "allergies_list")
public class AllergiesList {

    @Id
    private int allergyID;
    
    private String name;

    // Default constructor
    public AllergiesList() {}

    // Parameterized constructor
    public AllergiesList(int allergyID, String name) {
        this.allergyID = allergyID;
        this.name = name;
    }

    // Getters and Setters
    public int getAllergyID() {
        return allergyID;
    }

    public void setAllergyID(int allergyID) {
        this.allergyID = allergyID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // toString Method
    @Override
    public String toString() {
        return "AllergiesList [allergyID=" + allergyID + ", name=" + name + "]";
    }
}
