package com.evernorth.profilesetup.service.database.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class PrescriptionMed {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "prescription_id", nullable = false)
    private Prescription prescription;

    @ManyToOne
    @JoinColumn(name = "medication_id", nullable = false)
    private Medication medication;

    public PrescriptionMed() {}

    public PrescriptionMed( Prescription prescription, Medication medication ) {
        this.prescription = prescription;
        this.medication = medication;
    }

    public Long getId() {
        return id;
    }

    public Medication getMedication() {
        return medication;
    }

    public Prescription getPrescription() {
        return prescription;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public void setMedication(Medication medication) {
        this.medication = medication;
    }

    public void setPrescription(Prescription prescription) {
        this.prescription = prescription;
    }


}
