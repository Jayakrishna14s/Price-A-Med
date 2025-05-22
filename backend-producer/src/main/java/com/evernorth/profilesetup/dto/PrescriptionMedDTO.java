package com.evernorth.profilesetup.dto;

import java.util.List;

import com.evernorth.profilesetup.service.database.entity.Medication;
import com.evernorth.profilesetup.service.database.entity.Prescription;

public class PrescriptionMedDTO {
    
    private Prescription prescription;

    private List<Medication> prescribedMeds;

    public PrescriptionMedDTO( Prescription prescription, List<Medication> prescribedMeds ) {
        this.prescription = prescription;

        this.prescribedMeds = prescribedMeds;
    }

    public List<Medication> getPrescribedMeds() {
        return prescribedMeds;
    }

    public Prescription getPrescription() {
        return prescription;
    }


}
