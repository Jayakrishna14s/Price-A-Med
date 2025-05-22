package com.evernorth.profilesetup.service.database;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.evernorth.profilesetup.dto.BasicInfoDTO;
import com.evernorth.profilesetup.service.database.entity.User;
import com.evernorth.profilesetup.service.database.repository.UserRepository;

@Service
public class BasicInfoQuery {
    @Autowired
    private UserRepository userRepository;

    public void update(BasicInfoDTO payload) throws Exception {
        String memberID = payload.getMemberID();
        String image = payload.getImage();
        String firstName = payload.getFirstName();
        String lastName = payload.getLastName();

        User user = userRepository.findByMemberID(memberID);

        if (user == null) {
            throw new Exception("User not found with memberID: " + memberID);
        }

        user.setFirstName(firstName);
        user.setLastName(lastName);
        if(image != null) {
            user.setImage(image);
        }

        userRepository.save(user);
        
    }
}
