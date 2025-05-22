package com.evernorth.profilesetup.service.database.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.evernorth.profilesetup.service.database.entity.UserOrders;

import io.lettuce.core.dynamic.annotation.Param;

public interface UserOrdersRepository extends JpaRepository<UserOrders, Long> {

    @Query("SELECT uo FROM UserOrders uo WHERE uo.user.userID = :userID")
    List<UserOrders> findByUserID( @Param("userID") int userID );
}