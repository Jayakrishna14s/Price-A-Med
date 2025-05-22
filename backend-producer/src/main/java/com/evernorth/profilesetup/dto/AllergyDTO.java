package com.evernorth.profilesetup.dto;

import java.util.List;

public class AllergyDTO {
    public static class Pair {
        int allergyID;
        String name;

        Pair() {}
        Pair(int allergyID, String name) {
            this.allergyID = allergyID;
            this.name = name;
        }

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

    private String memberID;
    private List<Pair> allergies;

    AllergyDTO() {}

    public String getMemberID() {
        return this.memberID;
    }

    public void setMemberID(String userID) {
        this.memberID = userID;
    }

    public List<Pair> getAllergies() {
        return this.allergies;
    }
}
