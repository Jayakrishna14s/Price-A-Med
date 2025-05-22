package com.evernorth.profilesetup.service.database;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.evernorth.profilesetup.dto.UpdateDependentDTO;
import com.evernorth.profilesetup.service.database.entity.Dependent;
import com.evernorth.profilesetup.service.database.entity.DependentAllergy;
import com.evernorth.profilesetup.service.database.entity.DependentHealthCondition;
import com.evernorth.profilesetup.service.database.entity.DependentMedication;
import com.evernorth.profilesetup.service.database.repository.DependentAllergyRepository;
import com.evernorth.profilesetup.service.database.repository.DependentHealthConditionRepository;
import com.evernorth.profilesetup.service.database.repository.DependentMedicationRepository;
import com.evernorth.profilesetup.service.database.repository.DependentRepository;

@Service
public class UpdateDependentQuery {
    @Autowired
    private DependentRepository dependentRepository;
    
    @Autowired
    private DependentMedicationRepository dependentMedicationRepository;
    
    @Autowired
    private DependentHealthConditionRepository dependentHealthConditionRepository;
    
    @Autowired
    private DependentAllergyRepository dependentAllergyRepository;

    public void update(UpdateDependentDTO payload) {

        Dependent dependent = dependentRepository.findByDependentID(payload.getDependentID());
        dependent.setDependentName(payload.getDependentName());
        if(payload.getImage() != null)
            dependent.setImage(payload.getImage());
        dependentRepository.save(dependent);

        dependentAllergyRepository.deleteByDependentID(payload.getDependentID());
        dependentMedicationRepository.deleteByDependentID(payload.getDependentID());
        dependentHealthConditionRepository.deleteByDependentID(payload.getDependentID());
        
        
        List<DependentAllergy> allergies = payload.getAllergies().stream().map(allergy -> {
            DependentAllergy dependentAllergy = new DependentAllergy();
            dependentAllergy.setAllergyID(allergy.getAllergyID());
            dependentAllergy.setDependentID(payload.getDependentID());
            return dependentAllergy;
        }).collect(Collectors.toList());
        dependentAllergyRepository.saveAll(allergies);
        
        List<DependentMedication> medications = payload.getMedications().stream().map(medication -> {
            DependentMedication dependentMedication = new DependentMedication();
            dependentMedication.setMedicationID(medication.getMedicationID());
            dependentMedication.setDependentID(payload.getDependentID());
            return dependentMedication;
        }).collect(Collectors.toList());
        dependentMedicationRepository.saveAll(medications);
        
        List<DependentHealthCondition> conditions = payload.getConditions().stream().map(condition -> {
            DependentHealthCondition dependentHealthCondition = new DependentHealthCondition();
            dependentHealthCondition.setConditionID(condition.getConditionID());
            dependentHealthCondition.setDependentID(payload.getDependentID());
            return dependentHealthCondition;
        }).collect(Collectors.toList());
        dependentHealthConditionRepository.saveAll(conditions);
    }
}
