package com.evernorth.profilesetup.service.database.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "dependent_allergy")
public class DependentAllergy {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dependent_allergy_id")
    private Integer dependentAllergyId;
    
    @Column(name = "allergyID", nullable = false)
    private Integer allergyID;
    
    // @ManyToOne
    @Column(name = "dependentID", nullable = false)
    private String dependentID;
    
    // Getters and Setters
    public Integer getDependentAllergyId() {
        return dependentAllergyId;
    }

    public void setDependentAllergyId(Integer dependentAllergyId) {
        this.dependentAllergyId = dependentAllergyId;
    }

    public Integer getAllergyID() {
        return allergyID;
    }

    public void setAllergyID(Integer allergyID) {
        this.allergyID = allergyID;
    }

    public String getDependentID() {
        return dependentID;
    }

    public void setDependentID(String dependentID) {
        this.dependentID = dependentID;
    }
}
