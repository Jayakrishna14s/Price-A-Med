package com.evernorth.profilesetup.api.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.evernorth.profilesetup.service.database.entity.Medication;
import com.evernorth.profilesetup.service.database.repository.MedicationRepository;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
public class MedicationController {

    @Autowired
    MedicationRepository medicationRepository;

    @GetMapping("/api/getMeds")
    public ResponseEntity<List<Medication>> getMeds() {
        List<Medication> allMeds = medicationRepository.findAll();

        return new ResponseEntity<>(allMeds, HttpStatus.OK);
    }
    
    
}
