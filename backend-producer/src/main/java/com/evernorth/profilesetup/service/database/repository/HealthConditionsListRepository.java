package com.evernorth.profilesetup.service.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import com.evernorth.profilesetup.service.database.entity.HealthConditionsList;

@Repository
public interface HealthConditionsListRepository extends JpaRepository<HealthConditionsList, Integer> {
    
    // Method to retrieve all health condition records
    List<HealthConditionsList> findAll();
    HealthConditionsList findByConditionID(int conditionID);
}
 