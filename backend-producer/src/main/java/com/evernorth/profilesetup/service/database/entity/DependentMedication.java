package com.evernorth.profilesetup.service.database.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "dependent_medication")
public class DependentMedication {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dependent_medication_id")
    private Integer dependentMedicationId;
    
    @Column(name = "medicationID", nullable = false)
    private Integer medicationID;
    
    // @ManyToOne
    @Column(name = "dependentID", nullable = false)
    private String dependentID;

    public int getDependentMedicationId() {
        return dependentMedicationId;
    }

    public void setDependentMedicationId(Integer dependentMedicationId) {
        this.dependentMedicationId = dependentMedicationId;
    }

    public Integer getMedicationID() {
        return medicationID;
    }

    public void setMedicationID(Integer medicationID) {
        this.medicationID = medicationID;
    }

    public String getDependentID() {
        return dependentID;
    }

    public void setDependentID(String dependentID) {
        this.dependentID = dependentID;
    }
}
