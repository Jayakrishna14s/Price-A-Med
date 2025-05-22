package com.evernorth.profilesetup.service.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.evernorth.profilesetup.service.database.entity.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Integer> {
    Address findByAddressID(int addressID);
    Address findByUserID(int userID);
}
