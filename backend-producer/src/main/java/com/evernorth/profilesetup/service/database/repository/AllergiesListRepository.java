package com.evernorth.profilesetup.service.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import com.evernorth.profilesetup.service.database.entity.AllergiesList;

@Repository
public interface AllergiesListRepository extends JpaRepository<AllergiesList, Integer> {
    
    // Method to retrieve all allergy records
    List<AllergiesList> findAll();
    AllergiesList findByAllergyID(int allergyID);
}
