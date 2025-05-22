package com.evernorth.profilesetup.api.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.evernorth.profilesetup.service.database.entity.AllergiesList;
import com.evernorth.profilesetup.service.database.entity.HealthConditionsList;
import com.evernorth.profilesetup.service.database.repository.AllergiesListRepository;
import com.evernorth.profilesetup.service.database.repository.HealthConditionsListRepository;
import com.evernorth.profilesetup.service.database.repository.MedicationRepository;

@RestController
@RequestMapping("/api/getList")
public class GetLists {
    @Autowired
    private AllergiesListRepository allergiesListRepository;

    @Autowired
    private MedicationRepository medicationRepository;

    @Autowired
    private HealthConditionsListRepository healthConditionsRepository;

    @GetMapping("/healthConditions")
    public List<HealthConditionsList> getAllHealthConditions() {
        return healthConditionsRepository.findAll();
    }

    @GetMapping("/allergies")
    public List<AllergiesList> getAllergies() {
        return 
        allergiesListRepository.findAll();
    }

    @GetMapping("/medications")
    public List<MedicationDTO> getMedications() {
        return medicationRepository.findAll()
                .stream()
                .map(med -> new MedicationDTO(med.getId(), med.getName()))
                .collect(Collectors.toList());  
    }
}


class MedicationDTO {
    private long medicationID;
    private String name;

    // Constructor
    public MedicationDTO(long medicationID, String name) {
        this.medicationID = medicationID;
        this.name = name;
    }

    // Getters
    public long getMedicationID() {
        return medicationID;
    }

    public String getName() {
        return name;
    }
}

