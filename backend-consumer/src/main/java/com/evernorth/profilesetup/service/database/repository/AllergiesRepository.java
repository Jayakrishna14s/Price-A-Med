package com.evernorth.profilesetup.service.database.repository;

import com.evernorth.profilesetup.service.database.entity.Allergies;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface AllergiesRepository extends JpaRepository<Allergies, Integer> { //
    List<Allergies> findByUserID(int userID);

    @Transactional
    void deleteByUserID(int userID);
}
