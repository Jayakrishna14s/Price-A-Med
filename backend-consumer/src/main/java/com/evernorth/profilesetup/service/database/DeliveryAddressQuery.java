package com.evernorth.profilesetup.service.database;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.evernorth.profilesetup.dto.DeliveryAddressDTO;
import com.evernorth.profilesetup.service.database.entity.DeliveryAddress;
import com.evernorth.profilesetup.service.database.entity.User;
import com.evernorth.profilesetup.service.database.repository.DeliveryAddressRepository;
import com.evernorth.profilesetup.service.database.repository.UserRepository;

@Service
public class DeliveryAddressQuery {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DeliveryAddressRepository deliveryAddressRepository;

    public void update(DeliveryAddressDTO payload) throws Exception{
        User user = userRepository.findByMemberID(payload.getMemberID());
        if (user == null) {
            throw new Exception("User not found with memberID: " + payload.getMemberID());
        }
        Integer userID = user.getUserID();

        DeliveryAddress deliveryAddress = new DeliveryAddress(
            userID,
            payload.getHouseNo(),
            payload.getLandmark(),
            payload.getCity(),
            payload.getState(),
            payload.getCountry(),
            payload.getPostalCode()
        );
        
        deliveryAddressRepository.save(deliveryAddress);
    }
}
