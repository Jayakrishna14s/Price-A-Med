package com.evernorth.profilesetup.service.database.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "dependent_health_condition")
public class DependentHealthCondition {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dependent_condition_id")
    private Integer dependentConditionId;
    
    @Column(name = "conditionID", nullable = false)
    private Integer conditionID;
    
    // @ManyToOne
    @Column(name = "dependentID", nullable = false)
    private String dependentID;
    
    // Getters and Setters
    public Integer getDependentConditionId() {
        return dependentConditionId;
    }

    public void setDependentConditionId(Integer dependentConditionId) {
        this.dependentConditionId = dependentConditionId;
    }

    public Integer getConditionID() {
        return conditionID;
    }

    public void setConditionID(Integer conditionID) {
        this.conditionID = conditionID;
    }

    public String getDependentID() {
        return dependentID;
    }

    public void setDependentID(String dependentID) {
        this.dependentID = dependentID;
    }
}
