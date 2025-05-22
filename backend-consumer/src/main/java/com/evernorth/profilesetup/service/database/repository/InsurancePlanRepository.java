package com.evernorth.profilesetup.service.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.evernorth.profilesetup.service.database.entity.InsurancePlan;

public interface InsurancePlanRepository extends JpaRepository<InsurancePlan, Long> {
    
}
