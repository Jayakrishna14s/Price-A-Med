package com.evernorth.profilesetup.service.database.repository;


import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import com.evernorth.profilesetup.service.database.entity.DependentMedication;

@Repository
public interface DependentMedicationRepository extends JpaRepository<DependentMedication, Integer> { // 
    List<DependentMedication> findByDependentID(String dependentID);
    @Transactional
    void deleteByDependentID(String dependentID);
}
