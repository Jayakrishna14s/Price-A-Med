package com.evernorth.profilesetup.service.database;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.evernorth.profilesetup.dto.AddDependentDTO;
import com.evernorth.profilesetup.service.database.repository.DependentHealthConditionRepository;
import com.evernorth.profilesetup.service.database.repository.DependentMedicationRepository;
import com.evernorth.profilesetup.service.database.repository.DependentAllergyRepository;
import com.evernorth.profilesetup.service.database.repository.DependentRepository;
import com.evernorth.profilesetup.service.database.repository.UserRepository;
import com.evernorth.profilesetup.service.database.entity.Dependent;
import com.evernorth.profilesetup.service.database.entity.DependentAllergy;
import com.evernorth.profilesetup.service.database.entity.DependentHealthCondition;
import com.evernorth.profilesetup.service.database.entity.DependentMedication;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class AddDependentQuery {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DependentRepository dependentRepository;
    
    @Autowired
    private DependentMedicationRepository dependentMedicationRepository;
    
    @Autowired
    private DependentHealthConditionRepository dependentHealthConditionRepository;
    
    @Autowired
    private DependentAllergyRepository dependentAllergyRepository;

    public void update(AddDependentDTO payload) {
        int userID = userRepository.findByMemberID(payload.getMemberID()).getUserID();

        String dependentID = generateDependentID();

        Dependent dependent = new Dependent();
        dependent.setDependentID(dependentID);
        dependent.setDependentName(payload.getDependentName());
        dependent.setImage(payload.getImage());
        dependent.setUserID(userID);
        dependentRepository.save(dependent);
        
        List<DependentAllergy> allergies = payload.getAllergies().stream().map(allergy -> {
            DependentAllergy dependentAllergy = new DependentAllergy();
            dependentAllergy.setAllergyID(allergy.getAllergyID());
            dependentAllergy.setDependentID(dependentID);
            return dependentAllergy;
        }).collect(Collectors.toList());
        dependentAllergyRepository.saveAll(allergies);
        
        List<DependentMedication> medications = payload.getMedications().stream().map(medication -> {
            DependentMedication dependentMedication = new DependentMedication();
            dependentMedication.setMedicationID(medication.getMedicationID());
            dependentMedication.setDependentID(dependentID);
            return dependentMedication;
        }).collect(Collectors.toList());
        dependentMedicationRepository.saveAll(medications);
        
        List<DependentHealthCondition> conditions = payload.getConditions().stream().map(condition -> {
            DependentHealthCondition dependentHealthCondition = new DependentHealthCondition();
            dependentHealthCondition.setConditionID(condition.getConditionID());
            dependentHealthCondition.setDependentID(dependentID);
            return dependentHealthCondition;
        }).collect(Collectors.toList());
        dependentHealthConditionRepository.saveAll(conditions);
    }

    public String generateDependentID() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder sb = new StringBuilder("dpt$");
        Random random = new Random();
        for (int i = 0; i < 8; i++) {
            sb.append(characters.charAt(random.nextInt(characters.length())));
        }
        return sb.toString();
    }
}
