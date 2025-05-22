package com.evernorth.profilesetup.dto;

import java.util.List;

import com.evernorth.profilesetup.service.database.entity.PharmMedInfo;

public class MedDTO {
    List<PharmMedInfo> medications;
    List<PharmMedInfo> alternatives;

    public MedDTO(List<PharmMedInfo> meds, List<PharmMedInfo> alts) {
        this.medications = meds;
        this.alternatives = alts;
    }

    public void setAlternatives(List<PharmMedInfo> alternatives) {
        this.alternatives = alternatives;
    }

    public void setMedications(List<PharmMedInfo> medications) {
        this.medications = medications;
    }

    public List<PharmMedInfo> getAlternatives() {
        return alternatives;
    }

    public List<PharmMedInfo> getMedications() {
        return medications;
    }
}
