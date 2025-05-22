package com.evernorth.profilesetup.service.database;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.evernorth.profilesetup.dto.CurrentMedicationDTO;
import com.evernorth.profilesetup.service.database.entity.CurrentMedications;
import com.evernorth.profilesetup.service.database.repository.CurrentMedicationsRepository;
import com.evernorth.profilesetup.service.database.repository.UserRepository;

@Service
public class CurrentMedicationsQuery {
    @Autowired
    private CurrentMedicationsRepository currentMedicationsRepository;

    @Autowired
    private UserRepository userRepository;


    public void update(CurrentMedicationDTO payload) {
        int userID = userRepository.findByMemberID(payload.getMemberID()).getUserID();

        currentMedicationsRepository.deleteByUserID(userID);

        List<CurrentMedications> newMedications = payload.getMedications().stream()
            .map(pair -> new CurrentMedications(pair.getMedicationID(), userID))
            .toList();

        currentMedicationsRepository.saveAll(newMedications);
    }

}
