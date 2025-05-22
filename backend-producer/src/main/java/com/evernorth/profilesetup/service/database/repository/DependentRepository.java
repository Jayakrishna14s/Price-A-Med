package com.evernorth.profilesetup.service.database.repository;


import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.evernorth.profilesetup.service.database.entity.Dependent;

@Repository
public interface DependentRepository extends JpaRepository<Dependent, String> {
    Dependent findByDependentID(String dependentID);
    List<Dependent> findByUserID(int userID);

}
