package com.evernorth.profilesetup.dto;

import java.util.List;

public class UpdateDependentDTO {
    
    public static class Allergy {
        private int allergyID;
        private String name;

        public Allergy() {}

        public int getAllergyID() {
            return allergyID;
        }

        public void setAllergyID(int allergyID) {
            this.allergyID = allergyID;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }

    public static class Medication {
        private int medicationID;
        private String name;

        public Medication() {}

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

    public static class Condition {
        private int conditionID;
        private String name;

        public Condition() {}

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
    }

    private String memberID;
    private String dependentID;
    private String dependentName;
    private String image;
    private List<Allergy> allergies;
    private List<Medication> medications;
    private List<Condition> conditions;

    public String getMemberID() {
        return memberID;
    }

    public void setMemberID(String memberID) {
        this.memberID = memberID;
    }

    public String getDependentID() {
        return this.dependentID;
    }

    public void setDependentID(String dependentID) {
        this.dependentID = dependentID;
    }

    public String getDependentName() {
        return dependentName;
    }

    public void setDependentName(String dependentName) {
        this.dependentName = dependentName;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public List<Allergy> getAllergies() {
        return allergies;
    }

    public void setAllergies(List<Allergy> allergies) {
        this.allergies = allergies;
    }

    public List<Medication> getMedications() {
        return medications;
    }

    public void setMedications(List<Medication> medications) {
        this.medications = medications;
    }

    public List<Condition> getConditions() {
        return conditions;
    }

    public void setConditions(List<Condition> conditions) {
        this.conditions = conditions;
    }
}