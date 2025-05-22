package com.evernorth.profilesetup.dto;

import java.sql.Date;
import java.util.List;

import com.evernorth.profilesetup.service.database.entity.Medication;

public class PrescriptionDTO {
    
    private String memberId;

    private Date startDate;
    private Date endDate;

    private String doctorName;
    private String hospitalName;

    private String prescriptionUrl;

    private String conditionName;

    private List<Medication> medications;

    private String dependentID;

    public String getDependentID() {
        return dependentID;
    }

    public void setDependentID(String dependentID) {
        this.dependentID = dependentID;
    }

    public List<Medication> getMedications() {
        return medications;
    }

    public void setMedications(List<Medication> medications) {
        this.medications = medications;
    }

    public String getConditionName() {
        return conditionName;
    }

    public String getMemberId() {
        return memberId;
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

    public String getPrescriptionUrl() {
        return prescriptionUrl;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
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
