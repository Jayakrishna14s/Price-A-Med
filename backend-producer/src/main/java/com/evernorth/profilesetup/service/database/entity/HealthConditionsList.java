package com.evernorth.profilesetup.service.database.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "health_conditions_list")
public class HealthConditionsList {

    @Id
    private int conditionID;
    
    private String name;

    // Default constructor
    public HealthConditionsList() {}

    // Parameterized constructor
    public HealthConditionsList(int conditionID, String name) {
        this.conditionID = conditionID;
        this.name = name;
    }

    // Getters and Setters
    public int getConditionID() {
        return conditionID;
    }

    public void setConditionID(int conditionID) {
        this.conditionID = conditionID;
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
        return "HealthConditionsList [conditionID=" + conditionID + ", name=" + name + "]";
    }
}
