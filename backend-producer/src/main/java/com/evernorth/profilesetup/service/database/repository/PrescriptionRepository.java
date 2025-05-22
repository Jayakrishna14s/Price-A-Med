package com.evernorth.profilesetup.service.database.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.evernorth.profilesetup.service.database.entity.Prescription;

import io.lettuce.core.dynamic.annotation.Param;

public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
    
    @Query("SELECT p FROM Prescription p WHERE p.user.userID = :userId")
    List<Prescription> findPrescriptionsByUserId( @Param("userId") int userId );

    @Query("SELECT p FROM Prescription p WHERE p.user.userID = :userId AND p.id = :prescriptionId")
    Optional<Prescription> findPrescription( @Param("memberId") int userId, @Param("prescriptionId") Long prescriptionId );
}
