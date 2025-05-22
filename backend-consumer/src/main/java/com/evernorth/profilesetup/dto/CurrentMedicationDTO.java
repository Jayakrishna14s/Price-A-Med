package com.evernorth.profilesetup.dto;

import java.util.List;
 
public class CurrentMedicationDTO {
    public static class Pair {
        int medicationID;
        String name;

        Pair() {}
        Pair(int medicationID, String name) {
            this.medicationID = medicationID;
            this.name = name;
        }

        public int getMedicationID() {
            return medicationID;
        }

        public void setMedicationID(int medicationID) {
            this.medicationID = medicationID;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }

    private String memberID;
    private List<Pair> medications;

    CurrentMedicationDTO() {}

    public String getMemberID() {
        return this.memberID;
    }

    public void setMemberID(String userID) {
        this.memberID = userID;
    }

    public List<Pair> getMedications() {
        return this.medications;
    }
}
