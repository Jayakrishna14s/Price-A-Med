package com.evernorth.profilesetup.service.database;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.evernorth.profilesetup.dto.HealthConditionDTO;
import com.evernorth.profilesetup.service.database.entity.HealthConditions;
import com.evernorth.profilesetup.service.database.repository.HealthConditionsRepository;
import com.evernorth.profilesetup.service.database.repository.UserRepository;

@Service
public class HealthConditionsQuery {
    @Autowired
    private HealthConditionsRepository healthConditionsRepository;

    @Autowired
    private UserRepository userRepository;

    public void update(HealthConditionDTO payload) {
        int userID = userRepository.findByMemberID(payload.getMemberID()).getUserID();

        healthConditionsRepository.deleteByUserID(userID);

        List<HealthConditions> newConditions = payload.getConditions().stream()
            .map(pair -> new HealthConditions(pair.getConditionID(), userID))
            .toList();

        healthConditionsRepository.saveAll(newConditions);
    }
}
