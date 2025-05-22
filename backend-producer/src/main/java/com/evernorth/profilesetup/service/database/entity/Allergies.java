package com.evernorth.profilesetup.service.database.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Allergies {
    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int currentallergyID;

    @Column(nullable = false)
    private int allergyID;

    @Column(nullable = false)
    private int userID;

    public Allergies() {}

    public Allergies(int allergyID, int userID) {
        this.allergyID = allergyID;
        this.userID = userID;
    }

    public int getAllergyID() {
        return this.allergyID;
    }

    public void setAllergyID(int allergyID) {
        this.allergyID = allergyID;
    }

    public int getUserID() {
        return this.userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }
}
