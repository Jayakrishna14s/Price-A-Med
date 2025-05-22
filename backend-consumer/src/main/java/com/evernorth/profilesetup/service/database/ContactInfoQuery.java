package com.evernorth.profilesetup.service.database;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.evernorth.profilesetup.dto.ContactInfoDTO;
import com.evernorth.profilesetup.service.database.entity.Address;
import com.evernorth.profilesetup.service.database.entity.User;
import com.evernorth.profilesetup.service.database.repository.AddressRepository;
import com.evernorth.profilesetup.service.database.repository.UserRepository;

@Service
public class ContactInfoQuery {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AddressRepository addressRepository;


    public void update(ContactInfoDTO payload) throws Exception {
        User user = userRepository.findByMemberID(payload.getMemberID());
        if (user == null) {
            throw new Exception("User not found with memberID: " + payload.getMemberID());
        }


        Integer userID = user.getUserID();
        Address address = addressRepository.findByUserID(userID);

        if(address != null) {
            
            String houseNumber = payload.getHouseNumber();
            if (houseNumber != null && !houseNumber.trim().isEmpty()) {
                address.setHouseNo(houseNumber);
            }

            String landmark = payload.getLandmark();
            if (landmark != null && !landmark.trim().isEmpty()) {
                address.setLandmark(landmark);
            }

            String city = payload.getCity();
            if (city != null && !city.trim().isEmpty()) {
                address.setCity(city);
            }

            String state = payload.getState();
            if (state != null && !state.trim().isEmpty()) {
                address.setState(state);
            }

            String country = payload.getCountry();
            if (country != null && !country.trim().isEmpty()) {
                address.setCountry(country);
            }

            String postalCode = payload.getPostalCode();
            if (postalCode != null && !postalCode.trim().isEmpty()) {
                address.setPostalCode(postalCode);
            }

            addressRepository.save(address);

        } else {
            Address newAddress = new Address();
            newAddress.setUserID(userID);
            
            String houseNumber = payload.getHouseNumber();
            if (houseNumber != null && !houseNumber.trim().isEmpty()) {
                newAddress.setHouseNo(houseNumber);
            }

            String landmark = payload.getLandmark();
            if (landmark != null && !landmark.trim().isEmpty()) {
                newAddress.setLandmark(landmark);
            }

            String city = payload.getCity();
            if (city != null && !city.trim().isEmpty()) {
                newAddress.setCity(city);
            }

            String state = payload.getState();
            if (state != null && !state.trim().isEmpty()) {
                newAddress.setState(state);
            }

            String country = payload.getCountryCode();
            if (country != null && !country.trim().isEmpty()) {
                newAddress.setCountry(country);
            }

            String postalCode = payload.getPostalCode();
            if (postalCode != null && !postalCode.trim().isEmpty()) {
                newAddress.setPostalCode(postalCode);
            }

            addressRepository.save(newAddress); 
        }
    }
}
