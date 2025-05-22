package com.evernorth.profilesetup.service.database.repository;

import com.evernorth.profilesetup.service.database.entity.PaymentInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface PaymentInfoRepository extends JpaRepository<PaymentInfo, Integer> {
    List<PaymentInfo> findByUserID(int userID);
}