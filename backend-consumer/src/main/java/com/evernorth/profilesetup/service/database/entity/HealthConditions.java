package com.evernorth.profilesetup.service.database.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class HealthConditions {
    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int healthconditionID;

    @Column(nullable = false)
    private int conditionID;

    @Column(nullable = false)
    private int userID;

    public HealthConditions() {}

    public HealthConditions(int conditionID, int userID) {
        this.conditionID = conditionID;
        this.userID = userID;
    }

    public int getConditionID() {
        return this.conditionID;
    }

    public void setConditionID(int conditionID) {
        this.conditionID = conditionID;
    }

    public int getUserID() {
        return this.userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }
}
