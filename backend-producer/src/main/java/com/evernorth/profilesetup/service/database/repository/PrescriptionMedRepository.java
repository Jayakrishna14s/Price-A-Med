package com.evernorth.profilesetup.service.database.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.evernorth.profilesetup.service.database.entity.Medication;
import com.evernorth.profilesetup.service.database.entity.PrescriptionMed;

import io.lettuce.core.dynamic.annotation.Param;

public interface PrescriptionMedRepository extends JpaRepository<PrescriptionMed, Long> {

    @Query("SELECT pm.medication FROM PrescriptionMed pm WHERE pm.prescription.id = :prescriptionId")
    List<Medication> findMedByPrescription(@Param("prescriptionId") Long prescriptionId);

    @Query("DELETE FROM PrescriptionMed pm WHERE pm.prescription.id = :prescriptionId")
    void deleteMedsByPrescriptionId(@Param("prescriptionId") Long prescriptionId);
    
}