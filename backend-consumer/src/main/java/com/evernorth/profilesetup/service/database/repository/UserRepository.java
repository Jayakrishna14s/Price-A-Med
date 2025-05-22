package com.evernorth.profilesetup.service.database.repository;

import com.evernorth.profilesetup.service.database.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByMemberID(String memberID);
    User findByUserID(int userID);
}
