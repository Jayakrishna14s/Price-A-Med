package com.evernorth.profilesetup.service.database.repository;


import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import com.evernorth.profilesetup.service.database.entity.DependentHealthCondition;

@Repository
public interface DependentHealthConditionRepository extends JpaRepository<DependentHealthCondition, Integer> { //
    List<DependentHealthCondition> findByDependentID(String dependentID);
    @Transactional
    void deleteByDependentID(String dependentID);
}
