package com.evernorth.profilesetup.service.database.entity;

import jakarta.persistence.*;


@Entity
public class Member {

    @Id
    @Column(nullable = false)
    private String memberID;

    @Column(nullable = false)
    private String email;

    @Column // (nullable = false, columnDefinition = "BOOLEAN DEFAULT false")
    private boolean active = false;
    
    @ManyToOne
    @JoinColumn(name = "insurance_plan_id")
    private InsurancePlan insurancePlan;


    public InsurancePlan getInsurancePlan() {
        return insurancePlan;
    }

    public void setInsurancePlan(InsurancePlan insurancePlan) {
        this.insurancePlan = insurancePlan;
    }

    public String getMemberID() {
        return memberID;
    }

    public void setMemberID(String memberID) {
        this.memberID = memberID;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isActive() {return active;}

    public void setActive(boolean active) {this.active = active;}
}

