package com.evernorth.profilesetup.dto;

import java.util.List;

public class HealthConditionDTO {
    public static class Pair {
        int conditionID;
        String name;

        Pair() {}
        Pair(int conditionID, String name) {
            this.conditionID = conditionID;
            this.name = name;
        }

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
    private List<Pair> conditions;

    HealthConditionDTO() {}

    public String getMemberID() {
        return this.memberID;
    }

    public void setMemberID(String userID) {
        this.memberID = userID;
    }

    public List<Pair> getConditions() {
        return this.conditions;
    }
}
