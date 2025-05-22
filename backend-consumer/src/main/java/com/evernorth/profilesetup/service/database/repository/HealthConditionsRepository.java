package com.evernorth.profilesetup.service.database.repository;

import com.evernorth.profilesetup.service.database.entity.HealthConditions;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface HealthConditionsRepository extends JpaRepository<HealthConditions, Integer> { //
    List<HealthConditions> findByUserID(int userID);

    @Transactional
    void deleteByUserID(int userID);
}
