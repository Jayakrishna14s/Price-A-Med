package com.evernorth.profilesetup.service.database.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class CurrentMedications {
    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int currentmedicationID;

    @Column(nullable = false)
    private int medicationID;

    @Column(nullable = false)
    private int userID;

    public CurrentMedications() {}

    public CurrentMedications(int medicationID, int userID) {
        this.medicationID = medicationID;
        this.userID = userID;
    }

    public int getCurrentmedicationID() {
        return this.currentmedicationID;
    }

    public void setCurrentmedicationID(int currentmedicationID) {
        this.currentmedicationID = currentmedicationID;
    }

    public int getMedicationID() {
        return this.medicationID;
    }

    public void setMedicationID(int medicationID) {
        this.medicationID = medicationID;
    }

    public int getUserID() {
        return this.userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }
}