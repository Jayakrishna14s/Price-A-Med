package com.evernorth.profilesetup.service.database.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.evernorth.profilesetup.service.database.entity.Medication;
import com.evernorth.profilesetup.service.database.entity.PharmMedInfo;

import io.lettuce.core.dynamic.annotation.Param;

public interface PharmacyMedInfoRepository extends JpaRepository<PharmMedInfo, Long> {

    @Query("SELECT p FROM PharmMedInfo p ORDER BY p.medication.name ASC, p.unitPrice ASC")
    // @SuppressWarnings("override")
    List<PharmMedInfo> findAll();

    @Query("SELECT p FROM PharmMedInfo p WHERE soundex(p.medication.name) = soundex(:query)")
    List<PharmMedInfo> findMedicationsBySearch(@Param("query") String query);

    @Query("SELECT p FROM PharmMedInfo p WHERE p.medication.type = :type")
    List<PharmMedInfo> findMedicationByType(@Param("type") Medication.Type type );

    @Query("SELECT p FROM PharmMedInfo p WHERE p.medication.id = :id ORDER BY p.unitPrice ASC")
    List<PharmMedInfo> findMedicationById(@Param("id") Long id);

    @Query("SELECT p FROM PharmMedInfo p WHERE p.medication.id IN ( SELECT a.medication.id FROM AlternativeMedication a WHERE a.alternative.id = :id ) ORDER BY p.unitPrice ASC")
    List<PharmMedInfo> findBrandedAlternatives(@Param("id") Long id);

    @Query("SELECT p FROM PharmMedInfo p WHERE p.medication.id IN ( SELECT a.alternative.id FROM AlternativeMedication a WHERE a.medication.id = :id ) ORDER BY p.unitPrice ASC")
    List<PharmMedInfo> findGenericAlternatives(@Param("id") Long id);
    
} 