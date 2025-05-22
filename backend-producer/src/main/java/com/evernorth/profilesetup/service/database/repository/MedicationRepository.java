// package com.evernorth.profilesetup.service.database.repository;

// import java.util.List;

// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;

// import com.evernorth.profilesetup.service.database.entity.Medication;

// import io.lettuce.core.dynamic.annotation.Param;

// public interface MedicationRepository extends JpaRepository<Medication, Long> {

    
//     @Query("SELECT m FROM Medication m WHERE m.name LIKE %:query%")
//     List<Medication> findMedicationsBySearch(@Param("query") String query);
// } 

package com.evernorth.profilesetup.service.database.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

// import com.evernorth.profilesetup.dto.AddDependentDTO;
import com.evernorth.profilesetup.service.database.entity.Medication;

import io.lettuce.core.dynamic.annotation.Param;

public interface MedicationRepository extends JpaRepository<Medication, Long> {
    @Query("SELECT m FROM Medication m WHERE m.id = :id")
    Medication findById(int id);

    @Query("SELECT m FROM Medication m WHERE m.name LIKE %:query%")
    List<Medication> findMedicationsBySearch(@Param("query") String query);

    @Query("SELECT m.id FROM Medication m WHERE m.id IN ( SELECT a.alternative.id FROM AlternativeMedication a WHERE a.medication.id = :id )")
    List<Long> findGenericAlternatives(@Param("id") Long id);

    @Query("SELECT m.id FROM Medication m WHERE m.id IN ( SELECT a.medication.id FROM AlternativeMedication a WHERE a.alternative.id = :id )")
    List<Long> findBrandedAlternatives(@Param("id") Long id);
}