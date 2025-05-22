package com.evernorth.profilesetup.service.database.entity;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Prescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private Date startDate;
    private Date endDate;

    String hospitalName;
    String doctorName;
    
    String prescriptionUrl;

    String conditionName;


    String dependentID;

    public Prescription() {
    }

    public Prescription( User user, Date startDate, Date endDate, String hospitalName, String doctorName, String prescriptionUrl, String conditionName, String dependentID ) {
        this.user = user;
        this.startDate = startDate;
        this.endDate = endDate;
        this.hospitalName = hospitalName;
        this.doctorName = doctorName;
        this.prescriptionUrl = prescriptionUrl;
        this.conditionName = conditionName;
        this.dependentID = dependentID;
    
    
    }

    public String getDependentID() {
        return dependentID;
    }

    public void setDependentID(String dependentID) {
        this.dependentID = dependentID;
    }

    public String getDependentName() {
        return dependentID;
    }

    public void setDependentName(String dependentID) {
        this.dependentID = dependentID;
    }

    public String getDoctorName() {
        return doctorName;
    }
    
    public Date getEndDate() {
        return endDate;
    }

    public String getHospitalName() {
        return hospitalName;
    }

    public Long getId() {
        return id;
    }

    public String getPrescriptionUrl() {
        return prescriptionUrl;
    }

    public Date getStartDate() {
        return startDate;
    }

    public String getConditionName() {
        return conditionName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public void setHospitalName(String hospitalName) {
        this.hospitalName = hospitalName;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setPrescriptionUrl(String prescriptionUrl) {
        this.prescriptionUrl = prescriptionUrl;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public void setConditionName(String conditionName) {
        this.conditionName = conditionName;
    }

    
}
