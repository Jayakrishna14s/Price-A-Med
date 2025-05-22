package com.evernorth.profilesetup.service.database.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.evernorth.profilesetup.service.database.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByMemberID(String memberID);
}
   