package com.evernorth.profilesetup.service.database.repository;

import com.evernorth.profilesetup.service.database.entity.CurrentMedications;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CurrentMedicationsRepository extends JpaRepository<CurrentMedications, Integer> { //
    List<CurrentMedications> findByUserID(int userID);

    @Transactional
    void deleteByUserID(int userID);
}
