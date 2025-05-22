package com.evernorth.profilesetup.service.database;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.evernorth.profilesetup.dto.AllergyDTO;
import com.evernorth.profilesetup.service.database.entity.Allergies;
import com.evernorth.profilesetup.service.database.repository.AllergiesRepository;
import com.evernorth.profilesetup.service.database.repository.UserRepository;

@Service
public class AllergiesQuery {
    @Autowired
    private AllergiesRepository allergiesRepository;

    @Autowired
    private UserRepository userRepository;

    public void update(AllergyDTO payload) {
        int userID = userRepository.findByMemberID(payload.getMemberID()).getUserID();

        allergiesRepository.deleteByUserID(userID);

        List<Allergies> newConditions = payload.getAllergies().stream()
            .map(pair -> new Allergies(pair.getAllergyID(), userID))
            .toList();

        allergiesRepository.saveAll(newConditions);
    }
}
